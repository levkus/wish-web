import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link, useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import RedeemOutlined from '@material-ui/icons/RedeemOutlined'
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const USER = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      wishes {
        id
        title
        description
        imageUrl
        createdAt
      }
    }
  }
`

const User = () => {
  const { username } = useParams()
  const { data, loading } = useQuery(USER, {
    variables: {
      username,
    },
  })
  const classes = useStyles()

  if (loading || !data) {
    return <div>Loading...</div>
  }

  const { user } = data

  console.log(user.wishes)

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        {`Вишлист ${user.username}`}
      </Typography>
      <Grid container spacing={2}>
        {user.wishes.map(wish => {
          return (
            <Grid item key={wish.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={wish.title}
                  subheader={moment(Number(wish.createdAt)).format('DD.MM.YY')}
                />
                <CardMedia className={classes.media} image={wish.imageUrl} />
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default User
