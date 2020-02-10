import { gql } from 'apollo-boost'

export const ME = gql`
  query Me {
    me {
      id
      username
      email
      wishes {
        id
        title
        description
        imageUrl
        createdAt
      }
    }
  }
`

export const GET_USERS = gql`
  query Users {
    users {
      id
      username
    }
  }
`

export const GET_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      wishes {
        id
        title
        description
        imageUrl
        createdAt
      }
    }
  }
`
