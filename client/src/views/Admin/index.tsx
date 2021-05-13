import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../components/Layout'
import Form from './Form'

const useStyles = makeStyles((theme) => ({}))

const CreateEvent: React.FC = (props) => {
  const classes = useStyles()

  return (
    <Layout>
      <Form />
    </Layout>
  )
}

export default CreateEvent
