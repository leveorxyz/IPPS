import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Scanner from '../components/Mobile/Scanner';
import Transactions from '../components/Mobile/Transactions';

const Mobile: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Scanner />
      <Transactions />
    </Container>
  );
};

export default Mobile;
