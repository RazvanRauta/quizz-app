import React, { MouseEvent, useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/core";
import theme from "./theme";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionsState } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <ChakraProvider theme={theme} resetCSS>
      <header>
        <Box
          width="100%"
          borderBottom="1px solid"
          borderColor="gray.200"
          boxShadow="0px 1px 5px #E2E8F0"
          backgroundColor="gray.50"
        >
          <Flex
            maxW={1200}
            justifyContent="space-between"
            width="100%"
            mx="auto"
            py={6}
          >
            <Logo maxH={8} />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Box>
      </header>
      <Box textAlign="center" fontSize="xl">
        <Flex
          minH="75vh"
          direction="column"
          p={3}
          justifyContent="center"
          alignItems="center"
          maxWidth={800}
          mx="auto"
        >
          <Heading
            as={"h1"}
            backgroundImage={"linear-gradient(180deg,#fff,#87f1ff)"}
            backgroundSize="100%"
            css={{
              backgroundClip: "text",
              filter: "drop-shadow(2px 2px #0085a3)",
            }}
            margin={"20px"}
            px={4}
          >
            React Quiz
          </Heading>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <Button
              maxWidth="max-content"
              onClick={startTrivia}
              _focus={{
                boxShadow: "none",
              }}
            >
              Start
            </Button>
          ) : null}
          {!gameOver && <Text fontSize={"2rem"}>Score:{score}</Text>}
          {loading && <Spinner size="xl" color="teal.500" />}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 && (
              <Button
                maxWidth="max-content"
                onClick={nextQuestion}
                _focus={{
                  boxShadow: "none",
                }}
              >
                Next Question
              </Button>
            )}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;
