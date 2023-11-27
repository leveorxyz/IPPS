import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Stake from '../components/StakerInfo/Stake';
import StakeTable from '../components/StakerInfo/StakeTable';

const Staker: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Stake />
      <StakeTable />
    </Container>
  );
};

export default Staker;
