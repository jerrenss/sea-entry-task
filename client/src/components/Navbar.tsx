import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import OpacityIcon from '@material-ui/icons/Opacity'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  getAdminViewMode,
  getHotelName,
  isAdmin,
} from '../services/authentication'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 50,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.text.contrast,
    marginRight: theme.spacing(0.5),
  },
  personalization: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    '& :last-child': {
      marginLeft: theme.spacing(1),
    },
  },
  navigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  title: {
    textTransform: 'uppercase',
    color: theme.palette.text.contrast,
    fontWeight: 600,
  },
  hotelBadge: {
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    fontWeight: 600,
    backgroundColor: theme.palette.background.secondary,
    borderRadius: '20px',
    padding: theme.spacing(0.5, 1),
  },
  button: {
    color: theme.palette.text.contrast,
    textTransform: 'uppercase',
  },
}))

interface NavbarProps {
  rootStyles?: string
}

export const getAdminBadge = () => {
  const name = getAdminViewMode()
  if (name) {
    return `Admin (${name})`
  } else {
    return 'Admin'
  }
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { rootStyles } = props
  const classes = useStyles()
  const router = useRouter()

  const onSignOut = (e) => {
    e.preventDefault()
    console.log('Sign out')
  }

  return (
    <AppBar position="fixed" className={rootStyles}>
      <Toolbar className={classes.toolbar}>
        <>
          <OpacityIcon className={classes.icon} />
          <Box className={classes.personalization}>
            <Typography className={classes.title}>SeaEvents</Typography>
            <Typography className={classes.hotelBadge}>
              {isAdmin() ? getAdminBadge() : getHotelName()}
            </Typography>
          </Box>
          <Box className={classes.navigation}>
            <Link href="#" passHref>
              <Button className={classes.button}>Create Event</Button>
            </Link>
            <Link href="#" passHref>
              <Button className={classes.button}>Home</Button>
            </Link>
            <Link href="#" passHref>
              <Button className={classes.button}>About</Button>
            </Link>
            <Button
              className={classes.button}
              startIcon={<ExitToAppIcon />}
              onClick={onSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar