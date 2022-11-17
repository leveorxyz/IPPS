import { Box, Image, HStack, Text, Avatar } from '@chakra-ui/react';

const BankCard = () => {
  return (
    <Box
      minW="328px"
      height="405px"
      bg="brand.100"
      border="1px solid"
      borderRadius="3xl"
      borderTopColor="#4274C4"
      borderRightColor="#52A3DD"
      borderBottomColor="#74F2C2"
      borderLeftColor="#B0FF93"
      padding="4"
    >
      <Image src="/images/placeholder.png" alt="Staker" w="full" />
      <HStack justifyContent="space-between" mt="2">
        <Text textTransform="uppercase" fontSize="xs">
          Routing number <b>#45676</b>
        </Text>
        <Text textTransform="uppercase" fontSize="xs">
          Currency <b>USD</b>
        </Text>
      </HStack>
      <HStack mt={2}>
        <Avatar src="/images/user.png" />
        <Box>
          <Text textTransform="uppercase" fontWeight="bold">
            DUTCH BANK
          </Text>
          {/* <Text>Account Name</Text> */}
        </Box>
      </HStack>
    </Box>
  );
};

export default BankCard;
