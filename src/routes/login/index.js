import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Redirect } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import LockOutlined from '@material-ui/icons/LockOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'

const storage = window.localStorage

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

const Login = () => {
  const profile = useContext(ProfileContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      storage.setItem('token', data.login)
      window.location.reload()
    },
  })

  if (error) {
    return (
      <div>
        Неплохая попытка, но нет
        <span role="img" aria-label="wink">
          😜
        </span>
      </div>
    )
  }

  if (profile.username) {
    return <Redirect to="/profile" />
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        login({
          variables: { username, password },
        })
      }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <FormControl>
            <Input
              id="username"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircleOutlined />
                </InputAdornment>
              }
              value={username}
              placeholder="Никнейм"
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              }
              id="password"
              value={password}
              placeholder="Пароль"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? 'Входим...' : 'Войти'}
                </Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Button component={RouterLink} to="/sign-up">
                  Создать аккаунт
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default Login
