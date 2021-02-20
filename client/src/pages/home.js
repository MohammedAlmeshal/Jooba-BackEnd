import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, askQuestion } from "../actions";
import {
  Container,
  Button,
  ButtonGroup,
  Heading,
  Avatar,
  Box,
  Flex,
  Input,
  Center,
} from "@chakra-ui/react";
import Card from "../components/Card";

const Home = ({ isAuthenticated, posts, getPosts, askQuestion }) => {
  const [view, setView] = useState("answered");
  const [question, setQuestion] = useState("");
  useEffect(() => {
    getPosts();
  }, []);

  // push
  var answered = new Array();
  var inbox = new Array();
  posts.map((post) => {
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
          <Heading as="h2" size="xl" d="inline" ml="2rem">
            Mohammed
          </Heading>
        </Flex>
        <Center w="80%">
          {isAuthenticated ? (
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

        {view === "answered" ? answered : isAuthenticated? inbox: null}
        <Flex>
          <Input onChange={(e) => setQuestion(e.target.value)} />
          <Button onClick={() => askQuestion(question)}>Ask</Button>
        </Flex>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { getPosts, askQuestion })(Home);
