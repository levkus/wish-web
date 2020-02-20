import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import Dropzone from 'components/Dropzone'

import { CREATE_WISH } from 'graphql/mutations'
import { ME } from 'graphql/queries'

const marks = [
  {
    value: 1,
    label: 'Хочу',
  },
  {
    value: 2,
    label: 'Очень хочу!',
  },
  {
    value: 3,
    label: 'Сплю и вижу!',
  },
]

const CreateWish = () => {
  const [wishCreated, setWishCreated] = useState(false)
  const { register, handleSubmit } = useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [priority, setPriority] = useState(2)
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

  const onSubmit = data => {
    createWish({
      variables: {
        ...data,
        imageUrl,
        priority,
        currency: 'rur',
      },
    })
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Ммм... новая хотелка?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    inputRef={register({
                      required: true,
                    })}
                    id="title"
                    name="title"
                    label="Название*"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    inputRef={register}
                    type="number"
                    id="price"
                    name="price"
                    label="Цена"
                    InputProps={{
                      endAdornment: '₽',
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                inputRef={register}
                id="link"
                name="link"
                label="Ссылка"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                inputRef={register}
                id="description"
                name="description"
                multiline
                rows="4"
                label="Описание"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Typography gutterBottom>Картинка</Typography>
            <Dropzone
              setUrl={setImageUrl}
              setLoading={setIsImageUploading}
              previewSrc={imageUrl}
            />
          </Grid>
          <Grid item>
            <Typography gutterBottom>Приоритет</Typography>
            <Slider
              name="priority"
              id="priority"
              value={priority}
              step={1}
              valueLabelDisplay="on"
              min={1}
              max={3}
              marks={marks}
              onChange={(e, value) => setPriority(value)}
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
