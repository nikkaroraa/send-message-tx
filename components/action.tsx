import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { Input, Button, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { ethers } from 'ethers'

function stringToHex(text: string) {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text))
}

function Action() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')

  const { config } = usePrepareSendTransaction({
    request: { to: to, data: stringToHex(message) },
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const onToChange = (event: any) => setTo(event.target.value)
  const onMessageChange = (event: any) => setMessage(event.target.value)

  const shootTx = () => {
    sendTransaction?.()
  }

  return (
    <Stack spacing={6}>
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
        {isSuccess && <Text>Transaction: {JSON.stringify(data)}</Text>}
      </Stack>
    </Stack>
  )
}

export default Action
