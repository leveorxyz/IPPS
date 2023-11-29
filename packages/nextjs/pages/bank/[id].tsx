import type { NextPage } from 'next';
import { Container, Flex } from '@chakra-ui/react';
import BankCard from '../../components/BankInfo/BankCard';
import BankInfo from '../../components/BankInfo/BankInfo';

const StakerDetails: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex gap={20}>
        <BankCard />
        <BankInfo />
      </Flex>
    </Container>
  );
};

export default StakerDetails;
