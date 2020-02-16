import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link as RouterLink } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

import Loader from 'components/Loader'

import { GET_FRIENDS } from 'graphql/queries'

const Friends = () => {
  const { data, loading } = useQuery(GET_FRIENDS, {
    variables: {
      status: 'accepted',
    },
  })

  console.log(data)

  return (
    <Loader isLoading={loading}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {data?.me.friends.map(user => {
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
    </Loader>
  )
}

export default Friends
