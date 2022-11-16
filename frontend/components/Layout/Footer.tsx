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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores deleniti, minus
              quaerat voluptas quo tempore facilis commodi, officia accusantium odio optio velit,
              architecto totam ad nobis tempora! Impedit, sed eos.
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
              <a href="#!">+1 339-707-5370</a>
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
