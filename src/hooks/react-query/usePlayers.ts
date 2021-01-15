import type { Player } from 'types/nexus'

import { useQuery, UseQueryOptions } from 'react-query'
import { request } from 'graphql-request'

import PlayersQuery from '@graphql/nexus/queries/Players'

const endpoint = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`

export async function getAllPlayers(): Promise<Player[]> {
  const { allPlayers: data } = await request(endpoint, PlayersQuery)

  return data
}

export function usePlayers(options?: UseQueryOptions<Player[], Error>) {
  const queryOptions = { ...options }

  return useQuery<Player[], Error>('players', getAllPlayers, queryOptions)
}