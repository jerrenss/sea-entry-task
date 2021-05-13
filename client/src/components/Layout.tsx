import {
  Box,
  Drawer,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import DrawerList from './DrawerList'
import Navbar from './Navbar'
import AOS from 'aos'
import DrawerListAdmin from './DrawerListAdmin'
import UpdateStamp from './UpdateStamp'

const drawerWidth: number = 240

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.primary,
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      '& .MuiPaper-root': {
        width: '100%',
      },
      flexShrink: 0,
      marginTop: theme.spacing(2),
    },
  },
  drawerPaper: {
    borderRight: 'none',
    width: 'inherit',
    [theme.breakpoints.down('xs')]: {
      '& .MuiBox-root .MuiToolbar-root': {
        width: '100%',
      },
    },
  },
  drawerContainer: {
    overflow: 'auto',
    '& .MuiListItemIcon-root': {
      minWidth: 40,
    },
    [theme.breakpoints.down('xs')]: {
      '& nav': {
        width: '100%',
      },
    },
  },
  progressWrapper: {
    margin: theme.spacing(1, 1),
    padding: theme.spacing(2, 2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
  },
  content: {
    display: 'grid',
    alignContent: 'flex-start',
    marginTop: theme.spacing(10),
    padding: theme.spacing(1.5, 5, 5, 5),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      '& *': {
        width: '100%',
      },
    },
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  buttons: {
    display: 'inline-block',
    justifyContent: 'space-evenly',
    marginLeft: theme.spacing(1.5),
  },
}))

interface LayoutProps {
  isAdmin?: boolean
  pageTitle?: string
  hideTitle?: boolean
  pageModal?: ReactNode
  exportButton?: ReactNode
  updateStamp?: string
}

const Layout: React.FC<LayoutProps> = (props) => {
  const classes = useStyles(props)
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const {
    children,
    isAdmin = false,
    pageTitle,
    hideTitle = false,
    pageModal,
    exportButton,
    updateStamp,
  } = props
  const router = useRouter()

  const matchesMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  )

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle)

  const redirectPage = (e, url) => {
    e.preventDefault()
    router.push(url)
  }

  useEffect(() => {
    AOS.init({
      duration: 500,
    })
  })

  return (
    <Box className={classes.root}>
      <Navbar rootStyles={classes.appBar} toggleSidebar={toggleSidebar} />
      {matchesMobile && sidebarToggle && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          data-aos="slide-right"
        >
          <Toolbar />
          <Box className={classes.drawerContainer}>
            {isAdmin ? (
              <DrawerListAdmin
                pageTitle={pageTitle}
                onClickHandler={redirectPage}
              />
            ) : (
              <DrawerList pageTitle={pageTitle} onClickHandler={redirectPage} />
            )}
          </Box>
        </Drawer>
      )}
      {!matchesMobile && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <Box className={classes.drawerContainer}>
            {isAdmin ? (
              <DrawerListAdmin
                pageTitle={pageTitle}
                onClickHandler={redirectPage}
              />
            ) : (
              <DrawerList pageTitle={pageTitle} onClickHandler={redirectPage} />
            )}
          </Box>
        </Drawer>
      )}
      {matchesMobile && !sidebarToggle && (
        <Box className={classes.content} data-aos="slide-right">
          <Box>
            {!hideTitle && (
              <Typography variant="h6" className={classes.title}>
                {pageTitle}
              </Typography>
            )}
            <Box className={classes.buttons}>
              {pageModal}
              {exportButton}
            </Box>
          </Box>
          {children}
        </Box>
      )}
      {!matchesMobile && (
        <Box className={classes.content} data-aos="slide-right">
          <Box>
            {!hideTitle && (
              <Typography variant="h6" className={classes.title}>
                {pageTitle}
              </Typography>
            )}
            <Box className={classes.buttons}>
              {pageModal}
              {exportButton}
            </Box>
            {updateStamp && <UpdateStamp updates={updateStamp} />}
          </Box>
          {children}
        </Box>
      )}
    </Box>
  )
}

export default Layout
