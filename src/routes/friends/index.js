import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Loader from 'components/Loader'
import UserCard from 'components/UserCard'

import { GET_FRIENDS } from 'graphql/queries'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const Friends = () => {
  const { data, loading } = useQuery(GET_FRIENDS, {
    variables: {
      status: 'accepted',
    },
    fetchPolicy: 'no-cache',
  })

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Loader isLoading={loading}>
      <Container maxWidth="md">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label={`Друзья (${data?.me.friends.length || 0})`}
            {...a11yProps(0)}
          />
          <Tab
            label={`Входящие (${data?.me.incomingFriendshipRequests.length ||
              0})`}
            {...a11yProps(1)}
          />
          <Tab
            label={`Исходящие (${data?.me.outgoingFriendshipRequests.length ||
              0})`}
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid direction="column" container spacing={2}>
            {data?.me.friends.map(user => (
              <Grid key={user.id} item>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid direction="column" container spacing={2}>
            {data?.me.incomingFriendshipRequests.map(user => (
              <Grid key={user.id} item>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid direction="column" container spacing={2}>
            {data?.me.outgoingFriendshipRequests.map(user => (
              <Grid key={user.id} item>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Container>
    </Loader>
  )
}

export default Friends
