import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import gif from './assets/gif.gif'

const UnderConstruction = () => {
  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img src={gif} alt="cat-gif" />
        </Grid>
        <Grid item>
          <Typography variant="body1" component="h1" align="center">
            {'Наши лучшие специалисты работают над\u00a0этим'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UnderConstruction
