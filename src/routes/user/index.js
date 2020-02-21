import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'

import Loader from 'components/Loader'
import WishCard from 'components/WishCard'

import { ProfileContext } from 'context/profile'

import { GET_USER, ME } from 'graphql/queries'
import {
  REQUEST_FRIENDSHIP,
  DELETE_FRIENDSHIP_REQUEST,
  ACCEPT_FRIENDSHIP_REQUEST,
} from 'graphql/mutations'

const useStyles = makeStyles(theme => ({
  userContainer: {
    padding: theme.spacing(4),
  },
  avatar: {
    width: '96px',
    height: '96px',
    marginBottom: theme.spacing(2),
    fontSize: '4rem',
  },
  pageContainer: {
    overflow: 'hidden',
  },
}))

const User = () => {
  const profile = useContext(ProfileContext)
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { username } = useParams()
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username,
    },
    pollInterval: 2000,
  })
  const [requestFriendship, { loading: requestLoading }] = useMutation(
    REQUEST_FRIENDSHIP,
  )
  const [deleteFriendshipRequest, { loading: deleteLoading }] = useMutation(
    DELETE_FRIENDSHIP_REQUEST,
  )
  const [acceptFriendshipRequest, { loading: acceptLoading }] = useMutation(
    ACCEPT_FRIENDSHIP_REQUEST,
  )

  const renderFriendshipBlock = friendship => {
    switch (friendship?.status) {
      case 'accepted':
        return (
          <Button
            size={isSmall ? 'small' : 'medium'}
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
        if (friendship.requester.id === profile.id) {
          return (
            <Button
              size={isSmall ? 'small' : 'medium'}
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
        }
        return (
          <Button
            size={isSmall ? 'small' : 'medium'}
            color="primary"
            variant="contained"
            disabled={acceptLoading}
            onClick={() => {
              acceptFriendshipRequest({
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
                  {
                    query: ME,
                  },
                ],
              })
            }}
          >
            Согласиться дружить
          </Button>
        )
      default:
        return (
          <Button
            size={isSmall ? 'small' : 'medium'}
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

  if (data?.user.id === profile.id) {
    return <Redirect to="/my-wishlist" />
  }

  return (
    <Loader isLoading={loading}>
      <Container maxWidth="md" className={classes.pageContainer}>
        <Grid container direction="column" spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.userContainer}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    style={{ backgroundColor: data?.user.color }}
                  >
                    {data?.user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant={isSmall ? 'h4' : 'h3'}
                    component="h1"
                  >
                    {data?.user.username}
                  </Typography>
                </Grid>
                <Grid item>
                  {renderFriendshipBlock(data?.friendshipStatus)}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {data?.user.wishes.length > 0 ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Вишлист
                </Typography>
                <Grid container spacing={2}>
                  {data?.user.wishes.map(wish => {
                    return (
                      <Grid item key={wish.id} xs={12}>
                        <WishCard wish={wish} user={data?.user} showActions />
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            ) : (
              <Typography align="center">
                {`Кажется ${data?.user.username} ничего не хочет...`}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Loader>
  )
}

export default User
