import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Avatar,
  Menu,
  Grid,
  MenuItem,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
  },
  menuButton: {
    cursor: 'pointer',
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  offset: theme.mixins.toolbar,
  appBar: {
    boxShadow: 'none',
  },
}))

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const profile = useContext(ProfileContext)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Grid
        container
        alignItems="center"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.menuButton}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            {profile.username.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>{profile.username}</Typography>
        </Grid>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/my-wishlist" component={RouterLink}>
            Мой вишлист
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.localStorage.removeItem('token')
            window.location.reload()
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </div>
  )
}

export default function Header() {
  const profile = useContext(ProfileContext)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Вишлист
          </Typography>
          {!profile.error && !profile.loading && <ProfileMenu />}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  )
}
