import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/core'
import { Logo } from '../Logo'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

interface Props {}

export const Header = (props: Props) => {
  return (
    <Box as="header" gridArea="header">
      <Box
        width="100%"
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        boxShadow={useColorModeValue(
          '0px 1px 5px #E2E8F0',
          '0px 1px 5px #2c5364'
        )}
        backgroundColor={useColorModeValue('gray.50', 'gray.700')}
        px={[5, 0]}
      >
        <Flex
          maxW={1200}
          justifyContent="space-between"
          width="100%"
          mx="auto"
          py={6}
        >
          <Logo h="2.5rem" />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>
    </Box>
  )
}
