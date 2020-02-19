import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

import { pluralize } from 'magic/format'

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardHeader
        title={
          <RouterLink to={`/users/${user.username}`}>
            {user.username}
          </RouterLink>
        }
        subheader={`${user.wishes.length} ${pluralize(
          {
            zero: 'хотелок',
            one: 'хотелка',
            few: 'хотелки',
            many: 'хотелок',
          },
          user.wishes.length,
        )}`}
        avatar={
          <Avatar aria-label="avatar" style={{ backgroundColor: user.color }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        }
      ></CardHeader>
    </Card>
  )
}

export default UserCard
