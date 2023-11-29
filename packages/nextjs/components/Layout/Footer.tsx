import {
  SimpleGrid,
  Box,
  Text,
  VStack,
  Heading,
  Container,
  Flex,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { IoLogoInstagram, IoLogoFacebook, IoLogoTwitter } from 'react-icons/io5';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <Box as="footer">
      <Container maxW="container.xl">
        <SimpleGrid
          columns={[1, 4, 5]}
          spacing={10}
          py={5}
          mt={10}
          borderBottom="1px solid"
          borderBottomColor="gray.100"
          color="white.100"
        >
          <Box gridColumn={['1 span', '2 span']}>
            <Logo fontSize="30px" />
            <Text mt={5}>
            IPPS is the frictionless, zero intermediary, and no bullshit all-in-one payment solution that you and your business need.
            </Text>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">About</Heading>
              <a href="#!">Product</a>
              <a href="#!">Terms & Condition</a>
              <a href="#!">FAQ</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">Company</Heading>
              <a href="#!">Our Team</a>
              <a href="#!">Partner With Us</a>
              <a href="#!">Privacy & Policy</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">Contact</Heading>
              <a href="#!">+880 13 09 0009 47</a>
              <a href="mailto:contact@leveor.xyz">contact@leveor.xyz</a>
            </VStack>
          </Box>
        </SimpleGrid>
        <Flex justifyContent="space-between" py="5">
          <Box>
            <HStack gap="5">
              <Icon as={IoLogoInstagram} />
              <Icon as={IoLogoFacebook} />
              <Icon as={IoLogoTwitter} />
            </HStack>
          </Box>
          <Text fontSize="sm">Copyright {new Date().getFullYear()} IPPS</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
