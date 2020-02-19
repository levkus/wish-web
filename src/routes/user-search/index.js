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

import UserCard from 'components/UserCard'

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
      <Grid direction="column" spacing={4} container>
        <Grid item>
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
              placeholder="Начни писать никнейм"
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
        </Grid>
        <Grid item>
          <Grid direction="column" container spacing={2}>
            {data?.users.map(user => (
              <Grid key={user.id} item>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserSearch
