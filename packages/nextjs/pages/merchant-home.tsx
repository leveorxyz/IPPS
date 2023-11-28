import type { NextPage } from 'next';
import { Container, Flex, Stack, Text, Image, Button } from '@chakra-ui/react';

const MerchantHome: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        fontSize="lg"
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        justifyContent="space-around"
      >
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
              Merchant
            </Text>
          </Flex>
          <Flex gap={5}>
            <Text textTransform="uppercase">Status:</Text>
            <Text color="white" fontWeight="bold">
              Verified
            </Text>
          </Flex>

          <Button variant="outline" px="20">
            Create payment link
          </Button>
        </Stack>
        <Image src="/images/placeholder.png" alt="Image" />
      </Flex>
    </Container>
  );
};

export default MerchantHome;
