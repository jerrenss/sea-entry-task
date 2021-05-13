import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Avatar, Box, Typography, Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  avatar: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 600,
  },
  details: {
    textAlign: 'left',
    '& :first-child': {
      margin: theme.spacing(2, 0),
    },
  },
}))

interface ProfileProps {
  rootStyles?: string
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { rootStyles } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <Box className={classes.root}>
      <Avatar
        alt="Profile Icon"
        src="/profile-icon.png"
        className={classes.avatar}
      />
      <Box className={classes.details}>
        <Typography className={classes.title}>Welcome James Tan!</Typography>
        <Typography>Username: jamesttx</Typography>
        <Typography>Role: Visitor</Typography>
        <Typography>Events Registered: 3</Typography>
        <Typography>Likes: 2</Typography>
        <Typography>Comments: 5</Typography>
      </Box>
    </Box>
  )
}

export default Profile
