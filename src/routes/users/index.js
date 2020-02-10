import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link as RouterLink } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

import { GET_USERS } from 'graphql/queries'

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS)

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <Container maxWisdth="md">
      <Grid container spacing={2}>
        {data.users.map(user => {
          return (
            <Grid item xs={12}>
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

export default Users
