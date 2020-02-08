import React from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: '100%',
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

const WISHES = gql`
  query Me {
    me {
      id
      username
      wishes {
        id
        title
        description
        createdAt
      }
    }
  }
`

const Profile = () => {
  const { data, loading } = useQuery(WISHES)
  const classes = useStyles()

  if (loading || !data) {
    return <div>Loading...</div>
  }

  const { me } = data

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">
              <Grid item>+</Grid>
            </Grid>
          </Card>
        </Grid>
        {me.wishes.reverse().map(wish => {
          return (
            <Grid item key={wish.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {me.username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={wish.title}
                  subheader={moment(Number(wish.createdAt)).format('DD.MM.YY')}
                />
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/200/300"
                />
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Profile
