import React, { useState } from "react";
import { connect } from "react-redux";
import { ignoreQuestion, answerToQuestion } from "../actions";

import {
  Avatar,
  Text,
  Heading,
  Box,
  Divider,
  Button,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";

const Card = ({ question, answer, id, ignoreQuestion, answerToQuestion }) => {
  const [newAnswer, setNewAnswer] = useState("");
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
      <Button
        onClick={() => answerToQuestion(newAnswer, id)}
        isFullWidth={"ture"}
        colorScheme="blue"
      >
        Reply
      </Button>
      <Input onChange={(e) => setNewAnswer(e.target.value)} />

      <Button isFullWidth={"ture"} onClick={() => ignoreQuestion(id)}>
        Ignore
      </Button>
    </ButtonGroup>
  );

  return (
    <Box border="1px" borderColor="gray.200" m="1rem" w="70%">
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

export default connect(null, { ignoreQuestion, answerToQuestion })(Card);
