import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, password: $password, email: $email)
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const CREATE_WISH = gql`
  mutation CreateWish(
    $title: String!
    $description: String!
    $imageUrl: String
    $UserId: Int!
  ) {
    createWish(
      title: $title
      description: $description
      imageUrl: $imageUrl
      UserId: $UserId
    ) {
      id
    }
  }
`

export const DELETE_WISH = gql`
  mutation DeleteWish($id: Int!) {
    deleteWish(id: $id)
  }
`
