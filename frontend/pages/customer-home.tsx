import type { NextPage } from 'next';
import { Box, Container, Flex, Stack, Text, Image, Heading, Divider } from '@chakra-ui/react';

interface Props {
  tokenName: string;
  balance: number;
}

export const TokenCard = ({ tokenName, balance }: Props) => {
  return (
    <Box
      minW="400px"
      bg="linear-gradient(rgba(58, 129, 191, 0.08),rgba(65, 48, 90, 0.08))"
      p="5"
      borderRadius="20"
    >
      <Flex justifyContent="space-between">
        <Text color="white" fontWeight="bold">
          Token:
        </Text>
        <Text color="white" fontWeight="bold" ml="5">
          {tokenName}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" mt="5">
        <Text color="white" fontWeight="bold">
          Balance:
        </Text>
        <Text color="white" fontWeight="bold" ml="5">
          {balance} $
        </Text>
      </Flex>
    </Box>
  );
};

interface TxnProps {
  from: string;
  to: string;
  amount: number;
  date: string;
}

export const TransactionCard = ({ from, to, amount, date }: TxnProps) => {
  return (
    <Box
      minW="400px"
      bg="linear-gradient(rgba(58, 129, 191, 0.08),rgba(65, 48, 90, 0.08))"
      p="5"
      borderRadius="20"
    >
      <Flex gap={10} alignItems="center">
        <Text color="white" fontWeight="bold">
          {from}
        </Text>
        <Flex direction="column" alignItems="center">
          <Text color="white" fontWeight="bold">
            {amount} $
          </Text>
          <Divider />
          <Text color="white" fontWeight="bold" ml="5">
            {date}
          </Text>
        </Flex>
        <Text color="white" fontWeight="bold" ml="5">
          {to}
        </Text>
      </Flex>
    </Box>
  );
};

const CustomerHome: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        fontSize="lg"
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        justifyContent="space-between"
        w="full"
      >
        <Box>
          <Stack gap={10}>
            <Flex gap={5}>
              <Text textTransform="uppercase">User:</Text>
              <Text color="white" fontWeight="bold">
                User Name
              </Text>
            </Flex>
            <Flex gap={5}>
              <Text textTransform="uppercase">User type:</Text>
              <Text color="white" fontWeight="bold">
                Customer
              </Text>
            </Flex>
          </Stack>

          <Heading size="lg" mt="5" textDecor="underline">
            TOKEN LIST
          </Heading>

          <Stack gap={5} mt="5" fontSize="md">
            <TokenCard tokenName="USDT" balance={1000} />
            <TokenCard tokenName="Ether" balance={100} />
          </Stack>
        </Box>
        <Box>
          <Image src="/images/placeholder.png" alt="Image" />
        </Box>
      </Flex>

      <Heading size="sm" mt="5" textDecor="underline">
        Recent Transactions
      </Heading>

      <Stack gap={5} mt="5" fontSize="md">
        <TransactionCard
          from="FGHA****G6HG"
          to="AB****G6HG"
          amount={12.34}
          date="18 Mar 2022 12:23 pm"
        />
        <TransactionCard
          from="FGHA****G6HG"
          to="AB****G6HG"
          amount={12.34}
          date="18 Mar 2022 12:23 pm"
        />
        <TransactionCard
          from="FGHA****G6HG"
          to="AB****G6HG"
          amount={12.34}
          date="18 Mar 2022 12:23 pm"
        />
        <TransactionCard
          from="FGHA****G6HG"
          to="AB****G6HG"
          amount={12.34}
          date="18 Mar 2022 12:23 pm"
        />
      </Stack>
    </Container>
  );
};

export default CustomerHome;
