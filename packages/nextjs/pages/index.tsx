import type { NextPage } from "next";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box position="relative" h="100px">
        <AbsoluteCenter mt="2">
        <Link href="/signup">
          <Button
            variant="outline"
            borderColor="blue"
            size="sm"
            textColor="teal"
          >
            Sign Up
          </Button>
          </Link>
        </AbsoluteCenter>
      </Box>
      <Box position="relative" h="100px">
        <AbsoluteCenter mt="2">
        <Link href="/login">
          <Button
            variant="outline"
            borderColor="blue"
            size="sm"
            textColor="teal"
          >
            Log In
          </Button>
          </Link>
        </AbsoluteCenter>
      </Box>
    </Container>
  );
};

export default Home;
