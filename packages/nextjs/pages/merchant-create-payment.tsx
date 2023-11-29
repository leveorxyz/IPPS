import type { NextPage } from 'next';
import {
  Container,
  Flex,
  Stack,
  Text,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';
import Link from "next/link";

const MerchantCreatePayment: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        fontSize="lg"
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        justifyContent="center"
        w="full"
      >
        <Stack gap={5} minW="400px">
          <FormControl>
            <FormLabel>Pay currency</FormLabel>
            <Select>
              <option value="option1">USDT</option>
              <option value="option2">USD</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" placeholder="Enter amount" />
          </FormControl>
          <Box>
            <Text>Converted amount: 10 USD</Text>
            <Text>Current Balance: 10 USD</Text>
            <Text>Third party fee amount: 0.01 USD</Text>
          </Box>
          <Link href="/merchant-payment-qr">
          <Button variant="outline" px="20">
            Create payment link
          </Button>
          </Link>
        </Stack>
      </Flex>
    </Container>
  );
};

export default MerchantCreatePayment;
