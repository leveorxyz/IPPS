import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Apply from '../components/Apply/Apply';

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Apply />
    </Container>
  );
};

export default Home;
