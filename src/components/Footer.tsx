import { Grid, Flex, Box, Text, useColorModeValue, Link } from '@chakra-ui/core'
import React from 'react'
import { VscGithub } from 'react-icons/vsc'
import { RiLinkedinFill } from 'react-icons/ri'

interface Props {}

export const Footer = (props: Props) => {
  return (
    <Flex
      as="footer"
      gridArea=" 2 / 1 / 2 / 4"
      height={'max-content'}
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      backgroundColor={useColorModeValue('gray.50', 'gray.700')}
      textAlign="center"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between" width="200px" maxW="100%" py={6}>
        <Link
          display="flex"
          justifyContent="center"
          alignItems="center"
          href="https://github.com/RazvanRauta"
          target="_blank"
          boxShadow="none !important"
        >
          <Box as={VscGithub} size={'40px'} />
        </Link>
        <Link
          display="flex"
          justifyContent="center"
          alignItems="center"
          href="https://www.linkedin.com/in/razvan-rauta"
          target="_blank"
          boxShadow="none !important"
        >
          <Box as={RiLinkedinFill} size={'40px'} />
        </Link>
      </Flex>
      <Link
        display="flex"
        justifyContent="center"
        alignItems="center"
        href="https://rrazvan.dev"
        target="_blank"
        boxShadow="none !important"
        textDecoration="none !important"
      >
        <Text fontSize={'1.5rem'}>@RRazvan</Text>
      </Link>
    </Flex>
  )
}
