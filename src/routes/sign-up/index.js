import React, { useState, useContext, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import LockOutlined from '@material-ui/icons/LockOutlined'
import MailOutlined from '@material-ui/icons/MailOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { SIGN_UP } from 'graphql/mutations'

const storage = window.localStorage

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

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

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
    return <Redirect to="/my-wishlist" />
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" component="h1" gutterBottom>
        Привет! Давай создадим аккаунт?
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault()
          signUp({
            variables: { username, password, email },
          })
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth>
              <Input
                inputRef={inputRef}
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
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
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Button component={RouterLink} to="/login">
                    У меня есть аккаунт
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default SignUp
