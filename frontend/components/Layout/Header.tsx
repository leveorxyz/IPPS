import Link from 'next/link';
import { Box, Flex, Button, HStack, Container, useBoolean } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MobileDrawer from './MobileDrawer';
import Logo from '../Logo/Logo';
import MenuLink from '../MenuLink/MenuLink';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useBoolean(false);

  return (
    <Box py={4}>
      <Container maxW="container.xl">
        <Box>
          <Flex as="nav" justifyContent="space-between">
            <Link href="/">
              <Logo />
            </Link>

            <HStack gap={7} display={{ base: 'none', md: 'flex' }}>
              <MenuLink link="/" text="home" />
              <MenuLink link="/" text="apply for enlistment" />
              <MenuLink link="/staker" text="Banks" />
              <MenuLink link="/bank" text="staker info" />
              <MenuLink link="/earnings" text="My earnings" />
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
