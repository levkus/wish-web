import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <Container>
        <Grid justify="center" alignItems="center" container>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    )
  }

  return children
}

export default Loader
