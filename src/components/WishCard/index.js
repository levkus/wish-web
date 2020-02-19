import React, { useContext } from 'react'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'

import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
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

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '100%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56.25%',
    },
  },
  content: {
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  marginTop: {
    marginTop: 'auto',
  },
}))

const getChiplabel = priority => {
  switch (priority) {
    case 1:
      return 'Хочу!'
    case 2:
      return 'Очень хочу!'
    case 3:
      return 'Сплю и вижу!'
    default:
      return null
  }
}

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

const WishCard = ({ user, wish, showMenu, showActions }) => {
  const profile = useContext(ProfileContext)
  const classes = useStyles()

  return (
    <Paper className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <Box
            style={{
              backgroundImage: `url('${wish.imageUrl || placeholder}')`,
            }}
            className={classes.image}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={9} className={classes.content}>
          <Grid
            direction="column"
            justify="space-between"
            container
            className={classes.grow}
            style={{ height: '100%' }}
          >
            <Grid item>
              <Grid container alignItems="center">
                <Grid item className={classes.grow}>
                  <Typography variant="h6">{wish.title}</Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={getChiplabel(wish.priority)}
                    color="secondary"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography gutterBottom>{`~${wish.price} ₽`}</Typography>
              {wish.description && (
                <Typography
                  gutterBottom
                  title={wish.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {wish.description}
                </Typography>
              )}
              {wish.link && (
                <Typography gutterBottom>
                  <Link href={wish.link}>{wish.link}</Link>
                </Typography>
              )}
            </Grid>
            <Grid item className={classes.marginTop}>
              <Grid
                container
                justify={showActions ? 'space-between' : 'flex-start'}
              >
                {showActions && (
                  <Grid item className={classes.grow}>
                    <WishActions wish={wish} user={user} me={profile} />
                  </Grid>
                )}
                <Grid item>
                  <Button
                    startIcon={<SearchOutlined />}
                    component="a"
                    href={`http://www.google.com/search?q=${wish.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Найти в Google
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    startIcon={<ShoppingCartOutlined />}
                    component="a"
                    href={`https://market.yandex.ru/search?text=${wish.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Найти в Яндекс.Маркете
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default WishCard
