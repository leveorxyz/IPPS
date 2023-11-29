import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

const SendMoney = () => {
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
            <Text>Current Balance: 10 USD</Text>
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
