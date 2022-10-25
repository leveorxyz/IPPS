import {
  Box,
  HStack,
  Text,
  Heading,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
} from '@chakra-ui/react';
import { MdDownload } from 'react-icons/md';

const BankInfo = () => {
  return (
    <Box>
      <Heading size="sm">BANK NAME</Heading>
      <Text>location #dhaka bangladesh</Text>

      <Box
        bg="brand.100"
        border="1px solid"
        borderRadius="3xl"
        borderTopColor="#4274C4"
        borderRightColor="#52A3DD"
        borderBottomColor="#74F2C2"
        borderLeftColor="#B0FF93"
        padding="4"
        width="full"
        mt={5}
      >
        <Text fontWeight="bold">Download Attachment</Text>
        <HStack>
          <Icon as={MdDownload} />
          <a href="#!">documents001c25.pdf</a>
        </HStack>

        <Text fontWeight="bold" mt="4">
          Description
        </Text>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab quibusdam harum accusantium
          non eius! Aliquid sed obcaecati quisquam perspiciatis vitae sint consequuntur esse porro!
          Eum quidem aspernatur deleniti enim quo.
        </Text>
      </Box>

      <HStack justifyContent="space-between" mt={5}>
        <Text textTransform="uppercase" letterSpacing={2} fontWeight="bold">
          Earn 0.5% on each transaction
        </Text>
        <Box>
          <Text textTransform="uppercase" letterSpacing={2} fontWeight="bold">
            claimed limit staked 65%
          </Text>
          <Slider aria-label="claimed limit slider" colorScheme="blue" defaultValue={65} isReadOnly>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </HStack>
      <Button textTransform="uppercase" w="full" variant="outline" mt="4">
        stake for this bank
      </Button>
    </Box>
  );
};

export default BankInfo;
