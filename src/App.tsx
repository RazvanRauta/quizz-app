import React, { Fragment, MouseEvent, useState } from 'react'
import {
  Box,
  Heading,
  Button,
  Text,
  Spinner,
  Flex,
  Code,
  Grid,
  useColorModeValue,
} from '@chakra-ui/core'
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [active, setActive] = useState(false)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
    setActive(false)
  }

  const gameOverBg = useColorModeValue(
    '',
    'linear-gradient(45deg,#61045f,#aa076b)'
  )

  const bgColor = useColorModeValue('cyan.400', '')

  const finalScore = useColorModeValue('purple.800', 'teal.200')

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) {
        setScore((prev) => prev + 1)
        setActive(true)
      }
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObj])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
    setActive(false)
  }
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  }

  const Main = () => {
    return (
      <Grid
        as="main"
        gridArea="main"
        overflow="auto"
        gridTemplateRows="1fr auto"
        gridTemplateColumns="1fr minmax(0, 600px) 1fr"
      >
        <Box
          textAlign="center"
          fontSize="xl"
          gridArea="1 / 1 / 1 / 4"
          overflow="auto"
        >
          <Flex
            minH="75vh"
            direction="column"
            p={3}
            justifyContent="flex-start"
            alignItems="center"
            maxWidth={800}
            mx="auto"
            position="relative"
          >
            <Heading
              as={'h1'}
              backgroundImage={useColorModeValue(
                'linear-gradient(45deg,#fdeff9,#ec38bc,#7303c0)',
                ''
              )}
              border={useColorModeValue('', '1px solid #fdeff9')}
              backgroundSize="100%"
              rounded="full"
              css={{
                backgroundClip: 'text',
                filter: 'drop-shadow(2px 2px #0085a3)',
              }}
              margin={'20px'}
              px={6}
            >
              React Quiz
            </Heading>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <Button
                maxWidth="max-content"
                onClick={startTrivia}
                backgroundColor={bgColor}
                backgroundImage={gameOverBg}
                position="absolute"
                top={200}
                zIndex={10}
                fontSize="l"
                _focus={{
                  boxShadow: 'none',
                }}
              >
                Start Game
              </Button>
            ) : null}
            {loading && <Spinner mt={'200px'} size="xl" color="teal.500" />}
            {!loading &&
              !gameOver &&
              userAnswers.length !== TOTAL_QUESTIONS && (
                <QuestionCard
                  questionNumber={number + 1}
                  totalQuestions={TOTAL_QUESTIONS}
                  question={questions[number].question}
                  answers={questions[number].answers}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  callback={checkAnswer}
                  score={score}
                />
              )}
            {userAnswers.length === TOTAL_QUESTIONS && (
              <Flex
                direction="column"
                backgroundColor="gray.50"
                backgroundImage={gameOverBg}
                rounded="10px"
                marginTop="180px"
                p={5}
              >
                <Text fontWeight="bold">Game Over</Text>
                <Text>
                  Final score:
                  <Code
                    ml={2}
                    rounded="full"
                    fontWeight="bold"
                    fontSize="xl"
                    color={finalScore}
                  >
                    {score}
                  </Code>
                </Text>
              </Flex>
            )}
            {!gameOver &&
              !loading &&
              userAnswers.length === number + 1 &&
              number !== TOTAL_QUESTIONS - 1 && (
                <Button
                  maxWidth="max-content"
                  onClick={nextQuestion}
                  mt={8}
                  backgroundColor={bgColor}
                  backgroundImage={gameOverBg}
                  _focus={{
                    boxShadow: 'none',
                  }}
                >
                  Next Question
                </Button>
              )}
          </Flex>
        </Box>
        <Footer />
      </Grid>
    )
  }

  return (
    <Fragment>
      <Grid
        templateColumns="1fr"
        templateRows="auto 1fr"
        templateAreas='"header" "main"'
        height="100vh"
        backgroundImage={useColorModeValue(
          'linear-gradient(to right,#29ffc6,#20e3b2,#0cebeb)',
          'linear-gradient(45deg, #203a43,#0f2027,#2c5364)'
        )}
      >
        <Header />
        <Main />
      </Grid>
    </Fragment>
  )
}

export default App
