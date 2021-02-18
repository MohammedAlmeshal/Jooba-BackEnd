import React, { useState } from "react";
import {
  Container,
  Button,
  ButtonGroup,
  Heading,
  Avatar,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import Card from "./Card";

const Home = () => {
  const [view, setView] = useState("answered");
  const posts = [
    {
      question: {
        questionTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
      answer: {
        answerTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
    },
    {
      question: {
        questionTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
      answer: {
        answerTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
    },
    {
      question: {
        questionTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
      answer: {
        answerTxt: "Esse aliqua anim do sunt magna consectetur.",
      },
    },
  ];

  const answered = posts.map((post) => {
    return (
      <Card
        question={post.question.questionTxt}
        answer={post.answer.answerTxt}
      ></Card>
    );
  });

  const inbox = posts.map((post) => {
    return <Card question={post.question.questionTxt}></Card>;
  });

  return (
    <div>
      <Container maxW="70%" centerContent>
        <Flex p="1rem" align="center" justify="flex-start" w="70%" mb="3rem">
          <Avatar
            size="2xl"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Heading as="h2" size="xl" d="inline" ml="2rem">
            Mohammed
          </Heading>
        </Flex>
        <ButtonGroup width={"50%"} isAttached={true}>
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
        {view === "answered" ? answered : inbox}
        <Flex>
          <Input />
          <Button>Ask</Button>
        </Flex>
      </Container>
    </div>
  );
};

export default Home;
