import type { NextPage } from 'next';
import { Container, Flex, Text, Box } from '@chakra-ui/react';

const MerchantCreatePayment: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        flexDir="column"
        fontSize="lg"
        gap={10}
        justifyContent="center"
        w="full"
        h="60vh"
        alignItems="center"
      >
        <Box bgImage="/images/QRCode.png" w="300px" h="300px" bgRepeat="no-repeat" bgSize="cover">
          <Flex h="full" justifyContent="center" alignItems="center">
            <Text
              bg="rgba(19, 34, 53, 0.95)"
              p="5"
              color="white"
              fontWeight="bold"
              borderRadius="full"
            >
              45.06 <br />
              USDT
            </Text>
          </Flex>
        </Box>
        <Text fontSize="xl" color="white" textTransform="uppercase">
          Scan
        </Text>
        <Text fontSize="sm" color="white">
          Expires in: 3 minutes
        </Text>
      </Flex>
    </Container>
  );
};

export default MerchantCreatePayment;
