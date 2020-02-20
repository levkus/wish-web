import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import SentimentVerySatisfiedOutlined from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import Button from '@material-ui/core/Button'

import { TAKE_WISH, ABANDON_WISH } from 'graphql/mutations'
import { GET_USER } from 'graphql/queries'

const WishActions = ({ wish, user, me }) => {
  const [takeWish] = useMutation(TAKE_WISH)
  const [abandonWish] = useMutation(ABANDON_WISH)
  if (wish.giver?.id === me.id) {
    return (
      <Button
        color="secondary"
        startIcon={<SentimentVeryDissatisfied />}
        onClick={() => {
          abandonWish({
            variables: {
              id: wish.id,
            },
            refetchQueries: [
              {
                query: GET_USER,
                variables: {
                  username: user.username,
                },
              },
            ],
          })
        }}
      >
        Не дарить
      </Button>
    )
  }
  if (wish.giver && wish.giver.id !== me.id) {
    return <Button disabled>{`Это подарит ${wish.giver?.username}`}</Button>
  }
  return (
    <Button
      color="primary"
      startIcon={<SentimentVerySatisfiedOutlined />}
      onClick={() => {
        takeWish({
          variables: {
            id: wish.id,
          },
          refetchQueries: [
            {
              query: GET_USER,
              variables: {
                username: user.username,
              },
            },
          ],
        })
      }}
    >
      Я подарю
    </Button>
  )
}

export default WishActions
