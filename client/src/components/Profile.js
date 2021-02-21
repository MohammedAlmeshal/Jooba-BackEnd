import React, { useState } from "react";
import {
  Container,
  Button,
  ButtonGroup,
  Heading,
  Avatar,
  Box,
  Text,
  Flex,
  Input,
  Center,
} from "@chakra-ui/react";
import Card from "../components/Card";

const Profile = ({ isOwner, askQuestion, user }) => {
  const [view, setView] = useState("answered");
  const [question, setQuestion] = useState("");
  console.log(isOwner)

  // push
  var answered = new Array();
  var inbox = new Array();
  user.posts.map((post) => {
    if (post.answer) {
      answered.push(
        <Card
          question={post.question.questionTxt}
          answer={post.answer.answerTxt}
          id={post._id}
        ></Card>
      );
    } else
      inbox.push(
        <Card question={post.question.questionTxt} id={post._id}></Card>
      );
  });

  return (
    <div>
      <Container maxW="70%" centerContent>
        <Flex
          p="1rem"
          align="center"
          justify="flex-start"
          w="70%"
          mb="3rem"
          wrap="wrap"
        >
          <Avatar
            size="2xl"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />

          <Box ml="2rem">
            <Heading as="h2" size="xl" d="inline">
              {user.name}
            </Heading>
            <Text> {`@${user.username}`}</Text>
          </Box>
        </Flex>
        <Center w="80%">
          {isOwner ? (
            <ButtonGroup width={"100%"} isAttached={true}>
              <Button
                onClick={() => setView("answered")}
                isFullWidth={"ture"}
                colorScheme="blue"
              >
                Answered
              </Button>
              <Button onClick={() => setView("inbox")} isFullWidth={"ture"}>
                Question Inbox
              </Button>
            </ButtonGroup>
          ) : null}
        </Center>

        {view === "answered" ? answered : isOwner ? inbox : null}
        {!isOwner ? 
        <Flex>
          <Input onChange={(e) => setQuestion(e.target.value)} />
          <Button onClick={() => askQuestion(question, user.username)}>
            Ask
          </Button>
        </Flex> : null }
      </Container>
    </div>
  );
};

export default Profile;
