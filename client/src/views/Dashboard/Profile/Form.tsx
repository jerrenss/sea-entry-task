import React, { useState } from 'react'
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  TextField,
  Button,
  Grid,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Notification from '../../../components/Notification'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { FormProps } from '../../../types'
import profileService from '../../../services/profile'
import { VCPUserObjectID } from '../const'
import { getHotelName } from '../../../services/authentication'
import activityService from '../../../services/activity'

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
  uploadedImage: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    alignItems: 'center',
    '& img': {
      height: '35px',
      width: '35px',
      objectFit: 'cover',
      borderRadius: 3,
    },
    '& .MuiSvgIcon-root': {
      height: '15px',
      marginLeft: theme.spacing(0.25),
      cursor: 'pointer',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notification: {
    marginBottom: theme.spacing(2),
  },
  fieldName: {
    display: 'inline-flex',
  },
}))

const Form: React.FC<FormProps> = (props) => {
  const classes = useStyles(props)
  const { preLoadedData } = props
  const { register, handleSubmit } = useForm({
    defaultValues: preLoadedData,
  })
  const [status, setStatus] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [image, setImage] = useState({
    chatAvatar: preLoadedData.chatAvatar
      ? `${preLoadedData.chatAvatar}?nocache=${Math.random()}`
      : null,
    hotelLogo: preLoadedData.hotelLogo
      ? `${preLoadedData.hotelLogo}?nocache=${Math.random()}`
      : null,
  })

  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData()
    for (const key in data) {
      if (key == 'chatAvatarUpload') {
        if (data.chatAvatarUpload.length > 0) {
          formData.set(key, data[key][0])
        }
      } else if (key == 'hotelLogoUpload') {
        if (data.hotelLogoUpload.length > 0) {
          formData.set(key, data[key][0])
        }
      } else {
        formData.set(key, data[key])
      }
    }
    // Send Hotel Name for API to process
    formData.set('hotelName', getHotelName())
    profileService
      .updateProfileByUser(formData, VCPUserObjectID)
      .then((response) => {
        setStatus('success')
        setNotificationMessage('Profile data updated!')
        setTimeout(() => {
          setStatus('')
          setNotificationMessage(null)
        }, 3500)
      })
      .then(() => activityService.addActivity('UPDATE PROFILE'))
  }

  const onImageChange = (event, key) => {
    console.log('FILES', event.target.files)
    if (event.target.files && event.target.files[0]) {
      const updateImageState = { ...image }
      updateImageState[key] = URL.createObjectURL(event.target.files[0])
      setImage(updateImageState)
    }
  }

  console.log(preLoadedData)

  return (
    <>
      <Box className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={2}>
              <Typography>Chat Persona Name</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="chatPersonaName"
                name="chatPersonaName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Chat Avatar</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  accept="image/*"
                  name="chatAvatarUpload"
                  id="chatAvatarUpload"
                  ref={register}
                  onChange={(event) => onImageChange(event, 'chatAvatar')}
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="chatAvatarUpload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                <Box className={classes.uploadedImage}>
                  <img src={image.chatAvatar || '/null_image.png'} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Hotel Logo</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  accept="image/*"
                  name="hotelLogoUpload"
                  id="hotelLogoUpload"
                  ref={register}
                  onChange={(event) => onImageChange(event, 'hotelLogo')}
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="hotelLogoUpload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                <Box className={classes.uploadedImage}>
                  <img src={image.hotelLogo || '/null_image.png'} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Brand Template Primary</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="brandTemplatePrimary"
                name="brandTemplatePrimary"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Brand Template Secondary</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="brandTemplateSecondary"
                name="brandTemplateSecondary"
                InputLabelProps={{ shrink: true }}
              />
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
