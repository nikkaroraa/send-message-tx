import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Center, Stack, Input } from '@chakra-ui/react'

import Action from '../components/action'

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>send message txn</title>
        <meta name="description" content="send message transaction to EVM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center as="main" py={10}>
        <Stack spacing={10}>
          <ConnectButton />

          <Action />
        </Stack>
      </Center>
    </Box>
  )
}

export default Home
