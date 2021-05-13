import { Box, Drawer, makeStyles, Theme, Toolbar } from '@material-ui/core'
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import AOS from 'aos'

const drawerWidth: number = 300

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
}))

const Layout: React.FC = (props) => {
  const classes = useStyles(props)
  const { children } = props

  useEffect(() => {
    AOS.init({
      duration: 500,
    })
  })

  return (
    <Box className={classes.root}>
      <Navbar rootStyles={classes.appBar} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Box className={classes.drawerContainer}>
          {/* Insert Profile Component */}
        </Box>
      </Drawer>
      <Box className={classes.content} data-aos="slide-right">
        {children}
      </Box>
    </Box>
  )
}

export default Layout
