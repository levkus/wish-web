import React, { useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDropzone } from 'react-dropzone'
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import RootRef from '@material-ui/core/RootRef'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
    },
  },
  dropArea: {
    minHeight: '100px',
  },
  image: {
    maxHeight: '100px',
    display: 'block',
  },
}))

const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`

function Dropzone({ setUrl, setLoading, previewSrc }) {
  const classes = useStyles()
  const [singleUpload, { loading }] = useMutation(SINGLE_UPLOAD, {
    onCompleted: ({ singleUpload }) => {
      setUrl(singleUpload)
    },
  })

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  const onDrop = useCallback(
    acceptedFiles => {
      singleUpload({
        variables: {
          file: acceptedFiles[0],
        },
      })
    },
    [singleUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const { ref, ...rootProps } = getRootProps()

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />
    }
    if (!previewSrc && isDragActive) {
      return <Typography align="center">Отпусти тут :)</Typography>
    }
    if (!previewSrc) {
      return (
        <Typography align="center">Нажми сюда или перетащи картинку</Typography>
      )
    }
    return (
      <div>
        <img className={classes.image} alt="preview" src={previewSrc} />
      </div>
    )
  }

  return (
    <RootRef rootRef={ref}>
      <Paper variant="outlined" {...rootProps} className={classes.root}>
        <Grid
          className={classes.dropArea}
          justify="center"
          alignItems="center"
          container
        >
          <Grid item>
            <input {...getInputProps()} />
            {renderContent()}
          </Grid>
        </Grid>
      </Paper>
    </RootRef>
  )
}

export default Dropzone
