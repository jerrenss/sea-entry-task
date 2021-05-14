import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialTable from 'material-table'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../services/events'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Events: React.FC = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const [events, setEvents] = useState([])

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        setEvents(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }, [])

  return (
    <Layout>
      <MaterialTable
        options={{
          pageSize: 10,
          pageSizeOptions: [10],
        }}
        columns={[
          { title: 'ID', field: 'event_id' },
          { title: 'Title', field: 'title' },
          { title: 'Event Date', field: 'event_date' },
          { title: 'Location', field: 'location' },
          { title: 'Category', field: 'category' },
        ]}
        data={events}
        title="Events List"
        onRowClick={(event, rowData, togglePanel) => {
          console.log('Clicked: ' + rowData.id)
          router.push('/client/event')
        }}
      />
    </Layout>
  )
}

export default Events
