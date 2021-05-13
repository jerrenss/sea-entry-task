import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  List,
  makeStyles,
  Switch,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { DASHBOARD_SECTIONS } from '../views/Dashboard/const'
import DrawerListItem from './DrawerListItem'
import userService from '../services/users'
import { getVCPUserObjectID } from '../services/authentication'

export interface DrawerListProps {
  pageTitle: string
  onClickHandler: (e: any, url: string) => void
}

const switchColor = '#77DD77'
const switchOffColor = '#FF6961'
const CustomSwitch = withStyles({
  switchBase: {
    color: switchOffColor,
    '&$checked': {
      color: switchColor,
    },
    '&$checked + $track': {
      backgroundColor: switchColor,
    },
  },
  checked: {},
  track: {},
})(Switch)

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  switchContainer: {
    border: `3px dotted ${theme.palette.text.light}`,
    borderRadius: '10px',
    margin: theme.spacing(2),
    padding: theme.spacing(1, 2),
    textAlign: 'center',
  },
  switchHeader: {
    fontWeight: 600,
  },
  selectedOption: {
    backgroundColor: switchColor,
    padding: theme.spacing(0.25, 0.5),
    borderRadius: '10px',
  },
  unselectedOption: {
    backgroundColor: switchOffColor,
    padding: theme.spacing(0.25, 0.5),
    borderRadius: '10px',
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
/**
 * Renders a list of DrawerListItem elements in the side drawer of Layout
 * @param pageTitle title of the current page used for url redirection and rendering
 */
const DrawerList: React.FC<DrawerListProps> = (props) => {
  const classes = useStyles(props)
  const [switchChecked, setSwitchChecked] = useState(null)
  const VCPUserObjectID = getVCPUserObjectID()

  useEffect(() => {
    fetchCompletion()
  }, [])

  const fetchCompletion = () => {
    userService
      .getUserByUserId(VCPUserObjectID)
      .then((response) => setSwitchChecked(response.completed))
  }
  const handleSwitchToggle = () => {
    setSwitchChecked(!switchChecked)
    userService.updateUserCompletion(!switchChecked, VCPUserObjectID)
  }

  return (
    <List>
      {DASHBOARD_SECTIONS.map(({ title, url, icon, nestedItems }, index) => {
        return (
          <DrawerListItem
            key={url}
            title={title}
            pageTitle={props.pageTitle}
            url={'/dashboard'.concat(url)}
            icon={icon}
            nestedItems={nestedItems}
            onClickHandler={props.onClickHandler}
          />
        )
      })}
      {switchChecked != undefined && (
        <Box className={classes.switchContainer}>
          <Typography className={classes.switchHeader}>Completed?</Typography>
          <Grid className={classes.toggleContainer} container spacing={1}>
            <Typography className={!switchChecked && classes.unselectedOption}>
              No
            </Typography>
            <Grid item>
              <CustomSwitch
                checked={switchChecked}
                onChange={handleSwitchToggle}
              />
            </Grid>
            <Typography className={switchChecked && classes.selectedOption}>
              Yes
            </Typography>
          </Grid>
        </Box>
      )}
    </List>
  )
}

export default DrawerList
