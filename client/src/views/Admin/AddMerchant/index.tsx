import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import userService from '../../../services/users'
import { useForm } from 'react-hook-form'
import Notification from '../../../components/Notification'
import AdminRoute from '../../../components/Authentication/AdminRoute'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
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
}))

const AddMerchant: React.FC = () => {
  const classes = useStyles()
  const { register, handleSubmit, control, errors } = useForm()
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [status, setStatus] = useState('')

  const onSubmit = (data) => {
    if (data.merchantName) {
      userService.addUser(data.merchantName).then((response) => {
        if (response) {
          setStatus('success')
          setNotificationMessage('New merchant added!')
          setTimeout(() => {
            setStatus('')
            setNotificationMessage(null)
          }, 3500)
        } else {
          setStatus('failure')
          setNotificationMessage('Merchant already exists. Use another name!')
          setTimeout(() => {
            setStatus('')
            setNotificationMessage(null)
          }, 3500)
        }
      })
    }
  }

  return (
    <AdminRoute>
      <Layout isAdmin pageTitle="Add Merchant">
        <Box className={classes.root}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={4} lg={2}>
                <Typography>Merchant Name</Typography>
              </Grid>
              <Grid item xs={8} lg={10}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  inputRef={register}
                  fullWidth
                  autoComplete="off"
                  id="merchantName"
                  name="merchantName"
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
              Add
            </Button>
          </form>
          <Box className={classes.notification}>
            <Notification message={notificationMessage} status={status} />
          </Box>
        </Box>
      </Layout>
    </AdminRoute>
  )
}

export default AddMerchant
