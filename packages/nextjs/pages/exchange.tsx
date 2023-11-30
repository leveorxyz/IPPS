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
import { utils } from "ethers";
import { SetStateAction, useState } from "react";

import { MdOutlineMoney } from "react-icons/md";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";

type Currency = "USD" | "EURO";

const Exchange = () => {
  const { address } = useAccount();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const {
    data,
    writeAsync,
    isLoading: checkWallet,
  } = useContractWrite({
    address: externalContracts.ExchangeProtocol.address,
    abi: externalContracts.ExchangeProtocol.abi,
    functionName: "transferToken",
  });

  const {
    writeAsync: tokenWriteUSDT,
  } = useContractWrite({
    address: externalContracts.USDT.address,
    abi: externalContracts.USDT.abi,
    functionName: "approve",
  });

  const {
    writeAsync: tokenWriteEURT,
  } = useContractWrite({
    address: externalContracts.TestEURT.address,
    abi: externalContracts.TestEURT.abi,
    functionName: "approve",
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

  const handleAmountChange = (e: { target: { value: any; }; }) => {
    setAmount(e.target.value);
  };

  const getCurrencyAddress = (currency: Currency) => {
    if(currency === "USD") return externalContracts.USDT.address
    else{
      return externalContracts.TestEURT.address
    }
  }

  async function exchange() {
    const sourceAmount = amount;
    if(fromCurrency === "USD"){
      setAmount((parseFloat(amount)*0.91).toString())
      await tokenWriteUSDT({
        args: [externalContracts.ExchangeProtocol.address, BigInt(utils.parseEther(sourceAmount).toString())]
      })
    }
    else{
      setAmount((parseFloat(amount)*1.10).toString())
      await tokenWriteEURT({
        args: [externalContracts.ExchangeProtocol.address, utils.parseEther(sourceAmount).toString()]
      })
    }
    console.log({amount});
   
    await writeAsync({
      args: [getCurrencyAddress(fromCurrency as Currency), getCurrencyAddress(toCurrency as Currency), address, utils.parseEther(amount).toString()],
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

              <Input onChange={handleAmountChange} type="number" placeholder="Enter amount" width={"47em"} required />
            </InputGroup>
          </FormControl>
        </Box>
      </Flex>

      <Flex justifyContent="center" mt={9} onClick={exchange}>
        <Button variant="outline">Exchange</Button>
      </Flex>
    </Container>
  );
};

export default Exchange;
