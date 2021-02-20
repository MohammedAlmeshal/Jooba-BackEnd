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
    useDisclosure
  } from "@chakra-ui/react"

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  return (
      <Center bg="whitesmoke" h="45px"  >
            <Flex justify="flex-start" width='90%'>
      <HamburgerIcon onClick={onOpen} />
    </Flex>
    <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement='left'
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
       <p>Hi</p>
            </DrawerBody>

         
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      </Center>
  
  );
};

export default Sidebar;
