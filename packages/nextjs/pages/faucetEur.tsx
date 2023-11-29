import type { NextPage } from 'next';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text } from '@chakra-ui/react';
import externalContracts from '~~/contracts/externalContracts';
import { useAccount, useBalance } from 'wagmi';

const FaucetEUR: NextPage = () => {
  const { address } = useAccount();

  const { data: eurtBalance } = useBalance({
        address: address,
        token: externalContracts.TestEURT.address
      })
  return (
    <Container maxW="container.xl" py={10}>
      <Flex fontSize="lg" direction={{ base: "column", md: "row" }} gap={10} justifyContent="center" w="full">
        <Stack gap={5} minW="400px">
          <Heading>Faucet for Test EURO token</Heading>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" placeholder="Enter amount" />
          </FormControl>
          <Box>
          {eurtBalance &&  <Text>Current EURT Balance: {eurtBalance.formatted}</Text>}
          </Box>
          <Box mx={"auto"}>
            <Button variant="outline" px="20">
              Mint 10 EURT
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default FaucetEUR;