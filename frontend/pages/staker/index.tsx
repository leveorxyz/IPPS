import type { NextPage } from 'next';
import { Container, Flex, SimpleGrid } from '@chakra-ui/react';
import StakerCard from '../../components/StakerInfo/StakerCard';
import Pagination from '../../components/Pagination/Pagination';

const Staker: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <SimpleGrid columns={[1, 2, 4]} gap={10}>
        {Array.from(Array(16).keys()).map((idx) => (
          <StakerCard key={idx} id={idx} />
        ))}
      </SimpleGrid>
      <Flex justifyContent="flex-end" mt="14">
        <Pagination />
      </Flex>
    </Container>
  );
};

export default Staker;
