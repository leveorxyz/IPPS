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
import { useAccount } from 'wagmi';

const SignUp: NextPage = () => {
  const { address, isConnected } = useAccount()
 
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
            <Select>
              <option value="customer">Customer</option>
              <option value="merchant">Merchant</option>
              <option value="staker">Staker</option>
              <option value="bank">Bank</option>
            </Select>
          </FormControl>
          {isConnected ? (
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
          )}
          
          <Button variant="outline" px="20">
            Verify wallet and sign up
          </Button>

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
