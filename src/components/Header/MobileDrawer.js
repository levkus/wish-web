import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  Typography,
  Divider,
  Badge,
} from '@material-ui/core'

import {
  MenuOutlined,
  ListOutlined,
  AccountBoxOutlined,
  GroupOutlined,
  SearchOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(1),
  },
}))

const MobileDrawer = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false)
  const classes = useStyles()

  const handleClose = () => {
    setIsOpen(false)
  }

  if (profile.error || profile.loading) {
    return null
  }

  return (
    <>
      <Badge
        color="secondary"
        badgeContent={profile.incomingFriendshipRequests.length}
        overlap="circle"
      >
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <MenuOutlined />
        </IconButton>
      </Badge>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <List>
          <ListItem>
            <Grid container alignItems="center" spacing={1}>
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
          </ListItem>
          <Divider />
          <ListItem
            button
            component={RouterLink}
            to="/my-profile"
            onClick={handleClose}
          >
            <ListItemIcon>
              <AccountBoxOutlined />
            </ListItemIcon>
            <ListItemText>Мой профиль</ListItemText>
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/my-wishlist"
            onClick={handleClose}
          >
            <ListItemIcon>
              <ListOutlined />
            </ListItemIcon>
            <ListItemText>Мой вишлист</ListItemText>
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/friends"
            onClick={handleClose}
          >
            <ListItemIcon>
              <Badge
                color="secondary"
                badgeContent={profile.incomingFriendshipRequests.length}
              >
                <GroupOutlined />
              </Badge>
            </ListItemIcon>
            <ListItemText>Друзья</ListItemText>
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/user-search"
            onClick={handleClose}
          >
            <ListItemIcon>
              <SearchOutlined />
            </ListItemIcon>
            <ListItemText>Поиск людей</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              window.localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            <ListItemIcon>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText>Выйти</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default MobileDrawer
