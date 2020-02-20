import React, { useState, createContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ME } from 'graphql/queries'

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [tokenFailed, setTokenFailed] = useState(false)
  const { data, loading, error } = useQuery(ME, {
    onError: ({ networkError, graphQLErrors }) => {
      if (graphQLErrors[0].message === 'Unauthorized') {
        setTokenFailed(true)
      }
    },
    pollInterval: 10000,
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
