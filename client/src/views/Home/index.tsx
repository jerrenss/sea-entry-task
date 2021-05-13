import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeWorkIcon />
          </Avatar>
          <Typography variant="h5">Welcome!</Typography>
          <Button
            onClick={handleClick}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Click me to login!
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default Home
