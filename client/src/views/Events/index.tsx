import React, { useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MaterialTable from 'material-table'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {
  getAllEvents,
  getEventCategories,
  getEventsCount,
} from '../../services/events'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputBase,
  makeStyles,
} from '@material-ui/core'
import UserRoute from '../../components/Authentication/UserRoute'
import moment from 'moment'
import RefreshIcon from '@material-ui/icons/Refresh'

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
  dateInput: {
    width: 100,
    '& .MuiInputLabel-root': {
      color: 'grey',
    },
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
  const [categories, setCategories] = useState([])
  const [eventsCount, setEventsCount] = useState(0)

  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    handleGetEventsCount(category, getDateRange(startDate, endDate))
    handleGetEventCategories()
  }, [])

  useEffect(() => {
    if (!isNaN(page)) {
      handleGetAllEvents(page, category, getDateRange(startDate, endDate))
    }
  }, [page])

  const handleGetAllEvents = (
    page: number,
    category: string,
    dateRange: string,
  ) => {
    getAllEvents(page, category, dateRange)
      .then((res) => {
        setEvents(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  const handleGetEventsCount = (category: string, dateRange: string) => {
    getEventsCount(category, dateRange)
      .then((res) => {
        setEventsCount(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  const handleGetEventCategories = () => {
    getEventCategories()
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  const handleSelectPage = (event) => {
    const newPage = event.target.value
    setPage(newPage)
  }

  const handleSelectCategory = (event) => {
    const newCategory = event.target.value
    setCategory(newCategory)
    handleGetAllEvents(1, newCategory, getDateRange(startDate, endDate))
    handleGetEventsCount(newCategory, getDateRange(startDate, endDate))
    setPage(1)
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

  const handleStartDate = (event) => {
    const newStartDate = event.target.value
    setStartDate(newStartDate)
    const dateRange = getDateRange(newStartDate, endDate)
    if (dateRange != '') {
      handleGetAllEvents(1, category, dateRange)
      handleGetEventsCount(category, dateRange)
      setPage(1)
    }
  }

  const handleEndDate = (event) => {
    const newEndDate = event.target.value
    setEndDate(newEndDate)
    const dateRange = getDateRange(startDate, newEndDate)
    if (dateRange != '') {
      handleGetAllEvents(1, category, dateRange)
      handleGetEventsCount(category, dateRange)
      setPage(1)
    }
  }

  const getDateRange = (start, end) => {
    if (
      moment(start, 'YYYY/MM/DD', true).isValid() &&
      moment(end, 'YYYY/MM/DD', true).isValid() &&
      start <= end
    ) {
      return `${start}:${end}`
    } else {
      return ''
    }
  }

  return (
    <UserRoute>
      <Layout>
        <MaterialTable
          options={{
            paging: false,
            sorting: false,
            search: false,
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
            router.push(`/user/event/${rowData.event_id}`)
          }}
          actions={[
            {
              icon: () => (
                <TextField
                  className={classes.dateInput}
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDate}
                />
              ),
              tooltip: 'Choose Start Date',
              isFreeAction: true,
              onClick: (event) => event,
            },
            {
              icon: () => (
                <TextField
                  className={classes.dateInput}
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDate}
                />
              ),
              tooltip: 'Choose End Date',
              isFreeAction: true,
              onClick: (event) => event,
            },
            {
              icon: () => (
                <Select
                  value={category}
                  onChange={handleSelectCategory}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">All</MenuItem>
                  {categories.map(({ Category }, i) => (
                    <MenuItem value={Category} key={i}>
                      {Category}
                    </MenuItem>
                  ))}
                </Select>
              ),
              tooltip: 'Choose Category',
              isFreeAction: true,
              onClick: (event) => event,
            },
            {
              icon: () => <RefreshIcon />,
              tooltip: 'Reset Filters',
              isFreeAction: true,
              onClick: (event) => {
                setStartDate('')
                setEndDate('')
                setCategory('')
                setPage(1)
                handleGetAllEvents(1, '', '')
                handleGetEventsCount('', '')
              },
            },
          ]}
        />
        <Box className={classes.paginationWrapper}>
          <ArrowLeftIcon
            className={classes.arrowIcon}
            onClick={handleDecreasePage}
          />
          <Select
            value={page}
            onChange={handleSelectPage}
            input={<BootstrapInput />}
          >
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
    </UserRoute>
  )
}

export default Events
