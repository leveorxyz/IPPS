import type { NextPage } from 'next';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text } from '@chakra-ui/react';

const FaucetEUR: NextPage = () => {
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
            <Text>Current EURT Balance: 10 USD</Text>
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