import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";

const SendMoney = () => {
  const { address } = useAccount();
  const { data: usdtBalance } = useBalance({
    address: address,
    token: externalContracts.USDT.address
  })

  const { data: eurtBalance } = useBalance({
    address: address,
    token: externalContracts.TestEURT.address
  })
  return (
    <Container maxW="container.xl" py={10}>
      <Flex fontSize="lg" direction={{ base: "column", md: "row" }} gap={10} justifyContent="center" w="full">
        <Stack gap={5} minW="400px">
          <Heading>Send Money</Heading>
          <FormControl>
            <FormLabel>From currency</FormLabel>
            <Select>
              <option value="option1">USD</option>
              <option value="option2">Euro</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>To currency</FormLabel>
            <Select>
              <option value="option1">USD</option>
              <option value="option2">Euro</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Recipient Address</FormLabel>
            <Input type="text" placeholder="Enter recipient address" />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" placeholder="Enter amount" />
          </FormControl>
          <Box>
            <Text>Converted amount: 10 USD</Text>
            {usdtBalance &&  <Text>{usdtBalance.formatted} USDT</Text>}
            {eurtBalance && <Text> {eurtBalance.formatted} EURT</Text>}
            <Text>Third party fee amount: 0.01 USD</Text>
          </Box>
          <Box mx={"auto"}>
            <Button variant="outline" px="20">
              Send Payment
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default SendMoney;
