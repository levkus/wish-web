import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

import { ProfileContext } from 'context/profile'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import Dropzone from 'components/Dropzone'

import { CREATE_WISH } from 'graphql/mutations'
import { ME } from 'graphql/queries'

const CreateWish = () => {
  const { id } = useContext(ProfileContext)
  const [wishCreated, setWishCreated] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isCancelPressed, setIsCancelPresses] = useState(false)

  const [createWish, { loading }] = useMutation(CREATE_WISH, {
    onCompleted: () => {
      setWishCreated(true)
    },
    refetchQueries: [{ query: ME }],
  })

  if (wishCreated || isCancelPressed) {
    return <Redirect to="/my-wishlist" />
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Ммм... новая хотелка?
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault()
          createWish({
            variables: { title, description, UserId: id, imageUrl },
          })
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth>
              <Input
                id="title"
                value={title}
                placeholder="Название"
                onChange={e => setTitle(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                multiline
                rows="4"
                label="Описание"
                id="description"
                value={description}
                // placeholder="Описание"
                onChange={e => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Dropzone
              setUrl={setImageUrl}
              setLoading={setIsImageUploading}
              previewSrc={imageUrl}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading || isImageUploading}
                    type="submit"
                  >
                    {loading ? 'Создаем...' : 'Создать'}
                  </Button>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Button
                    color="secondary"
                    disabled={loading || isImageUploading}
                    onClick={() => {
                      setIsCancelPresses(true)
                    }}
                  >
                    Отмена
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default CreateWish
