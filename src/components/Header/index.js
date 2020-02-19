import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  Grid,
  MenuItem,
  Button,
} from '@material-ui/core'

import logo from './assets/logo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  links: {
    flexGrow: 1,
  },
  menuButton: {
    cursor: 'pointer',
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  offset: theme.mixins.toolbar,
  appBar: {
    boxShadow: 'none',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  logo: {
    marginRight: theme.spacing(1),
    width: '128px',
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
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: profile.color }}
          >
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
        <MenuItem component={RouterLink} to="/my-profile">
          Профиль
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
          <img src={logo} className={classes.logo} alt="logo" />
          <Grid container alignItems="center">
            {!profile.error && !profile.loading && (
              <>
                <Grid item className={classes.links}>
                  <Grid container>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/my-wishlist"
                        color="inherit"
                      >
                        Мой вишлист
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/friends"
                        color="inherit"
                      >
                        Друзья
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/user-search"
                        color="inherit"
                      >
                        Поиск
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ProfileMenu />
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  )
}
