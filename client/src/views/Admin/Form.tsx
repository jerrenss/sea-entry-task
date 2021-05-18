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
import { Controller, useForm } from 'react-hook-form'
import { createEvent } from '../../services/events'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { uploadSinglePhoto } from '../../services/photos'
import ReactDatePicker from 'react-datepicker'
import { convertTimestamp } from '../../utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
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
}))

const Form: React.FC = (props) => {
  const classes = useStyles(props)
  const [image, setImage] = useState('/null_image.png')
  const { register, handleSubmit, control, watch } = useForm({})
  const [selectedDate, setSelectedDate] = useState(null)

  const onSubmit = (data) => {
    if (data['DatePicker'] !== null) {
      data['event_date'] = convertTimestamp(selectedDate)
    }
    createEvent(data)
      .then((res) => {
        const formData = new FormData()
        if (data.photo.length > 0) {
          formData.set('photo', data['photo'][0])
          formData.set('event_id', res.data.data.event_id)
          uploadSinglePhoto(formData)
            .then((res) => {
              alert(`Event ${data.title} with photo created successfully!`)
              location.reload()
            })
            .catch((err) => alert(err.response.data.error))
        } else {
          alert(`Event ${data.title} without photo created successfully!`)
          location.reload()
        }
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Create Event
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={2}>
              <Typography>Title</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="title"
                name="title"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Description</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="description"
                id="description"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Location</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="location"
                id="location"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Category</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                name="category"
                id="category"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Date</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Controller
                as={ReactDatePicker}
                control={control}
                valueName="selected"
                selected={selectedDate}
                onChange={([selected]) => {
                  setSelectedDate(selected)
                  return selected
                }}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select Date"
                name="DatePicker"
                defaultValue={null}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4} lg={2}>
              <Typography>Photo</Typography>
            </Grid>
            <Grid item xs={8} lg={10}>
              <Box className={classes.uploadSection}>
                <input
                  accept="image/*"
                  name="photo"
                  id="photo"
                  ref={register}
                  onChange={(event) => onImageChange(event)}
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo">
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
                  <img src={image} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  )
}

export default Form
