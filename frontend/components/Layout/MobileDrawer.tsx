import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from '../Logo/Logo';
import MenuLink from '../MenuLink/MenuLink';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const MobileDrawer = (props: IProps) => {
  const { onClose, isOpen } = props;

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} closeOnOverlayClick>
      <DrawerOverlay />
      <DrawerContent bg="brand.100">
        <DrawerCloseButton fontSize={16} />
        <DrawerHeader borderBottomWidth="1px">
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems="flex-start" gap={8} mt={5}>
            <MenuLink link="/" text="home" />
            <MenuLink link="/" text="apply for enlistment" />
            <MenuLink link="/bank" text="staker info" />
            <ConnectButton label="Connect Wallet" />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
