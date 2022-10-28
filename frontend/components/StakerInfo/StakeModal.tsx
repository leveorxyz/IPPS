import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { MdOutlineMoney } from 'react-icons/md';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent
        background="brand.100"
        border="1px solid"
        borderTopColor="#4274C4"
        borderRightColor="#52A3DD"
        borderBottomColor="#74F2C2"
        borderLeftColor="#B0FF93"
      >
        <ModalHeader textTransform="uppercase">Stake Amount</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form">
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineMoney color="gray.300" />
                </InputLeftElement>
                <Input type="number" placeholder="Enter amount" required />
              </InputGroup>
            </FormControl>
            <Button variant="outline" type="submit" textTransform="uppercase" w="full" my="5">
              stake
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakeModal;
