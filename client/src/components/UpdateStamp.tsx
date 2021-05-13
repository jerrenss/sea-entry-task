import { Typography } from '@material-ui/core'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  textStyle: {
    fontStyle: 'italic',
    color: theme.palette.text.tertiary,
  },
}))

interface UpdateStampProps {
  updates: string
}

// Component not in use at the moment, as updatedAt cannot be served as timestamp
const UpdateStamp: React.FC<UpdateStampProps> = (props) => {
  const classes = useStyles()
  const { updates } = props

  return (
    <Typography className={classes.textStyle}>
      Last updated at: {moment(updates).format('YYYY/MM/DD HH:mm:ss A')}
    </Typography>
  )
}

export default UpdateStamp
