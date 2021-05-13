import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { ToggleButton } from '@material-ui/lab'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  selected: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  toggleWrapper: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2, 0),
    '& .MuiToggleButton-root': {
      marginRight: theme.spacing(2),
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTypography-root': {
      marginTop: theme.spacing(1),
    },
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiButton-root': {
      margin: theme.spacing(0, 1.5),
    },
  },
}))

interface EventProps {
  rootStyles?: string
}

const Event: React.FC<EventProps> = (props) => {
  const { rootStyles } = props
  const classes = useStyles()
  const router = useRouter()
  const [like, setLike] = useState(false)
  const [register, setRegister] = useState(false)

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h6">SunNUS</Typography>
        <Box className={classes.toggleWrapper}>
          <ToggleButton
            classes={{ selected: classes.selected }}
            value="check"
            selected={like}
            onChange={() => {
              setLike(!like)
            }}
          >
            <ThumbUpIcon />
          </ToggleButton>
          <ToggleButton
            classes={{ selected: classes.selected }}
            value="check"
            selected={register}
            onChange={() => {
              setRegister(!register)
            }}
          >
            {register ? (
              <Typography>Registered</Typography>
            ) : (
              <Typography>Register</Typography>
            )}
          </ToggleButton>
        </Box>
        <Box className={classes.content}>
          <img
            src="/login-banner.png"
            alt="Event Banner"
            className={classes.image}
          />
          <Typography variant="subtitle2">Description</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography variant="subtitle2">Location</Typography>
          <Typography>Sentosa Palawan Beach</Typography>
          <Typography variant="subtitle2">Event Date</Typography>
          <Typography>2021-05-28</Typography>
          <Typography variant="subtitle2">Category</Typography>
          <Typography>Sports</Typography>
          <Box className={classes.buttonWrapper}>
            <Button variant="contained" color="secondary">
              View Registrations
            </Button>
            <Button variant="contained" color="secondary">
              View Likes
            </Button>
            <Button variant="contained" color="secondary">
              View Comments
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Event
