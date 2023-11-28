import Link from 'next/link';
import { Box, Flex, Button, HStack, Container, useBoolean } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MobileDrawer from './MobileDrawer';
import Logo from '../Logo/Logo';
import MenuLink from '../MenuLink/MenuLink';
import { useGlobalState } from '~~/services/store/store';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useBoolean(false);
  const userType = useGlobalState(state => state.userType);
  console.log({userType});
  
  return (
    <Box py={4}>
      <Container maxW="container.xl">
        <Box>
          <Flex as="nav" justifyContent="space-between">
            <Link href="/">
              <Logo />
            </Link>
            
            <HStack gap={7} display={{ base: 'none', md: 'flex' }}>
            {userType === "Bank" && (
              <>
              <MenuLink link="/" text="home" />
              <MenuLink link="/enlist" text="apply for enlistment" />
              <MenuLink link="/bank" text="bank" />
              <MenuLink link="/staker" text="staker info" />
              <MenuLink link="/earnings" text="My earnings" />
              </>
              )
            }
              <ConnectButton label="Connect Wallet" />
            </HStack>
            
            <Button variant="link" onClick={setDrawerOpen.on} display={{ md: 'none' }}>
              <IoMenu size="30" />
            </Button>
          </Flex>
          <MobileDrawer onClose={setDrawerOpen.off} isOpen={drawerOpen} />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
