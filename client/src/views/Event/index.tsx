import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { ToggleButton } from '@material-ui/lab'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import { getSingleEvent } from '../../services/events'
import Cookies from 'js-cookie'

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
  const [like, setLike] = useState(false)
  const [register, setRegister] = useState(false)
  const [event, setEvent] = useState<IEvent>(null)

  useEffect(() => {
    if (!isNaN(parseInt(id))) {
      getSingleEvent(id)
        .then((res) => {
          setEvent(res.data.data)
        })
        .catch((err) => {
          console.log(err.response.data.error)
        })
    }
  }, [id])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h6">{event?.title}</Typography>
        <Box className={classes.toggleWrapper}>
          <ToggleButton
            classes={{ selected: classes.selected }}
            value="check"
            selected={register}
            onChange={() => {
              setRegister(!register)
            }}
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
            onChange={() => {
              setLike(!like)
            }}
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
            <Button variant="contained" color="secondary">
              View Registrations
            </Button>
            <Button variant="contained" color="secondary">
              View Likes
            </Button>
            <Button variant="contained" color="secondary">
              View Comments
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Event
