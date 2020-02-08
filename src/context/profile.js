import React, { useState, createContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const ProfileContext = createContext()

export const ME = gql`
  query Me {
    me {
      username
      email
      id
    }
  }
`

export const ProfileProvider = ({ children }) => {
  const [tokenFailed, setTokenFailed] = useState(false)
  const { data, loading, error } = useQuery(ME, {
    onError: ({ networkError, graphQLErrors }) => {
      if (graphQLErrors[0].message === 'Unauthorized') {
        setTokenFailed(true)
      }
    },
  })

  const token = window.localStorage.getItem('token')

  const value = data ? data.me : {}
  if (token && tokenFailed) {
    window.localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <ProfileContext.Provider value={{ ...value, loading, error }}>
      {children}
    </ProfileContext.Provider>
  )
}
