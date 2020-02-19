import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Loader from 'components/Loader'
import WishCard from 'components/WishCard'

import { ME } from 'graphql/queries'

const useStyles = makeStyles({
  cardAdd: {
    minHeight: 100,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const MyWishlist = () => {
  const { data, loading } = useQuery(ME)
  const classes = useStyles()

  const hasWishes = data?.me.wishes.length > 0

  return (
    <Loader isLoading={loading}>
      {hasWishes ? (
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Мой вишлист
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Link to="/create-wish">
                <Card className={classes.cardAdd}>
                  <AddCircleOutlineOutlined fontSize="large" />
                </Card>
              </Link>
            </Grid>
            {data?.me.wishes.map(wish => {
              return (
                <Grid item key={wish.id} xs={12} sm={6} md={4}>
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
              <Typography variant="h2">
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
          </Grid>
        </Container>
      )}
    </Loader>
  )
}

export default MyWishlist
