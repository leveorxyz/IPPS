import type { NextPage } from 'next';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { TransactionCard } from './customer-home';

interface Props {
  tokenName: string;
  balance: number;
}

const MerchantTxnHistory: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading size="md" color="white" textTransform="uppercase" textAlign="center" mt="5">
        Recent Transactions
      </Heading>

      <Stack gap={5} mt="10" fontSize="md">
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

export default MerchantTxnHistory;
