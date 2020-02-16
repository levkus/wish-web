import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Loader from 'components/Loader'

import { ME } from 'graphql/queries'
import { DELETE_WISH } from 'graphql/mutations'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: '100%',
  },
  cardAdd: {
    minHeight: 100,
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

const WishMenu = ({ wish }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [deleteWish] = useMutation(DELETE_WISH)

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
            Удалить
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}

const MyWishlist = () => {
  const { data, loading } = useQuery(ME)
  const classes = useStyles()

  const reverseWishes = data ? [...data.me.wishes].reverse() : []

  return (
    <Loader isLoading={loading}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Мой вишлист
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/create-wish">
              <Card className={classes.cardAdd}>
                <AddCircleOutlineOutlined fontSize="large" />
              </Card>
            </Link>
          </Grid>
          {reverseWishes.map(wish => {
            return (
              <Grid item key={wish.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="avatar">
                        {data?.me.username.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={wish.title}
                    subheader={moment(Number(wish.createdAt)).format(
                      'DD.MM.YY',
                    )}
                    action={<WishMenu wish={wish} />}
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

export default MyWishlist
