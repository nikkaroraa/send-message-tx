import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { Input, Button, Stack, Text, useClipboard } from '@chakra-ui/react'
import { useState } from 'react'
import { ethers } from 'ethers'

import rem from '../utils/rem'

function stringToHex(text: string) {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text))
}

function Action() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [txnHash, setTxnHash] = useState('')

  const { config } = usePrepareSendTransaction({
    request: { to: to, data: stringToHex(message) },
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const onToChange = (event: any) => setTo(event.target.value)
  const onMessageChange = (event: any) => setMessage(event.target.value)
  const shootTx = () => sendTransaction?.()

  const { hasCopied, onCopy } = useClipboard(txnHash)

  const copyTxnHash = () => {
    const hash = JSON.stringify(data)
    if (!hash) {
      setTxnHash(hash)
    }

    onCopy()
  }

  return (
    <Stack spacing={6} minW={{ base: '90%', sm: '80%', md: rem(400) }}>
      <Stack>
        <Text as="label" htmlFor="to">
          whom to send transaction to?
        </Text>
        <Input id="to" placeholder="to" value={to} onChange={onToChange} />
      </Stack>

      <Stack>
        <Text as="label" htmlFor="message">
          message
        </Text>
        <Input placeholder="message" value={message} onChange={onMessageChange} />
      </Stack>

      <Stack>
        <Button onClick={shootTx}>shoot transaction</Button>
        {isSuccess && <Button onClick={copyTxnHash}>copy txn hash</Button>}
        {hasCopied && <Text>Copied</Text>}
      </Stack>
    </Stack>
  )
}

export default Action
