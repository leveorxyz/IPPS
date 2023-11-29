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
  Link,
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { SetStateAction, useState } from 'react';
import { useGlobalState, User } from "~~/services/store/store";

const WalletConnectInfo = dynamic(() => import('../components/WalletConnectInfo/WalletConnectInfo'), {
  ssr: false, 
});

const Login: NextPage = () => {
  const router = useRouter();
  const updateUserType = useGlobalState((state) => state.setUserType)
  const [value, setValue] = useState("customer")

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  }

  function login() {
    updateUserType(value as User)
    router.push(`/${value}-home`)
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
          <Button variant="outline" px="20" onClick={login}>
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
