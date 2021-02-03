import gql from 'graphql-tag'

export default gql`
  query AllTeams {
    allTeams {
      id
      name
      slug
      city
      logo
      colorScheme {
        primary
        secondary
      }
    }
  }
`