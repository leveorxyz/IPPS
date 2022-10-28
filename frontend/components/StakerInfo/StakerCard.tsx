import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface IProps {
  id: string | number;
}

const StakerCard = ({ id }: IProps) => {
  return (
    <Link href={`/staker/${id}`}>
      <Box
        padding="4"
        background="brand.100"
        border="1px solid"
        borderRadius="3xl"
        borderTopColor="#4274C4"
        borderRightColor="#52A3DD"
        borderBottomColor="#74F2C2"
        borderLeftColor="#B0FF93"
      >
        <HStack>
          <Avatar src="/images/user.png" />
          <Box>
            <Text fontWeight="bold">Bank78AH1</Text>
            <Text fontSize="sm">
              Current Stake <b>23.22 USDT</b>
            </Text>
            <Text fontSize="sm">
              More Required <b>12.11 USDT</b>
            </Text>
          </Box>
        </HStack>
      </Box>
    </Link>
  );
};

export default StakerCard;
