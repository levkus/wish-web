import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { DELETE_WISH } from 'graphql/mutations'
import { ME } from 'graphql/queries'

const WishMenu = ({ wish }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [deleteWish, { loading }] = useMutation(DELETE_WISH)

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
            disabled={loading}
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
            {loading ? 'Удаляем...' : 'Удалить'}
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}

export default WishMenu
