import { chakra, Box, useColorModeValue, Button, Stack, Image, Text, Icon } from '@chakra-ui/react'

function LandingHero() {
  return (
    <Box px={8} py={24} mx="auto">
      <Box w={{ base: '100%', md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign={{ base: 'left', md: 'center' }}>
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          The open-source learning platform for{' '}
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="100%"
            bgClip="text"
            bgGradient="linear(to-r, spark.400,deep.500)"
            fontWeight="extrabold"
          >
            next level
          </Text>{' '}
          JAMStack development.
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          Get the skills and confidence to write seriously performant web apps using the best of what's around. Learn
          accelerated modern web development with high-quality course content, all delivered in bite-sized, accesible
          video lectures. Oh, and it's <Text as="b">completely free.</Text>
        </chakra.p>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontWeight="bold"
          fontSize={{ base: 'xl', md: '2xl' }}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          Sign up today and learn something new.
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          <Button
            as="a"
            variant="solid"
            colorScheme="brand"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: '100%', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            href="#"
            size="lg"
          >
            Get Started
            <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
          <Button
            as="a"
            colorScheme="gray"
            display="inline-flex"
            alignItems="center"
            color="brand.500"
            justifyContent="center"
            w={{ base: '100%', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            href="#"
            size="lg"
          >
            Learn More
            <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
        </Stack>
      </Box>
      <Box w={{ base: '100%', md: 10 / 12 }} mx="auto" mt={20} textAlign="center">
        <Image
          w="100%"
          borderRadius="lg"
          boxShadow="2xl"
          src="/static/images/tunderadev-vscode-screenshot.png"
          alt="Tundera.dev vscode screenshot"
        />
      </Box>
    </Box>
  )
}

export default LandingHero
