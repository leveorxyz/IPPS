import type { NextPage } from 'next';
import { Container, Flex, Stack, Text, Image } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={10} justifyContent="space-around">
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
              Bank
            </Text>
          </Flex>
          <Flex gap={5}>
            <Text textTransform="uppercase">Status:</Text>
            <Text color="white" fontWeight="bold">
              Verified
            </Text>
          </Flex>
        </Stack>
        <Image src="/images/placeholder.png" alt="Image" />
      </Flex>
    </Container>
  );
};

export default Home;
