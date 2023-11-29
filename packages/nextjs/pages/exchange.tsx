import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Image,
  Text,
  InputLeftElement,
  Input,
  InputGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

import { MdOutlineMoney } from "react-icons/md";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";

const Exchange = () => {
  const { address } = useAccount();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const {
    data,
    writeAsync,
    isLoading: checkWallet,
  } = useContractWrite({
    address: externalContracts.ExchangeProtocol.address,
    abi: externalContracts.ExchangeProtocol.abi,
    functionName: "transferToken",
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleFromCurrencyChange = (e: { target: { value: SetStateAction<string> } }) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: { target: { value: SetStateAction<string> } }) => {
    setToCurrency(e.target.value);
  };

  async function exchange() {
    await writeAsync({
      args: [address],
    });
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Flex mb={7}>
        <Heading>Exchange currency</Heading>
      </Flex>
      <Flex gap={4}>
        <FormControl>
          <FormLabel>From Currency</FormLabel>
          <Select onChange={handleFromCurrencyChange} placeholder="Choose Currency" >
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
          </Select>
        </FormControl>
        <Image src="./rightArrow.png" alt="" />
        <FormControl>
          <FormLabel>To Currency</FormLabel>
          <Select onChange={handleToCurrencyChange} placeholder="Choose Currency" >
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex justifyContent="center">
        <Text>Conversation Rate</Text>
      </Flex>
      <Flex justifyContent="center" gap={5}>
        <Text>1 USD</Text>
        <Image boxSize="50px" src="./rightArrow.png" alt="" />
        <Text>0.91 Euro</Text>
      </Flex>

      <Flex>
        <Box m={"auto"}>
          <FormControl>
            <FormLabel>Amount</FormLabel>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdOutlineMoney color="gray.300" />
              </InputLeftElement>

              <Input type="number" placeholder="Enter amount" width={"47em"} required />
            </InputGroup>
          </FormControl>
        </Box>
      </Flex>

      <Flex justifyContent="center" mt={9}>
        <Button variant="outline">Exchange</Button>
      </Flex>
    </Container>
  );
};

export default Exchange;
