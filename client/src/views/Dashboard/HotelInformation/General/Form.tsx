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
import Notification from '../../../../components/Notification'
import hotelInformationService from '../../../../services/hotelInformation'
import { VCPUserObjectID } from '../../const'
import { FormProps } from '../../../../types'
import activityService from '../../../../services/activity'

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

  const onSubmit = (data) => {
    console.log(data)
    hotelInformationService
      .updateHotelInformationByUser({ general: data }, VCPUserObjectID)
      .then((response) => {
        setStatus('success')
        setNotificationMessage('Administration data updated!')
        setTimeout(() => {
          setStatus('')
          setNotificationMessage(null)
        }, 3500)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL GENERAL'))
  }

  return (
    <>
      <Box className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={2}>
              <Typography>Hotel Name</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="hotelName"
                name="hotelName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Hotel Address</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="hotelAddress"
                id="hotelAddress"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Hotel Star Rating</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="hotelStarRating"
                name="hotelStarRating"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Hotel Opening Year</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="hotelOpeningYear"
                id="hotelOpeningYear"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Year of Last Renovation</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="yearOfLastRenovation"
                id="yearOfLastRenovation"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Number of Rooms</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="noOfRooms"
                id="noOfRooms"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Number of Floors</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="noOfFloors"
                id="noOfFloors"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Current POS System</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="currentPOSSystem"
                id="currentPOSSystem"
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
