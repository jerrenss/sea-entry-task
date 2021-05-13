import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialTable from 'material-table'
import Layout from '../../components/Layout'

const useStyles = makeStyles((theme) => ({}))

const Events: React.FC = (props) => {
  const classes = useStyles()

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
        ]}
        title="Events List"
      />
    </Layout>
  )
}

export default Events
