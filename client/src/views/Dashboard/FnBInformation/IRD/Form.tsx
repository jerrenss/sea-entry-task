import React, { useState } from 'react'
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  TextField,
  Button,
  Grid,
  Link,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Notification from '../../../../components/Notification'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import foodAndBeveragesService from '../../../../services/foodAndBeverages'
import { VCPUserObjectID } from '../../const'
import { FormProps } from '../../../../types'
import { getHotelName } from '../../../../services/authentication'
import { handleDeleteS3Item } from '../../../../components/Table'
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
  const { preLoadedData, setContent } = props
  const [status, setStatus] = useState('')
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: preLoadedData,
  })
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [filename, setFileName] = useState({
    breakfastMenu: preLoadedData.breakfastMenu,
    lunchMenu: preLoadedData.lunchMenu,
    dinnerMenu: preLoadedData.dinnerMenu,
    supperMenu: preLoadedData.supperMenu,
    allDayMenu: preLoadedData.allDayMenu,
    otherMenu: preLoadedData.otherMenu,
  })

  const onSubmit = (data) => {
    const uploads = [
      'breakfastMenuUpload',
      'lunchMenuUpload',
      'dinnerMenuUpload',
      'supperMenuUpload',
      'allDayMenuUpload',
      'otherMenuUpload',
    ]
    const formData = new FormData()
    for (const key in data) {
      if (uploads.includes(key)) {
        if (data[key].length > 0) {
          handleDeleteS3Item(preLoadedData[key.substring(0, key.length - 6)])
          formData.set(key, data[key][0])
        }
      } else {
        formData.set(key, data[key])
      }
    }
    formData.set('hotelName', getHotelName())
    formData.set('formName', 'In Room Dining')
    foodAndBeveragesService
      .updateFoodAndBeverageByUser(formData, VCPUserObjectID)
      .then((response) => {
        setStatus('success')
        setNotificationMessage('In Room Dining data updated!')
        setTimeout(() => {
          setStatus('')
          setNotificationMessage(null)
        }, 3500)
      })
      .then(() => activityService.addActivity('UPDATE FNB IN-ROOM DINING'))
      .then(() => window.location.reload())
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
              <Typography>Breakfast Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="breakfastMenuUpload"
                  id="breakfastMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'breakfastMenu')}
                />
                <label htmlFor="breakfastMenuUpload">
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
                  {renderS3Url(filename.breakfastMenu)}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Breakfast Hours</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="breakfastHours"
                id="breakfastHours"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Lunch Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="lunchMenuUpload"
                  id="lunchMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'lunchMenu')}
                />
                <label htmlFor="lunchMenuUpload">
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
                  {renderS3Url(filename.lunchMenu)}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Lunch Hours</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="lunchHours"
                id="lunchHours"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Dinner Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="dinnerMenuUpload"
                  id="dinnerMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'dinnerMenu')}
                />
                <label htmlFor="dinnerMenuUpload">
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
                  {renderS3Url(filename.dinnerMenu)}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Dinner Hours</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="dinnerHours"
                id="dinnerHours"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Supper Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="supperMenuUpload"
                  id="supperMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'supperMenu')}
                />
                <label htmlFor="supperMenuUpload">
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
                  {renderS3Url(filename.supperMenu)}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Supper Hours</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="supperHours"
                id="supperHours"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>All-day Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="allDayMenuUpload"
                  id="allDayMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'allDayMenu')}
                />
                <label htmlFor="allDayMenuUpload">
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
                  {renderS3Url(filename.allDayMenu)}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Other Menu</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  type="file"
                  accept=".pdf,.xlsx,application/msexcel"
                  name="otherMenuUpload"
                  id="otherMenuUpload"
                  ref={register}
                  style={{ display: 'none' }}
                  onChange={(event) => onFileUpload(event, 'otherMenu')}
                />
                <label htmlFor="otherMenuUpload">
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
                  {renderS3Url(filename.otherMenu)}
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
