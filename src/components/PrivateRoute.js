import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

const PrivateRoute = props => {
  const context = useContext(ProfileContext)

  if (context.loading) {
    return null
  }

  if (!context.username) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default PrivateRoute
