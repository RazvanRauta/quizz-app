import React, { MouseEvent } from "react";
import { Box, Text, VStack, Button, Grid } from "@chakra-ui/core";
import { AnswerObject } from "../App";

interface Props {
  question: string;
  answers: string[];
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  callback,
  questionNumber,
  totalQuestions,
}) => (
  <Box backgroundColor="gray.50" rounded="10px" p={10} position="relative">
    <Text
      px={2}
      backgroundColor={"teal.100"}
      maxWidth="max-content"
      rounded="full"
      position="absolute"
      left={4}
      top={4}
    >
      {questionNumber} / {totalQuestions}
    </Text>
    <Text mt={10} pb={4} dangerouslySetInnerHTML={{ __html: question }}></Text>
    <Grid
      templateColumns={"1fr 1fr"}
      gap={6}
      width={"600px"}
      mx={"auto"}
      mt={10}
    >
      {answers.map((answer) => (
        <Box key={answer}>
          <Button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </Button>
        </Box>
      ))}
    </Grid>
  </Box>
);

export default QuestionCard;
