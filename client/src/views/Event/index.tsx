import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { ToggleButton } from '@material-ui/lab'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import { getSingleEvent } from '../../services/events'
import RegistrationModal from '../../components/Modals/RegistrationModal'
import LikesModal from '../../components/Modals/LikesModal'
import CommentsModal from '../../components/Modals/CommentsModal'
import { createLike, deleteLike, getEventLikes } from '../../services/likes'
import {
  createRegistration,
  deleteRegistration,
  getEventRegistrations,
} from '../../services/registers'

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  selected: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  toggleWrapper: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2, 0),
    '& .MuiToggleButton-root': {
      marginRight: theme.spacing(2),
    },
  },
  toggleText: {
    marginLeft: theme.spacing(1),
    fontWeight: 700,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTypography-root': {
      marginTop: theme.spacing(1),
    },
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiButton-root': {
      margin: theme.spacing(0, 1.5),
    },
  },
}))

interface EventProps {
  id: string
}

interface IEvent {
  event_id: number
  created_at: string
  title: string
  description: string
  event_date: string
  location: string
  category: string
}

const Event: React.FC<EventProps> = (props) => {
  const { id } = props
  const classes = useStyles()
  const [register, setRegister] = useState(false)
  const [like, setLike] = useState(false)
  const [event, setEvent] = useState<IEvent>(null)
  const [allRegistrations, setAllRegistrations] = useState([])
  const [allLikes, setAllLikes] = useState([])

  useEffect(() => {
    if (!isNaN(parseInt(id))) {
      getSingleEvent(id)
        .then((res) => {
          setEvent(res.data.data)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }, [id])

  useEffect(() => {
    if (!isNaN(parseInt(id))) {
      getEventLikes(id)
        .then((res) => {
          setAllLikes(res.data.data)
          setLike(res.data.userLiked)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }, [id])

  useEffect(() => {
    if (!isNaN(parseInt(id))) {
      getEventRegistrations(id)
        .then((res) => {
          setAllRegistrations(res.data.data)
          setRegister(res.data.userRegistered)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }, [id])

  const onRegisterChange = (e) => {
    const isRegisterAction = !register
    setRegister(isRegisterAction)
    if (isRegisterAction) {
      createRegistration(id)
        .then((res) => {
          console.log('Success')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    } else {
      deleteRegistration(id)
        .then((res) => {
          console.log('Success')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }

  const onLikeChange = (e) => {
    const isLikeAction = !like
    setLike(isLikeAction)
    if (isLikeAction) {
      createLike(id)
        .then((res) => {
          console.log('Success')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    } else {
      deleteLike(id)
        .then((res) => {
          console.log('Success')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h6">{`#${event?.event_id} ${event?.title}`}</Typography>
        <Box className={classes.toggleWrapper}>
          <ToggleButton
            classes={{ selected: classes.selected }}
            value="check"
            selected={register}
            onChange={onRegisterChange}
          >
            <>
              <LibraryBooksIcon />
              <Typography className={classes.toggleText}>
                {register ? 'Registered' : 'Register'}
              </Typography>
            </>
          </ToggleButton>
          <ToggleButton
            classes={{ selected: classes.selected }}
            value="check"
            selected={like}
            onChange={onLikeChange}
          >
            <>
              <ThumbUpIcon />
              <Typography className={classes.toggleText}>
                {like ? 'Liked' : 'Like'}
              </Typography>
            </>
          </ToggleButton>
        </Box>
        <Box className={classes.content}>
          {/* TODO: Dynamically render image */}
          <img
            src="/login-banner.png"
            alt="Event Banner"
            className={classes.image}
          />
          <Typography variant="subtitle2">Description</Typography>
          <Typography>{event?.description}</Typography>
          <Typography variant="subtitle2">Location</Typography>
          <Typography>{event?.location}</Typography>
          <Typography variant="subtitle2">Event Date</Typography>
          <Typography>{event?.event_date}</Typography>
          <Typography variant="subtitle2">Category</Typography>
          <Typography>{event?.category}</Typography>
          <Box className={classes.buttonWrapper}>
            <RegistrationModal />
            <LikesModal />
            <CommentsModal />
          </Box>
        </Box>
      </Box>
      {/* <Typography>{JSON.stringify(allLikes)}</Typography>
      <Typography>{JSON.stringify(allRegistrations)}</Typography> */}
    </Layout>
  )
}

export default Event
