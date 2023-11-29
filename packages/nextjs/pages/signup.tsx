import dynamic from 'next/dynamic'
import type { NextPage } from 'next';
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
  Link,
} from '@chakra-ui/react';
import { useRouter } from "next/router";

import externalContracts from '~~/contracts/externalContracts';
import { SetStateAction, useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { userType } from '~~/types/usertype';

const WalletConnectInfo = dynamic(() => import('../components/WalletConnectInfo/WalletConnectInfo'), {
  ssr: false, 
});

const SignUp: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();

  const [value, setValue] = useState("customer")

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: externalContracts.UserRegistry.address,
    abi: externalContracts.UserRegistry.abi,
    functionName: 'setUserStatus'
  })

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  }

  async function signUp() {
    console.log("Signing up...")
    await write({
      args: [address, userType(value)]
    })
    // router.push("/login")
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
            Sign up
          </Text>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Enter username" />
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
          <WalletConnectInfo/>
          
          <Button disabled={!write} variant="outline" px="20" onClick={signUp}>
            Verify wallet and sign up
          </Button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}

          <Text textTransform="uppercase" textAlign="center" mt="10">
            Already have an account?{' '}
            <Link href="/login">
            <Button variant="link" textTransform="uppercase" fontSize="sm" color="white">
              Login here{' '}
            </Button>
            </Link>
          </Text>
        </Stack>
      </Flex>
    </Container>
  );
};

export default SignUp;


