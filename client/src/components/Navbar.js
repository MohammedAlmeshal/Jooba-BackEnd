import React, { useState } from "react";

import { Button, Flex, Box, Center, Text } from "@chakra-ui/react";

const Navbar = ({ links, darkModeButton, langButton }) => {
  return (
    <>
      <Flex w="20rem" justify="space-between" align="center">
        <Flex w="8rem" justify="space-between">
          {links}
        </Flex>

        <Box>
          {darkModeButton}
          {langButton}
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
