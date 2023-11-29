import { useAccount } from 'wagmi';
import { Text } from '@chakra-ui/react';

const WalletConnectInfo = () => {
    const { address, isConnected } = useAccount()
    return isConnected ? (
            <Text
            fontSize="lg"
            color="white"
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
          >
            Connected address: <br />
            {address}
          </Text>
          ) : (
            <Text fontSize="lg" textAlign="center" color="red">
            Wallet not connected!
          </Text>
          )   
}

export default WalletConnectInfo;