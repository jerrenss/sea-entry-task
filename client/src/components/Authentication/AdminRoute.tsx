import React, { useState, useEffect } from 'react'
import { isAdmin } from '../../services/authentication'
import Error from 'next/error'

const AdminRoute = (props) => {
  const { children } = props
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    setAdmin(isAdmin())
  }, [])

  const redirect = (admin) => {
    if (admin) {
      return children
    } else {
      return <Error statusCode={403} title="Unauthorized access" />
    }
  }

  return admin !== null && <> {redirect(admin)} </>
}

export default AdminRoute
