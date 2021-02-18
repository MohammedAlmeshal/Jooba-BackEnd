import React from "react";
import {
  Avatar,
  Text,
  Heading,
  Box,
  Divider,
  Button,
  ButtonGroup, 
} from "@chakra-ui/react";

const Card = ({ question, answer }) => {
  const answerRender = (
    <Box p="1rem">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Heading as="h4" size="sm" d="inline" mr="1rem">
        Mohammed
      </Heading>
      <Text ml="5rem"> {answer}</Text>
    </Box>
  );

  const answerActions = (
    <ButtonGroup width={"50%"} isAttached={true}>
      <Button isFullWidth={"ture"} colorScheme="blue">
        Reply
      </Button>
      <Button isFullWidth={"ture"}>Ignore</Button>
    </ButtonGroup>
  );

  return (
    <Box border="1px" borderColor="gray.200" m="1rem">
      <Box p="1rem">
        <Heading as="h4" size="sm" color="darkRed" d="inline" mr="1rem">
          Anon
        </Heading>
        <Text d="inline">{question}</Text>
      </Box>
      <Divider />
      {answer ? answerRender : answerActions}
    </Box>
  );
};

export default Card;
