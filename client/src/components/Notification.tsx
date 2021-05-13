import React, { useState } from 'react'
import {
  Collapse,
  makeStyles,
  Theme,
  IconButton,
  Icon,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginBottom: theme.spacing(2),
    },
  },
}))

type NotificationProps = {
  message: string
  status: string
}

const Notification: React.FC<NotificationProps> = ({
  message,
  status,
}: NotificationProps) => {
  const classes = useStyles()
  let success: boolean =
    status === 'success' ? true : status === 'failure' ? false : null
  const [open, setOpen] = useState(true)
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        {message &&
          (success ? (
            <Alert
              action={
                <IconButton
                  aira-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => {
                      setOpen(true)
                    }, 2500)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              variant="standard"
              severity="success"
            >
              {message}
            </Alert>
          ) : (
            <Alert
              action={
                <IconButton
                  aira-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => {
                      setOpen(true)
                    }, 2500)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              variant="standard"
              severity="error"
            >
              {message}
            </Alert>
          ))}
      </Collapse>
    </div>
  )
}

export default Notification
