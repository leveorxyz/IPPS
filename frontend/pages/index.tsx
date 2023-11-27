import type { NextPage } from "next";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box position="relative" h="100px">
        <AbsoluteCenter mt="2">
          <Button
            variant="outline"
            borderColor="blue"
            size="sm"
            textColor="teal"
          >
            Sign Up
          </Button>
        </AbsoluteCenter>
      </Box>
      <Box position="relative" h="100px">
        <AbsoluteCenter mt="2">
          <Button
            variant="outline"
            borderColor="blue"
            size="sm"
            textColor="teal"
          >
            Log In
          </Button>
        </AbsoluteCenter>
      </Box>
    </Container>
  );
};

export default Home;
