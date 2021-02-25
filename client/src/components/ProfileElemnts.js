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
  InputGroup,
  InputRightAddon,
  Center,
  useMediaQuery,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Card from "./Card";

const ProfileElemnts = ({ isOwner, askQuestion, user }) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { colorMode, toggleColorMode } = useColorMode();

  const [view, setView] = useState("answered");
  const [question, setQuestion] = useState("");
  const [isActive, setIsActive] = useState(true);

  // push
  var answered = new Array();
  var inbox = new Array();
  user.posts.map((post, i) => {
    if (post.answer) {
      answered.push(
        <Card
          key={i}
          question={post.question.questionTxt}
          answer={post.answer.answerTxt}
          id={post._id}
          user={user}
          isMobile={isMobile}
        ></Card>
      );
    } else
      inbox.push(
        <Card key={i} question={post.question.questionTxt} id={post._id}></Card>
      );
  });

  return (
    <div>
      <Container h="120vh" maxW="70rem" centerContent pt="8rem">
        <Flex
          p="1rem"
          align="center"
          justify="flex-start"
          w="100%"
          mb="3rem"
          wrap="nowrap"
        >
          <Avatar
            size={isMobile ? "lg" : "2xl"}
            src="https://bit.ly/broken-link"
          />

          <Box ms="1rem">
            <Heading as="h2" fontSize={["xl", "md", "lg", "xl"]} d="inline">
              {user.name}
            </Heading>
            <Text> {`@${user.username}`}</Text>
          </Box>
        </Flex>

        <Box w="100%">
          {isOwner ? (
            <Tabs colorScheme="brand" isFitted w="100%" align="end">
              <TabList>
                <Tab>Answered</Tab>
                <Tab>Inbox</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>{answered}</TabPanel>
                <TabPanel>{inbox}</TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            answered
          )}
        </Box>

        {!isOwner ? (
          <Flex position="fixed" top="93vh" w="20rem">
            <InputGroup
              boxShadow="xl"
              bg={colorMode === "dark" ? "gray.800" : "white"}
            >
              <Input onChange={(e) => setQuestion(e.target.value)} />
              <InputRightAddon
                p="0"
                children={
                  <Button onClick={() => askQuestion(question, user.username)}>
                    Ask
                  </Button>
                }
              />
            </InputGroup>
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default ProfileElemnts;
