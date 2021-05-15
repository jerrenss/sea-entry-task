import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Avatar, Box, Typography } from '@material-ui/core'
import { getSingleUser } from '../services/users'

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

const convertTimestamp = (timestamp: string) => {
  if (timestamp) {
    const date = new Date(timestamp)
    return date.toISOString().slice(0, 10)
  }
}

const Profile: React.FC = (props) => {
  const classes = useStyles()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getSingleUser()
      .then((res) => {
        setUser(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }, [])

  return (
    <Box className={classes.root}>
      <Avatar
        alt="Profile Icon"
        src="/profile-icon.png"
        className={classes.avatar}
      />
      {user && (
        <Box className={classes.details}>
          <Typography
            className={classes.title}
          >{`Welcome ${user?.first_name} ${user?.last_name}!`}</Typography>
          <Typography>{`Username: ${user?.username}`}</Typography>
          <Typography>{`Role: ${
            user?.is_admin ? 'Admin' : 'Visitor'
          }`}</Typography>
          <Typography>{`Date Joined: ${convertTimestamp(
            user?.created_at,
          )}`}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default Profile
