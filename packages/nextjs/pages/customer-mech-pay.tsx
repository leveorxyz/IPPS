import { Box, Container, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react";
import Scanner from "~~/components/Mobile/Scanner";

const CustomerMerchPay = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Stack>
        <Heading>Merchant Payment</Heading>
        <Scanner />
        <Box mx={"auto"} mt={9}>
          <FormControl>
            <FormLabel>Choose currency</FormLabel>
            <Select>
              <option value="option1">USD</option>
              <option value="option2">Euro</option>
            </Select>
          </FormControl>
        </Box>
        <Box mx={"auto"}>
            <Text>Amount to pay: 10 USD</Text>
            <Text>Current Balance: 10 USD</Text>
            <Text>Third party fee amount: 0.01 USD</Text>
          </Box>
      </Stack>
    </Container>
  );
};

export default CustomerMerchPay;
