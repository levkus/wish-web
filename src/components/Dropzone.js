import React, { useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDropzone } from 'react-dropzone'
import { gql } from 'apollo-boost'

import Paper from '@material-ui/core/Paper'
import RootRef from '@material-ui/core/RootRef'

const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`

function Dropzone({ setUrl, setLoading, previewSrc }) {
  const [singleUpload, { loading, error }] = useMutation(SINGLE_UPLOAD, {
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

  return (
    <RootRef rootRef={ref}>
      <Paper variant="outlined" {...rootProps}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {previewSrc && (
          <div>
            <img alt="preview" src={previewSrc} />
          </div>
        )}
      </Paper>
    </RootRef>
  )
}

export default Dropzone
