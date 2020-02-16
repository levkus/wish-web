import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link as RouterLink, Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'

import { GET_USERS } from 'graphql/queries'

const UserSearch = () => {
  const [term, setTerm] = useState('')
  const [navigateToUser, setnavigateToUser] = useState(false)
  const { data, loading, refetch } = useQuery(GET_USERS, {
    variables: {
      subString: term,
    },
  })

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    refetch()
  }, [term, refetch])

  if (navigateToUser) {
    return <Redirect to={`/users/${navigateToUser}`} />
  }

  return (
    <Container maxWidth="md">
      <FormControl fullWidth>
        <Input
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          endAdornment={
            loading && (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            )
          }
          inputRef={inputRef}
          placeholder="Начни писать имя пользователя"
          onChange={e => {
            setTerm(e.target.value)
          }}
          onKeyPress={e => {
            if (e.key === 'Enter' && data.users.length > 0) {
              setnavigateToUser(data.users[0].username)
            }
          }}
          value={term}
        />
      </FormControl>
      <Grid container spacing={2}>
        {data?.users.map(user => {
          return (
            <Grid key={user.id} item xs={12}>
              <Paper>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar aria-label="avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography
                      component={RouterLink}
                      to={`/users/${user.username}`}
                      key={user.id}
                    >
                      {user.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default UserSearch
