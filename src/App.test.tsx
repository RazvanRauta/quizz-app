/**
 *
 * @author Razvan Rauta
 *
 * Friday, September 4, 2020
 *
 */

import React from 'react'
import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'

const questions = Array.from({ length: 10 }).fill({
  answers: ['Angelo', 'Fernando', 'Figaro', 'Dave'],
  category: 'Entertainment: Music',
  correct_answer: 'Figaro',
  difficulty: 'easy',
  incorrect_answers: ['Angelo', 'Fernando', 'Dave'],
  question:
    'In the  Rossini opera, what was the name of &#039;The Barber of Seville&#039;?',
  type: 'multiple',
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: questions }),
  })
)

beforeEach(() => {
  fetch.mockClear()
})

test('Testing flow ', async () => {
  render(<App />)
  const startButton = screen.getByRole('button', { name: /start game/i })

  expect(startButton).toBeInTheDocument()

  fireEvent.click(startButton)

  expect(screen.getByRole('spinner')).toBeInTheDocument()

  await waitForElementToBeRemoved(() => screen.getByRole('spinner'))

  await waitFor(() =>
    expect(screen.getByRole('QuestionCard')).toBeInTheDocument()
  )

  await waitFor(() =>
    expect(screen.getByRole('button', { name: /Angelo/i })).toBeInTheDocument()
  )

  expect(screen.queryByText(/Rossini/i)).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /Angelo/i }))

  expect(screen.getByRole('button', { name: /Angelo/i })).toBeDisabled()

  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: /Next Question/i })
    ).toBeInTheDocument()
  )

  fireEvent.click(screen.getByRole('button', { name: /Next Question/i }))

  expect(
    screen.queryByRole('button', { name: /Next Question/i })
  ).not.toBeInTheDocument()

  expect(fetch).toHaveBeenCalledTimes(1)
})
