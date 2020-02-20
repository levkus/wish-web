import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Grid, Button, Badge } from '@material-ui/core'

const DesktopMenu = ({ profile }) => {
  if (profile.error || profile.loading) {
    return null
  }
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button component={RouterLink} to="/my-wishlist" color="inherit">
          Мой вишлист
        </Button>
      </Grid>
      <Grid item>
        <Badge
          badgeContent={profile.incomingFriendshipRequests.length}
          color="secondary"
        >
          <Button component={RouterLink} to="/friends" color="inherit">
            Друзья
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Button component={RouterLink} to="/user-search" color="inherit">
          Поиск людей
        </Button>
      </Grid>
    </Grid>
  )
}

export default DesktopMenu
