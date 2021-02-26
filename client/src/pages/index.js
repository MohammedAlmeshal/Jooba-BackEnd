import React from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";
import Background from "../public/texture3.svg";
const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Logo = colorMode === "light" ? LogoLight : LogoDark;

  return (
    <Center
      h="100vh"
      style={{ backgroundImage: `url(${Background})` }}
      w="100%"
      pt="7rem"
    >
      <Flex justify="center" align="center" w="90%" wrap="wrap">
        <Heading textAlign="center" fontWeight="800" fontSize="8xl" as="h1">
          Got <br /> a <br /> question
        </Heading>

        <img width="700px" src={Logo}></img>
      </Flex>
    </Center>
  );
};

export default Home;
