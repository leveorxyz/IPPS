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
import { SetStateAction, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";

const SendMoney = () => {
  const { address } = useAccount();

  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [convertedAmount, setConvertedAmount] = useState(0.0);

  useEffect(() => {
    if(fromCurrency === "USD"){
      if(toCurrency === "USD"){
        setConvertedAmount(amount);
      }
      else{
        setConvertedAmount(parseFloat((amount*0.91).toFixed(3)));
      }
    }
    else{
      if(toCurrency === "USD"){
        setConvertedAmount(amount);
      }
      else{
        setConvertedAmount(parseFloat((amount*1.1).toFixed(3)));
      }
    }
  }, [fromCurrency, toCurrency, amount])

  const handleFromCurrencyChange = (e: { target: { value: SetStateAction<string> } }) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: { target: { value: SetStateAction<string> } }) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e: { target: { value: any; }; }) => {
    setAmount(parseFloat(e.target.value));
  };
  
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
            <Select onChange={handleFromCurrencyChange}>
              <option value="USD">USD</option>
              <option value="Euro">Euro</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>To currency</FormLabel>
            <Select onChange={handleToCurrencyChange}>
              <option value="USD">USD</option>
              <option value="Euro">Euro</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Recipient Address</FormLabel>
            <Input type="text" placeholder="Enter recipient address" />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input onChange={handleAmountChange} type="number" placeholder="Enter amount" />
          </FormControl>
          <Box>
            <Text>Converted amount: {convertedAmount} {toCurrency}</Text>
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
