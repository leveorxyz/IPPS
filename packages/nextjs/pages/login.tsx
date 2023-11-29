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

const WalletConnectInfo = dynamic(() => import('../components/WalletConnectInfo/WalletConnectInfo'), {
  ssr: false, 
});

const Login: NextPage = () => {

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
            <Select>
              <option value="customer">Customer</option>
              <option value="merchant">Merchant</option>
              <option value="staker">Staker</option>
              <option value="bank">Bank</option>
            </Select>
          </FormControl>
          <Button variant="outline" px="20">
            Login
          </Button>

          <WalletConnectInfo/>

          <Text textTransform="uppercase" textAlign="center" mt="10">
            New here{' '}
            <Link href="/signup">
            <Button variant="link" textTransform="uppercase" fontSize="sm" color="white">
              Create a customer account
            </Button>
            </Link>
          </Text>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Login;
