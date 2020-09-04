import React, { MouseEvent } from 'react'
import { Box, Text, Button, Grid, useColorModeValue } from '@chakra-ui/core'
import { AnswerObject } from '../App'
import ConfettiCanvas from 'react-confetti-canvas'

interface Props {
  question: string
  answers: string[]
  callback: (e: MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
  score: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  callback,
  questionNumber,
  totalQuestions,
  score,
}) => {
  return (
    <Box
      role="QuestionCard"
      backgroundColor="gray.50"
      backgroundImage={useColorModeValue(
        '',
        'linear-gradient(45deg,#61045f,#aa076b)'
      )}
      rounded="10px"
      p={10}
      position="relative"
      maxW={['100%', 'unset']}
    >
      {!!userAnswer && userAnswer.correct && (
        <Box position="absolute" width="100%" height="100%" top={0} right={0}>
          <ConfettiCanvas />
        </Box>
      )}
      <Text
        px={2}
        backgroundColor={'teal.100'}
        maxWidth="max-content"
        rounded="full"
        backgroundImage={useColorModeValue(
          '',
          'linear-gradient(45deg, #41295a, #2f0743)'
        )}
        position="absolute"
        left={4}
        top={4}
      >
        {questionNumber} / {totalQuestions}
      </Text>
      <Text
        px={2}
        backgroundColor={'teal.100'}
        backgroundImage={useColorModeValue(
          '',
          'linear-gradient(45deg, #41295a, #2f0743)'
        )}
        maxWidth="max-content"
        rounded="full"
        position="absolute"
        right={4}
        top={4}
      >
        Score:&nbsp;{score}
      </Text>
      <Text
        maxWidth="500px"
        fontSize={['1.5rem', '2rem']}
        mt={10}
        pb={4}
        mx="auto"
        dangerouslySetInnerHTML={{ __html: question }}
      ></Text>
      <Grid
        templateColumns={['1fr', '1fr 1fr']}
        gap={6}
        width={'400px'}
        mx={'auto'}
        mt={10}
        minWidth={['unset', 'max-content']}
        maxWidth={['100%', 'unset']}
      >
        {answers.map((answer) => (
          <Box justifySelf="center" key={answer}>
            <Button
              maxWidth="250px"
              disabled={!!userAnswer}
              border={!!userAnswer ? '1px solid' : ''}
              opacity={
                !!userAnswer && userAnswer.correctAnswer === answer
                  ? '0.8 !important'
                  : !!userAnswer && userAnswer.correctAnswer !== answer
                  ? '0.4'
                  : ''
              }
              color={
                !!userAnswer && userAnswer.correctAnswer === answer
                  ? '#000000'
                  : !!userAnswer && userAnswer.correctAnswer !== answer
                  ? 'gray.800'
                  : ''
              }
              borderColor={
                !!userAnswer && userAnswer.correctAnswer === answer
                  ? 'teal.800'
                  : !!userAnswer && userAnswer.correctAnswer !== answer
                  ? 'red.800'
                  : ''
              }
              backgroundColor={
                !!userAnswer && userAnswer.correctAnswer === answer
                  ? 'teal.200'
                  : !!userAnswer && userAnswer.correctAnswer !== answer
                  ? 'red.200'
                  : ''
              }
              _active={{
                backgroundColor:
                  !!userAnswer && userAnswer.correctAnswer === answer
                    ? 'teal.200'
                    : !!userAnswer && userAnswer.correctAnswer !== answer
                    ? 'red.200'
                    : '',
              }}
              value={answer}
              pointerEvents={!!userAnswer ? 'none' : 'all'}
              onClick={callback}
              whiteSpace="normal"
              height="fit-content"
            >
              <Text
                as="span"
                overflowWrap="break-word"
                wordBreak="break-word"
                padding={2}
                css={{
                  hyphens: 'auto',
                }}
                width="100%"
                dangerouslySetInnerHTML={{ __html: answer }}
              ></Text>
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default QuestionCard
