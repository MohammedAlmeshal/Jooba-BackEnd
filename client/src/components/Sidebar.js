import React from "react";
import { Flex, Box, Center } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Sidebar = ({ links, langButton, color }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Center  h="45px">
      <Flex justify="flex-start" width="90%">
        <HamburgerIcon color={color} onClick={onOpen} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
            <Flex onClick={onClose}  mt='2rem' h='5em' flexDir='column' align='center' justify='space-between' >
                {links}
                {langButton}
            </Flex>
            
              
              
              </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Center>
  );
};

export default Sidebar;
