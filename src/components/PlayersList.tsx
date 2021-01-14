import { FC } from 'react'

import { Box, Heading } from '@chakra-ui/react'

import { usePlayers } from '@hooks/queries/usePlayers'
import Suspense from '@suspense/ReactQuerySuspense'
import LoadingSpinner from '@components/LoadingSpinner'

type Props = {
  title: string
}

// TODO: Convert this use SuspenseList once stable
const PlayersList: FC<Props> = ({ title }) => {
  const { data: players } = usePlayers()

  return (
    <Box bg="purple.100" p={2} borderRadius={8} alignItems="center" justifyContent="center">
      <Heading p={2} my={1}>
        {title}
      </Heading>
      {players?.map((player) => (
        <Suspense fallback={<LoadingSpinner />}>
          <Box p={5} bg="gray.200" shadow="md" borderRadius={4} height="80px">
            <Heading fontSize="lg" textAlign="center">
              {player.name}
            </Heading>
          </Box>
        </Suspense>
      ))}
    </Box>
  )
}

export default PlayersList
