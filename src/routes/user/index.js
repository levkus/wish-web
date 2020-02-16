import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Loader from 'components/Loader'

import { GET_USER } from 'graphql/queries'
import {
  REQUEST_FRIENDSHIP,
  DELETE_FRIENDSHIP_REQUEST,
} from 'graphql/mutations'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: '100%',
  },
  cardAdd: {
    minWidth: 275,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const User = () => {
  const { username } = useParams()
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username,
    },
  })
  const [requestFriendship, { loading: requestLoading }] = useMutation(
    REQUEST_FRIENDSHIP,
  )
  const [deleteFriendshipRequest, { loading: deleteLoading }] = useMutation(
    DELETE_FRIENDSHIP_REQUEST,
  )
  const classes = useStyles()

  const reverseWishes = data ? [...data.user.wishes].reverse() : []

  const renderFriendshipBlock = friendship => {
    switch (friendship?.status) {
      case 'accepted':
        return (
          <Button
            variant="contained"
            color="secondary"
            disabled={deleteLoading}
            onClick={() => {
              deleteFriendshipRequest({
                variables: {
                  id: friendship.id,
                },
                refetchQueries: [
                  {
                    query: GET_USER,
                    variables: {
                      username,
                    },
                  },
                ],
              })
            }}
          >
            Удалить из друзей
          </Button>
        )
      case 'rejected':
        return <div>Не хочет дружить с тобой :(</div>
      case 'pending':
        return (
          <Button
            color="secondary"
            variant="contained"
            disabled={deleteLoading}
            onClick={() => {
              deleteFriendshipRequest({
                variables: {
                  id: friendship.id,
                },
                refetchQueries: [
                  {
                    query: GET_USER,
                    variables: {
                      username,
                    },
                  },
                ],
              })
            }}
          >
            Отменить запрос
          </Button>
        )
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            disabled={requestLoading}
            onClick={() => {
              requestFriendship({
                variables: {
                  ResponderId: data.user.id,
                },
                refetchQueries: [
                  {
                    query: GET_USER,
                    variables: {
                      username,
                    },
                  },
                ],
              })
            }}
          >
            Добавить в друзья
          </Button>
        )
    }
  }

  return (
    <Loader isLoading={loading}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          {data?.user.username}
        </Typography>
        {renderFriendshipBlock(data?.friendshipStatus)}
        <Grid container spacing={2}>
          {reverseWishes.map(wish => {
            return (
              <Grid item key={wish.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {data?.user.username.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={wish.title}
                    subheader={moment(Number(wish.createdAt)).format(
                      'DD.MM.YY',
                    )}
                  />
                  <CardMedia className={classes.media} image={wish.imageUrl} />
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Loader>
  )
}

export default User
