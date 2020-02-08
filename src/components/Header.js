import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'

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
          <Link to="/profile" component={RouterLink}>
            Профиль
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

export default function ButtonAppBar() {
  const profile = useContext(ProfileContext)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Wish
          </Typography>
          {!profile.error && !profile.loading && <ProfileMenu />}
        </Toolbar>
      </AppBar>
    </div>
  )
}
