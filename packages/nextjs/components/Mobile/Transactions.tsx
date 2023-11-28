import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const Transactions = () => {
  return (
    <Box color="white" mt="10">
      <Text fontSize="sm">Recent transactions</Text>

      {Array.from(Array(10).keys()).map((k) => (
        <SimpleGrid
          key={k}
          mt="4"
          textAlign="center"
          columns={3}
          gap={5}
          w="full"
          fontSize="xs"
          alignItems="center"
          bgColor="rgba(66, 116, 196, 0.1)"
          p={3}
          borderRadius={10}
          fontWeight="bold"
        >
          <Text>FGHA****G6HG</Text>
          <Box>
            <Text>12.34 USDT</Text>
            <Box borderBottom="1px solid" borderBottomColor="gray" px={3} />
            <Text fontWeight="normal">18 Mar 2022 12:23 pm</Text>
          </Box>
          <Text>AB****G6HG</Text>
        </SimpleGrid>
      ))}
    </Box>
  );
};

export default Transactions;
