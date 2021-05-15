import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { createComment, getEventComments } from '../../services/comments'

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
    },
    list: {
      overflowY: 'scroll',
      height: '80%',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

interface CommentModalProps {
  id: string
}

const CommentModal: React.FC<CommentModalProps> = (props) => {
  const { id } = props
  const classes = useStyles()
  const [allComments, setAllComments] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    if (!isNaN(parseInt(id))) {
      getEventComments(id)
        .then((res) => {
          setAllComments(res.data.data)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }, [id])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setContent('')
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (content != '') {
      const createCommentInput = {
        event_id: parseInt(id),
        content,
      }
      createComment(createCommentInput)
        .then((res) => {
          setContent('')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }

  const handleTyping = (e) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {`View Comments (${allComments.length})`}
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
            <Typography variant="h6">{`Comments (${allComments.length})`}</Typography>
            <List dense={true} className={classes.list}>
              {allComments.map(
                ({ First_Name, Last_Name, Username, Content }) => {
                  return (
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText>{`${First_Name} ${Last_Name} @${Username}: ${Content}`}</ListItemText>
                    </ListItem>
                  )
                },
              )}
            </List>
            <form>
              <Grid container>
                <Grid item xs={10}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={content}
                    onChange={handleTyping}
                  />
                </Grid>
                <Grid item xs={2} className={classes.buttonWrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={handleComment}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default CommentModal
