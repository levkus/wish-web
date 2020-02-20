import React, { useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { ProfileContext } from 'context/profile'

import placeholder from './assets/placeholder.png'
import WishMenu from './WishMenu'
import WishActions from './WishActions'

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
  link: {
    maxWidth: '300px',
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
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

const WishCard = ({ user, wish, showMenu, showActions }) => {
  const profile = useContext(ProfileContext)
  const classes = useStyles()
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

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
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="h6">{wish.title}</Typography>
                </Grid>
                {showMenu && (
                  <Grid item>
                    <WishMenu wish={wish} />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item className={classes.marginBottom}>
              <Grid container alignItems="center">
                <Grid item className={classes.grow}>
                  <Typography>{`~${wish.price} ₽`}</Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={getChiplabel(wish.priority)}
                    color={(() => {
                      if (wish.priority === 1) {
                        return undefined
                      }
                      if (wish.priority === 2) {
                        return 'primary'
                      }
                      if (wish.priority === 3) {
                        return 'secondary'
                      }
                    })()}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.marginBottom}>
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
                <Typography variant="body2" noWrap className={classes.link}>
                  Ссылка: <Link href={wish.link}>{wish.link}</Link>
                </Typography>
              )}
            </Grid>
            <Grid item className={classes.marginTop}>
              <Grid
                container
                justify={showActions ? 'space-between' : 'flex-start'}
              >
                {showActions && !isSmall && (
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
            <Grid item>
              {isSmall && <WishActions wish={wish} user={user} me={profile} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default WishCard
