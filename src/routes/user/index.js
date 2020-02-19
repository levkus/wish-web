import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Loader from 'components/Loader'
import WishCard from 'components/WishCard'

import { ProfileContext } from 'context/profile'

import { GET_USER } from 'graphql/queries'
import {
  REQUEST_FRIENDSHIP,
  DELETE_FRIENDSHIP_REQUEST,
  ACCEPT_FRIENDSHIP_REQUEST,
} from 'graphql/mutations'

const User = () => {
  const profile = useContext(ProfileContext)
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
  const [acceptFriendshipRequest, { loading: acceptLoading }] = useMutation(
    ACCEPT_FRIENDSHIP_REQUEST,
  )

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
        if (friendship.requester.id === profile.id) {
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
        }
        return (
          <Button
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
      <Container maxWidth="md">
        <Grid container direction="row" spacing={8}>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h2" component="h1">
                  {data?.user.username}
                </Typography>
              </Grid>
              <Grid item>{renderFriendshipBlock(data?.friendshipStatus)}</Grid>
            </Grid>
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
              <Typography>
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
