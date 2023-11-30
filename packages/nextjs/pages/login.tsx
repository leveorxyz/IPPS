import type { NextPage } from 'next';
import dynamic from 'next/dynamic'

import {
  Container,
  Flex,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Link,
  Box,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { SetStateAction, useState } from 'react';
import { useGlobalState, User } from "~~/services/store/store";
import { useAccount, useContractRead } from 'wagmi';
import externalContracts from "~~/contracts/externalContracts";
import { userType } from '~~/types/usertype';

const WalletConnectInfo = dynamic(() => import('../components/WalletConnectInfo/WalletConnectInfo'), {
  ssr: false, 
});

const Login: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const {address} = useAccount();

  const updateUserType = useGlobalState((state) => state.setUserType)
  const [value, setValue] = useState("customer")

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  }

  const { data, isError, isFetched } = useContractRead({
    address: externalContracts.UserRegistry.address,
    abi: externalContracts.UserRegistry.abi,
    functionName: 'getUserStatus',
    args: [address]
  })

  const sleep = (ms: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function login() {
    if(data !== userType(value)){
      toast({
        render: () => (
          <Box color="white" p={3} bg="red.500">
              Not a registered {value}
          </Box>
        ),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        render: () => (
          <Box color="white" p={3} bg="green.500">
              Is registered {value}
          </Box>
        ),
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      await sleep(5000);
      updateUserType(value as User)
      router.push(`/${value}-home`)
    }
    
    
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        fontSize="lg"
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        justifyContent="space-around"
      >
        <Stack minW="400px" gap={10}>
          <Text
            color="white"
            fontSize="lg"
            textTransform="uppercase"
            textAlign="center"
            fontWeight="bold"
          >
            Login
          </Text>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username" />
          </FormControl>
          <FormControl>
            <FormLabel>User Type</FormLabel>
            <Select
            onChange={handleChange} 
            value={value}
            >
              <option value="customer">Customer</option>
              <option value="merchant">Merchant</option>
              <option value="staker">Staker</option>
              <option value="bank">Bank</option>
            </Select>
          </FormControl>
          <Button disabled={!isFetched} variant="outline" px="20" onClick={login}>
            Login
          </Button>

          <WalletConnectInfo/>

          <Text textTransform="uppercase" textAlign="center" mt="10">
            New here{' '}
            <Link href="/signup">
            <Button variant="link" textTransform="uppercase" fontSize="sm" color="white">
              Create a account
            </Button>
            </Link>
          </Text>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Login;
