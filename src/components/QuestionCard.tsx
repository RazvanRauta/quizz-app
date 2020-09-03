import React, { MouseEvent } from 'react'
import { Box, Text, Button, Grid } from '@chakra-ui/core'
import { AnswerObject } from '../App'

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
    <Box backgroundColor="gray.50" rounded="10px" p={10} position="relative">
      <Text
        px={2}
        backgroundColor={'teal.100'}
        maxWidth="max-content"
        rounded="full"
        position="absolute"
        left={4}
        top={4}
      >
        {questionNumber} / {totalQuestions}
      </Text>
      <Text
        px={2}
        backgroundColor={'teal.100'}
        maxWidth="max-content"
        rounded="full"
        position="absolute"
        right={4}
        top={4}
      >
        Score:{score}
      </Text>
      <Text
        maxWidth="350px"
        mt={10}
        pb={4}
        mx="auto"
        dangerouslySetInnerHTML={{ __html: question }}
      ></Text>
      <Grid
        templateColumns={'1fr 1fr'}
        gap={6}
        width={'400px'}
        mx={'auto'}
        mt={10}
        minWidth={'max-content'}
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
              value={answer}
              pointerEvents={!!userAnswer ? 'none' : 'all'}
              onClick={callback}
            >
              <Text
                as="span"
                overflowWrap="break-word"
                wordBreak="break-word"
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
