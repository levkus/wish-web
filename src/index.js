import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Normalize } from 'styled-normalize'

import { ThemeProvider } from '@material-ui/core/styles'

import PrivateRoute from 'components/PrivateRoute'
import { ProfileProvider } from 'context/profile'

import Index from 'routes/index'
import Login from 'routes/login'
import SignUp from 'routes/sign-up'
import MyWishlist from 'routes/my-wishlist'
import CreateWish from 'routes/create-wish'
import User from 'routes/user'
import UserList from 'routes/user-list'

import Header from 'components/Header'

import theme from './theme'

const storage = window.localStorage
const token = storage.getItem('token')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }),
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
                <PrivateRoute path="/my-wishlist">
                  <MyWishlist />
                </PrivateRoute>
                <PrivateRoute path="/create-wish">
                  <CreateWish />
                </PrivateRoute>
                <PrivateRoute path="/user-list">
                  <UserList />
                </PrivateRoute>
                <PrivateRoute path="/users/:username">
                  <User />
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
