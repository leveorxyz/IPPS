import { Box, Container, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import Scanner from "~~/components/Mobile/Scanner";
import externalContracts from "~~/contracts/externalContracts";

const CustomerMerchPay = () => {
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
            {usdtBalance &&  <Text>{usdtBalance.formatted} USDT</Text>}
            {eurtBalance && <Text> {eurtBalance.formatted} EURT</Text>}
            <Text>Third party fee amount: 0.01 USD</Text>
          </Box>
      </Stack>
    </Container>
  );
};

export default CustomerMerchPay;
