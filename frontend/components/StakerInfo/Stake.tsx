import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import StakeModal from './StakeModal';

const Stake = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex gap={5} alignItems="center" direction={['column', 'row']}>
        <Button variant="outline" textTransform="uppercase" onClick={onOpen}>
          stake yourself
        </Button>
        <Text textTransform="uppercase">
          Current staked <b>23.456 USDT</b>
        </Text>
        <Text textTransform="uppercase">
          Total Stakers <b>12.456 USDT</b>
        </Text>
      </Flex>
      <StakeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Stake;
