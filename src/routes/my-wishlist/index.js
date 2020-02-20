import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Loader from 'components/Loader'
import WishCard from 'components/WishCard'

import { ME } from 'graphql/queries'

const MyWishlist = () => {
  const { data, loading } = useQuery(ME)
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const hasWishes = data?.me.wishes.length > 0

  return (
    <Loader isLoading={loading}>
      {hasWishes ? (
        <Container maxWidth="md">
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="h2" component="h1" gutterBottom>
                Мой вишлист
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/create-wish"
                variant="contained"
                color="primary"
              >
                Создать хотелку
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {data?.me.wishes.map(wish => {
              return (
                <Grid item key={wish.id} xs={12}>
                  <WishCard wish={wish} user={data?.me} showMenu />
                </Grid>
              )
            })}
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <Grid spacing={4} direction="column" alignItems="center" container>
            <Grid item>
              <Typography variant={isSmall ? 'h4' : 'h2'} align="center">
                Привет,{' '}
                <span style={{ color: data.me.color }}>{data.me.username}</span>
                !
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center">
                Люди могут подумать, что ты ничего не хочешь. Мы не можем этого
                допустить! Давай скорее это исправим!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/create-wish"
                variant="contained"
                color="primary"
              >
                Создать хотелку
              </Button>
            </Grid>
            <Grid item>
              <Typography align="center">
                Но вероятно ты тут чтобы выбрать подарок для{' '}
                <Link to="/users/noch212">@noch212</Link> :)
              </Typography>
              <Typography align="center">
                Скорее добавь ее в друзья <Link to="/users/noch212">тут</Link>!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </Loader>
  )
}

export default MyWishlist
