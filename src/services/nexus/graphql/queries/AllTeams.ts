import gql from 'graphql-tag'

export default gql`
  query AllTeams {
    allTeams {
      id
      name
      city
      primaryColor
      secondaryColor
      logo
    }
  }
`
