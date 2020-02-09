import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const USERS = gql`
  query Users {
    users {
      id
      username
    }
  }
`

const UserList = () => {
  const { data, loading, error } = useQuery(USERS)

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {data.users.map(user => {
        return <div key={user.id}>{user.username}</div>
      })}
    </div>
  )
}

export default UserList
