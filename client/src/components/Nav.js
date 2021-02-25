import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  useColorMode,
  Button,
  Flex,
  Box,
  Center,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { SunIcon } from "@chakra-ui/icons";

import Navbar from "./Navbar";
import Logout from "./Logout";
import Logo from "../public/logo.svg";
import Sidebar from "./Sidebar";

const Nav = ({ isAuthenticated, isLoading, username }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [lang, setLang] = useState("AR");
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const color = colorMode === "light" ? "brand.100" : "brand.200";

  const toggleLang = () => {
    if (document.documentElement.lang === "ar") {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      setLang("AR");
    } else {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
      setLang("EN");
    }
  };

  const links =
    !isLoading && isLoading !== null ? (
      isAuthenticated ? (
        <>
          {" "}
          <Link to="/">
            {" "}
            <Logout />
          </Link>{" "}
          <p>{username}</p>{" "}
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">Login</Link> <Link to="/signup">Sign up</Link>{" "}
        </>
      )
    ) : null;

  const darkModeButton = (
    <Button me="1rem" bg="transparent" _focus="none" onClick={toggleColorMode}>
      {" "}
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );

  const langButton = (
    <Button onClick={() => toggleLang()}>
      {document.documentElement.lang === "ar" ? (
        <Text>{lang}</Text>
      ) : (
        <Text>{lang}</Text>
      )}
    </Button>
  );

  return (
    <>
      <Center
        position="fixed"
        w="100%"
        bg={colorMode === "dark" ? "gray.800" : "white"}
        zIndex="100"
        h="80px"
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "brand.100" : "brand.200"}
      >
        <Flex w="70rem" justify="space-between" align="center" m="0 2rem">
          <img width="85" src={Logo}></img>

          {isMobile ? (
            <Flex align="center">
              {darkModeButton}
              <Sidebar links={links} langButton={langButton} color={color} />
            </Flex>
          ) : (
            <Navbar
              links={links}
              darkModeButton={darkModeButton}
              langButton={langButton}
            />
          )}
        </Flex>
      </Center>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps)(Nav);
