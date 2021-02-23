import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const AnswerModal = ({ question, id, answerToQuestion }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAnswer, setNewAnswer] = useState("");

  return (
    <>
      <Button onClick={onOpen}>Answer</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> --- </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
{question}

          </ModalBody>
          <ModalFooter>
            <Input onChange={(e) => setNewAnswer(e.target.value)} />

            <Button
              onClick={() => {answerToQuestion(newAnswer, id); onClose() } }
              colorScheme="blue"
              mr={3}
           
            >
              Answer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerModal;
