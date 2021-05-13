import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Theme,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PublicIcon from '@material-ui/icons/Public'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VOUCH_PORTAL_URL } from '../config'
import activityService from '../services/activity'

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
    marginRight: theme.spacing(1),
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
  toggleSidebar?: () => void
}

interface MobileNavBarProps {
  toggleSidebar?: () => void
  getAdminBadge?: () => string
  redirectAdmin?: () => void
  onSignOut?: (e: any) => void
}

const MobileNavBar: React.FC<MobileNavBarProps> = (props) => {
  const { toggleSidebar, getAdminBadge, redirectAdmin, onSignOut } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={1}>
        <MenuIcon onClick={toggleSidebar} className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <Box className={classes.personalization}>
          <Typography className={classes.title}>VCP-BETA</Typography>
          <Typography className={classes.hotelBadge}>
            {isAdmin() ? getAdminBadge() : getHotelName()}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Box className={classes.navigation}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.icon}
          >
            Menu
          </Button>
          <Menu
            id="simple=menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isAdmin()
              ? [
                  <MenuItem onClick={handleClose}>
                    <Link href="/admin/all-merchants" passHref>
                      <Button
                        className={classes.button}
                        onClick={redirectAdmin}
                      >
                        Admin
                      </Button>
                    </Link>
                  </MenuItem>,
                ]
              : [
                  <>
                    <MenuItem onClick={handleClick}>
                      <Link href="/dashboard/profile" passHref>
                        <Button className={classes.button}>Home</Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClick}>
                      <Link href="/faq" passHref>
                        <Button className={classes.button}>FAQ</Button>
                      </Link>
                    </MenuItem>
                  </>,
                ]}
            <MenuItem onClick={handleClick}>
              <Button
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                onClick={onSignOut}
              >
                Sign Out
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  )
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
  const { rootStyles, toggleSidebar } = props
  const classes = useStyles()
  const router = useRouter()
  const matchesMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  )

  const onSignOut = (e) => {
    e.preventDefault()
    activityService
      .addActivity('LOGOUT')
      .then((response) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('VCPUserData')
          localStorage.removeItem('VCPUserObjectID')
          localStorage.removeItem('VCPJWT')
          localStorage.removeItem('VCPAdminViewMode')
          localStorage.removeItem('MerchantObjectID')
        }
        router.push(`${VOUCH_PORTAL_URL}/weblogout`)
      })
      .catch((err) => alert(err))
  }

  const redirectAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('VCPUserObjectID', '')
      localStorage.setItem('VCPAdminViewMode', '')
    }
  }

  return (
    <AppBar position="fixed" className={rootStyles}>
      <Toolbar className={classes.toolbar}>
        {matchesMobile ? (
          <MobileNavBar
            toggleSidebar={toggleSidebar}
            getAdminBadge={getAdminBadge}
            redirectAdmin={redirectAdmin}
            onSignOut={onSignOut}
          />
        ) : (
          <>
            <PublicIcon className={classes.icon} />
            <Box className={classes.personalization}>
              <Typography className={classes.title}>VCP-BETA</Typography>
              <Typography className={classes.hotelBadge}>
                {isAdmin() ? getAdminBadge() : getHotelName()}
              </Typography>
            </Box>
            <Box className={classes.navigation}>
              {isAdmin() ? (
                <>
                  <Link href="/admin/all-merchants" passHref>
                    <Button className={classes.button} onClick={redirectAdmin}>
                      Admin
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard/profile" passHref>
                    <Button className={classes.button}>Home</Button>
                  </Link>
                  <Link href="/faq" passHref>
                    <Button className={classes.button}>FAQ</Button>
                  </Link>
                </>
              )}
              <Button
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                onClick={onSignOut}
              >
                Sign Out
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
