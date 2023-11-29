import type { NextPage } from "next";
import { Box, Button, Container, Flex, Heading, Stack, Text, Link } from "@chakra-ui/react";
import externalContracts from "~~/contracts/externalContracts";
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from "wagmi";
import { utils } from "ethers";

const FaucetEUR: NextPage = () => {
  const { address } = useAccount();

  const { data: eurtBalance, refetch } = useBalance({
    address: address,
    token: externalContracts.TestEURT.address,
  });

  const { data, writeAsync, isLoading: checkWallet } = useContractWrite({
    address: externalContracts.TestEURT.address,
    abi: externalContracts.TestEURT.abi,
    functionName: "mint",
    args: [address, utils.parseEther("10")],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      refetch();
    },
  });

  async function mintEURT() {
    await writeAsync();
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Flex fontSize="lg" direction={{ base: "column", md: "row" }} gap={10} justifyContent="center" w="full">
        <Stack gap={5} minW="400px">
          <Heading>Faucet for Test EURO token</Heading>
          <Box>
            {checkWallet && <div>Check wallet</div>}
            {isLoading && <div>Transaction processing...</div>}
            {isSuccess && <div className="text-green-700">Transaction successful | 
            <Link className="underline" target="_blank" href={"https://sepolia.etherscan.io/tx/" + data?.hash}> TX LINK</Link>
            </div>}
          </Box>
          <Box>{eurtBalance && <Text>Current EURT Balance: {eurtBalance.formatted}</Text>}</Box>
          <Box mx={"auto"}>
            <Button variant="outline" px="20" onClick={mintEURT}>
              Mint 10 EURT
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default FaucetEUR;
