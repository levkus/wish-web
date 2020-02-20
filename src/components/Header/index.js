import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Grid } from '@material-ui/core'

import ProfileMenu from './ProfileMenu'
import DesktopMenu from './DesktopMenu'
import MobileDrawer from './MobileDrawer'

import logo from './assets/logo.svg'

const useStyles = makeStyles(theme => ({
  links: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
  },
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
  marginLeft: {
    marginLeft: 'auto',
  },
}))

export default function Header() {
  const profile = useContext(ProfileContext)
  const classes = useStyles()
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="logo" />
          </Link>
          <Grid
            container
            alignItems="center"
            justify={isSmall ? 'flex-end' : 'flex-start'}
          >
            {isSmall ? (
              <MobileDrawer profile={profile} />
            ) : (
              <>
                <Grid item className={classes.links}>
                  <DesktopMenu profile={profile} />
                </Grid>
                <Grid item className={classes.marginLeft}>
                  <ProfileMenu profile={profile} />
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}
