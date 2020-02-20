import { gql } from 'apollo-boost'

export const ME = gql`
  query Me {
    me {
      id
      username
      email
      color
      wishes {
        id
        title
        description
        price
        currency
        priority
        link
        imageUrl
        createdAt
      }
      incomingFriendshipRequests {
        id
      }
    }
  }
`

export const GET_FRIENDS = gql`
  query Friends {
    me {
      id
      friends {
        id
        username
        color
        wishes {
          id
        }
      }
      incomingFriendshipRequests {
        id
        username
        color
        wishes {
          id
        }
      }
      outgoingFriendshipRequests {
        id
        username
        color
        wishes {
          id
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query Users($subString: String!) {
    users(subString: $subString) {
      id
      username
      color
      wishes {
        id
      }
    }
  }
`

export const GET_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      color
      wishes {
        id
        title
        description
        price
        currency
        priority
        link
        imageUrl
        createdAt
        giver {
          id
          username
        }
      }
    }
    friendshipStatus(username: $username) {
      id
      status
      requester {
        id
      }
      responder {
        id
      }
    }
  }
`
