import React, { useState } from 'react'
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  Button,
  Grid,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Notification from '../../../../components/Notification'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import roomsService from '../../../../services/rooms'
import { VCPUserObjectID } from '../../const'
import { FormProps } from '../../../../types'
import { handleDeleteS3Item } from '../../../../components/Table'
import { getHotelName } from '../../../../services/authentication'
import activityService from '../../../../services/activity'
import { renderS3Url } from '../../../../utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& .MuiGrid-item': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  uploadSection: {
    margin: theme.spacing(2, 0),
    display: 'flex',
  },
  uploadedFilename: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notification: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    color: theme.palette.primary.dark,
  },
}))

const Form: React.FC<FormProps> = (props) => {
  const classes = useStyles(props)
  const { preLoadedData } = props
  const [status, setStatus] = useState('')
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: preLoadedData,
  })
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [filename, setFileName] = useState({
    floorPlanDocument: preLoadedData.floorPlanDocument,
  })

  const onSubmit = (data) => {
    const uploads = ['floorPlanDocumentUpload']
    let noUploads = true
    const formData = new FormData()
    for (const key in data) {
      if (uploads.includes(key)) {
        if (data[key].length > 0) {
          handleDeleteS3Item(preLoadedData[key.substring(0, key.length - 6)])
          formData.set(key, data[key][0])
          noUploads = false
        }
      } else {
        formData.set(key, data[key])
      }
    }
    if (!noUploads) {
      formData.set('hotelName', getHotelName())
      formData.set('formName', 'Rooms Floor Plan')
      roomsService
        .updateRoomsByUser(formData, VCPUserObjectID)
        .then((response) => {
          setStatus('success')
          setNotificationMessage('Room Floor Plan data updated!')
          setTimeout(() => {
            setStatus('')
            setNotificationMessage(null)
          }, 3500)
        })
        .then(() => activityService.addActivity('UPDATE ROOM FLOOR PLAN'))
        .then(() => window.location.reload())
    }
  }

  //get the filename and extension to display
  const onFileUpload = (event, key) => {
    console.log('FILES', event.target.files)
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    )
      return

    const updatedFilenameState = { ...filename }
    const name = event.target.files[0].name
    updatedFilenameState[key] = name
    console.log('updatedFileNameState', updatedFilenameState)
    setFileName(updatedFilenameState)
  }

  return (
    <>
      <Box className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={2}>
              <Typography>Rooms Floor Plan</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="floorPlanDocumentUpload"
                  id="floorPlanDocumentUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'floorPlanDocument')}
                />
                <label htmlFor="floorPlanDocumentUpload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                <Box className={classes.uploadedFilename}>
                  {renderS3Url(filename.floorPlanDocument)}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </Box>
      <Box className={classes.notification}>
        <Notification message={notificationMessage} status={status} />
      </Box>
    </>
  )
}

export default Form
