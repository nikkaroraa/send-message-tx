import { usePrepareSendTransaction, useSendTransaction, useAccount } from 'wagmi'
import { Input, Button, Stack, Text, Checkbox } from '@chakra-ui/react'
import { useState } from 'react'
import { ethers } from 'ethers'

import rem from '../utils/rem'
import useCopyToClipboard from '../hooks/use-copy-to-clipboard'

function stringToHex(text: string) {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text))
}

function Action() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [sendToSelf, setSendToSelf] = useState(false)
  const [error, setError] = useState('')

  const { config } = usePrepareSendTransaction({
    request: { to: to, data: stringToHex(message) },
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const onToChange = (event: any) => setTo(event.target.value)
  const onMessageChange = (event: any) => setMessage(event.target.value)
  const shootTx = () => sendTransaction?.()

  const [copiedValue, copy] = useCopyToClipboard()

  const copyTxnHash = () => {
    const hash = data?.hash || ''

    if (hash) {
      copy(hash)
    } else {
      setError('txn hash not found')
    }
  }

  const { address, isDisconnected } = useAccount()

  const onChangeSendToSelf = (event: any) => {
    const isChecked = event.target.checked
    setSendToSelf(isChecked)
    if (isChecked) {
      setTo(address!)
    }
  }

  return (
    <Stack spacing={6} minW={{ base: '90%', sm: '80%', md: rem(400) }}>
      <Stack>
        <Text as="label" htmlFor="to">
          whom to send transaction to?
        </Text>
        <Input id="to" placeholder="to" value={to} onChange={onToChange} />
        <Checkbox colorScheme="blue" isChecked={sendToSelf} onChange={onChangeSendToSelf} isDisabled={isDisconnected}>
          send to self?
        </Checkbox>
      </Stack>

      <Stack>
        <Text as="label" htmlFor="message">
          message
        </Text>
        <Input placeholder="message" value={message} onChange={onMessageChange} />
      </Stack>

      <Stack textAlign={'center'}>
        <Button onClick={shootTx} isDisabled={isDisconnected}>
          shoot transaction
        </Button>
        {isLoading && <Text>Sending...</Text>}
        {error && <Text color="red">{error}</Text>}

        {isSuccess && <Button onClick={copyTxnHash}>copy txn hash</Button>}
        {copiedValue && <Text>Copied</Text>}
      </Stack>
    </Stack>
  )
}

export default Action
