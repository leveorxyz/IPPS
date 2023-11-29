import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import theme from '../theme';
import Layout from '../components/Layout/Layout';
// import { appChains } from "~~/services/web3/wagmiConnectors";
const projectId = '11_IPFS';

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'IPPS',
  projectId,
  chains
});

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Head>
            <title>IPPS</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
