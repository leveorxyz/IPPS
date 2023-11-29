import type { NextPage } from 'next';
import { Container, Text } from '@chakra-ui/react';
import EarningTable from '../components/StakerInfo/EarningTable';

const Earnings: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Text textTransform="uppercase">
        My Earnings <b>89.78 USDT</b>
      </Text>
      <EarningTable />
    </Container>
  );
};

export default Earnings;
