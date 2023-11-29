import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Apply from '../components/Apply/Apply';

const Enlist: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Apply />
    </Container>
  );
};

export default Enlist;