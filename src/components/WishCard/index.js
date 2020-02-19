import React, { useContext } from 'react'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'

import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import SentimentVerySatisfiedOutlined from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import PublicOutlined from '@material-ui/icons/PublicOutlined'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
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
            disabled={loading}
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
      Я подарю
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
        subheader={`~${wish.price} ₽`}
        action={showMenu && <WishMenu wish={wish} />}
      />

      <CardMedia
        className={classes.media}
        image={wish.imageUrl || placeholder}
      />
      <Divider />
      <Box>
        <ButtonGroup size="small" variant="text" fullWidth>
          {wish.link && (
            <Button
              startIcon={<PublicOutlined size="small" />}
              component="a"
              href={wish.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ссылка
            </Button>
          )}

          <Button
            startIcon={<SearchOutlined />}
            component="a"
            href={`http://www.google.com/search?q=${wish.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Найти
          </Button>

          <Button
            startIcon={<ShoppingCartOutlined />}
            component="a"
            href={`https://market.yandex.ru/search?text=${wish.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Маркет
          </Button>
        </ButtonGroup>
      </Box>
      <Divider />
      <CardContent>
        <Typography
          noWrap
          title={wish.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {wish.description || 'Нет описания :('}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions disableSpacing>
          <Grid container>
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
