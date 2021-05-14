import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      height: 500,
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000000',
      borderRadius: 8,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: 'scroll',
    },
  }),
)

interface RegModalProps {
  content: any[]
}

const RegistrationModal: React.FC<RegModalProps> = (props) => {
  const { content } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {`View Registrations (${content.length})`}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h6">{`Registrations (${content.length})`}</Typography>
            <List dense={true}>
              {content.map(({ First_Name, Last_Name, Username }) => {
                return (
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>{`${First_Name} ${Last_Name} @${Username}`}</ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
export default RegistrationModal
