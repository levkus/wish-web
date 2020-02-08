import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Normalize } from 'styled-normalize'

import { ThemeProvider } from '@material-ui/core/styles'

import PrivateRoute from 'components/PrivateRoute'
import { ProfileProvider } from 'context/profile'

import Index from 'routes/index'
import Login from 'routes/login'
import SignUp from 'routes/sign-up'
import Profile from 'routes/profile'

import Header from 'components/Header'

import theme from './theme'

const storage = window.localStorage
const token = storage.getItem('token')

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Normalize />
      <Router>
        <ThemeProvider theme={theme}>
          <ProfileProvider>
            <Header />
            <div>
              <Switch>
                <Route exact path="/">
                  <Index />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
              </Switch>
            </div>
          </ProfileProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
