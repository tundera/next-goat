import type { Coach } from 'src/services/nexus/types'

import { request } from 'graphql-request'

import AllCoachesQuery from 'src/services/nexus/graphql/queries/AllCoaches'

const endpoint = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`

export async function getAllCoaches(): Promise<Coach[]> {
  const { allCoaches: data } = await request(endpoint, AllCoachesQuery)

  return data
}
