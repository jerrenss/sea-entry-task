import React from 'react'
import Layout from '../../components/Layout'
import Form from './Form'
import AdminRoute from '../../components/Authentication/AdminRoute'

const CreateEvent: React.FC = () => {
  return (
    <AdminRoute>
      <Layout>
        <Form />
      </Layout>
    </AdminRoute>
  )
}

export default CreateEvent
