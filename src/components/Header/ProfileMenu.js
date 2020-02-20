import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Avatar, Menu, Grid, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  menuButton: {
    cursor: 'pointer',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}))

const ProfileMenu = ({ profile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (profile.error || profile.loading) {
    return null
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
          <Typography>{profile?.username}</Typography>
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
          Мой профиль
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

export default ProfileMenu
