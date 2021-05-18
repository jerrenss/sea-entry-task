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
  Typography,
  Select,
  MenuItem,
  InputBase,
  makeStyles,
} from '@material-ui/core'
import classes from '*.module.css'
import UserRoute from '../../components/Authentication/UserRoute'

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

  useEffect(() => {
    if (!isNaN(page)) {
      handleGetAllEvents(page, category)
      handleGetEventsCount(category)
      handleGetEventCategories()
    }
  }, [])

  const handleGetAllEvents = (page: number, category: string) => {
    getAllEvents(page, category)
      .then((res) => {
        setEvents(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  const handleGetEventsCount = (category: string) => {
    getEventsCount(category)
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
    handleGetAllEvents(newPage, category)
  }

  const handleSelectCategory = (event) => {
    const newCategory = event.target.value
    setCategory(newCategory)
    handleGetAllEvents(1, newCategory)
    handleGetEventsCount(newCategory)
    setPage(1)
  }

  const divisionAndCeiling = (value) => {
    return Math.ceil(value / 10)
  }

  const handleIncreasePage = () => {
    if (page < divisionAndCeiling(eventsCount)) {
      setPage(page + 1)
      handleGetAllEvents(page + 1, category)
    }
  }

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1)
      handleGetAllEvents(page - 1, category)
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
              onClick: (event) => console.log(event.target.value),
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
