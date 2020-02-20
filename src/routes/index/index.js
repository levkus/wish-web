import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { ProfileContext } from 'context/profile'

const Index = () => {
  const profile = useContext(ProfileContext)

  if (profile.username) {
    return <Redirect to="/my-wishlist" />
  }
  if (profile.loading) {
    return (
      <Container maxWidth="sm">
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    )
  }
  return <Redirect to="/login" />
}

export default Index
