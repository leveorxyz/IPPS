import type { NextPage } from "next";
import {
  AbsoluteCenter,
  Box,
  Button,
  Heading,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
     
     <Box position="relative" h="100px">
      <AbsoluteCenter mt="2">
      <Heading
      background={"linear-gradient(93.51deg, #4274C4 2.84%, #B0FF93 99.18%)"}
      textColor={"black"}
      >InterPlanetary Payment System</Heading>
      </AbsoluteCenter>
      </Box>
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
