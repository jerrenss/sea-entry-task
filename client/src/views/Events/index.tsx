import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialTable from 'material-table'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({}))

const Events: React.FC = (props) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Layout>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Title', field: 'title' },
          { title: 'Event Date', field: 'eventDate' },
          { title: 'Location', field: 'location' },
          { title: 'Category', field: 'category' },
        ]}
        data={[
          {
            id: '1',
            title: 'SunNUS',
            eventDate: '2021-05-20',
            location: 'Sentosa Silosa Beach',
            category: 'Sports',
          },
          {
            id: '2',
            title: 'ZoukOut',
            eventDate: '2021-06-20',
            location: 'Sentosa Palawan Beach',
            category: 'Social',
          },
          {
            id: '3',
            title: 'Zumba',
            eventDate: '2021-05-23',
            location: 'Vivocity Rooftop Garden',
            category: 'Sports',
          },
          {
            id: '4',
            title: 'Piano Concert',
            eventDate: '2021-06-01',
            location: 'Victoria Concert Hall',
            category: 'Music',
          },
          {
            id: '5',
            title: 'NUS Inter-Hall Games',
            eventDate: '2021-06-01',
            location: 'NUS Field 1',
            category: 'Sports',
          },
          {
            id: '6',
            title: 'NTU Inter-Hall Games',
            eventDate: '2021-06-07',
            location: 'NTU Steven Wee Area',
            category: 'Sport',
          },
          {
            id: '7',
            title: 'Biological Sciences Field Trip',
            eventDate: '2021-05-28',
            location: 'Bukit Timah Nature Reserve',
            category: 'Education',
          },
          {
            id: '8',
            title: 'Academic Day',
            eventDate: '2021-06-01',
            location: 'NUS Utown Auditorium 2',
            category: 'Education',
          },
        ]}
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
