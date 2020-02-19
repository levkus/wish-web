import React, { useContext } from 'react'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import SentimentVerySatisfiedOutlined from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { ProfileContext } from 'context/profile'
import { DELETE_WISH, TAKE_WISH, ABANDON_WISH } from 'graphql/mutations'
import { ME, GET_USER } from 'graphql/queries'

import placeholder from './assets/placeholder.png'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
})

const WishMenu = ({ wish }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [deleteWish, { loading }] = useMutation(DELETE_WISH)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="wishMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Button
            disbaled={loading}
            onClick={() => {
              deleteWish({
                variables: {
                  id: wish.id,
                },
                refetchQueries: [
                  {
                    query: ME,
                  },
                ],
              })
            }}
            color="secondary"
          >
            {loading ? 'Удаляем...' : 'Удалить'}
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}

const WishActions = ({ wish, user, me }) => {
  const [takeWish] = useMutation(TAKE_WISH)
  const [abandonWish] = useMutation(ABANDON_WISH)
  if (wish.giver?.id === me.id) {
    return (
      <>
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
      </>
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
      Подарить
    </Button>
  )
}

const WishCard = ({ user, wish, showMenu, showActions }) => {
  const profile = useContext(ProfileContext)
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="user" style={{ backgroundColor: user.color }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={wish.title}
        subheader={moment(Number(wish.createdAt)).format('DD.MM.YY')}
        action={showMenu && <WishMenu wish={wish} />}
      />
      <CardMedia
        className={classes.media}
        image={wish.imageUrl || placeholder}
      />
      {showActions && (
        <CardActions>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <WishActions wish={wish} user={user} me={profile} />
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  )
}

export default WishCard
