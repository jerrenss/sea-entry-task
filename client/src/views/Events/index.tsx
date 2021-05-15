import React, { useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MaterialTable from 'material-table'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsCount } from '../../services/events'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputBase,
  makeStyles,
} from '@material-ui/core'
import classes from '*.module.css'

const useStyles = makeStyles((theme) => ({
  paginationWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  pageTotal: {
    marginLeft: theme.spacing(1),
  },
  arrowIcon: {
    fontSize: '2rem',
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)

const Events: React.FC = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [eventsCount, setEventsCount] = useState(0)

  useEffect(() => {
    if (!isNaN(page)) {
      getAllEvents(page)
        .then((res) => {
          setEvents(res.data.data)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }, [page])

  useEffect(() => {
    getEventsCount()
      .then((res) => {
        setEventsCount(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }, [])

  const handleSelect = (event) => {
    setPage(event.target.value)
  }

  const divisionAndCeiling = (value) => {
    return Math.ceil(value / 10)
  }

  const handleIncreasePage = () => {
    if (page < divisionAndCeiling(eventsCount)) {
      setPage(page + 1)
    }
  }

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  return (
    <Layout>
      <MaterialTable
        options={{
          paging: false,
        }}
        columns={[
          { title: 'ID', field: 'event_id' },
          { title: 'Title', field: 'title' },
          { title: 'Event Date', field: 'event_date' },
          { title: 'Location', field: 'location' },
          { title: 'Category', field: 'category' },
        ]}
        data={events}
        title={`Events List (${eventsCount})`}
        onRowClick={(event, rowData) => {
          router.push(`/client/event/${rowData.event_id}`)
        }}
      />
      <Box className={classes.paginationWrapper}>
        <ArrowLeftIcon
          className={classes.arrowIcon}
          onClick={handleDecreasePage}
        />
        <Select value={page} onChange={handleSelect} input={<BootstrapInput />}>
          {[...Array(divisionAndCeiling(eventsCount))].map((e, i) => (
            <MenuItem value={i + 1} key={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
        <Typography className={classes.pageTotal}>{`/ ${divisionAndCeiling(
          eventsCount,
        )}`}</Typography>
        <ArrowRightIcon
          className={classes.arrowIcon}
          onClick={handleIncreasePage}
        />
      </Box>
    </Layout>
  )
}

export default Events
