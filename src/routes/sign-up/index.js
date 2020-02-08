import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Redirect } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import LockOutlined from '@material-ui/icons/LockOutlined'
import MailOutlined from '@material-ui/icons/MailOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'

const storage = window.localStorage

const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, password: $password, email: $email)
  }
`

const SignUp = () => {
  const profile = useContext(ProfileContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: data => {
      storage.setItem('token', data.signUp)
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
        signUp({
          variables: { username, password, email },
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
              id="email"
              startAdornment={
                <InputAdornment position="start">
                  <MailOutlined />
                </InputAdornment>
              }
              value={email}
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
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
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
            >
              {loading ? 'Создаем...' : 'Создать аккаунт'}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUp
