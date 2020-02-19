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
    $price: String
    $priority: Int
    $link: String
    $currency: String
  ) {
    createWish(
      title: $title
      description: $description
      imageUrl: $imageUrl
      price: $price
      priority: $priority
      link: $link
      currency: $currency
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

export const TAKE_WISH = gql`
  mutation TakeWish($id: Int!) {
    takeWish(id: $id) {
      id
      title
      giver {
        id
        username
      }
    }
  }
`

export const ABANDON_WISH = gql`
  mutation AbandonWish($id: Int!) {
    abandonWish(id: $id) {
      id
      title
    }
  }
`

export const REQUEST_FRIENDSHIP = gql`
  mutation RequestFriendship($ResponderId: Int!) {
    requestFriendship(ResponderId: $ResponderId) {
      status
    }
  }
`

export const DELETE_FRIENDSHIP_REQUEST = gql`
  mutation DeleteFriendshipRequest($id: Int!) {
    deleteFriendshipRequest(id: $id)
  }
`

export const ACCEPT_FRIENDSHIP_REQUEST = gql`
  mutation AcceptFriendshipRequest($id: Int!) {
    acceptFriendshipRequest(id: $id) {
      id
    }
  }
`
