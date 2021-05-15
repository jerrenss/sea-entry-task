import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import { isLoggedInAdmin } from '../../services/auth'

const AdminRoute = (props) => {
  const { children } = props
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    isLoggedInAdmin()
      .then((res) => {
        setAdmin(true)
      })
      .catch((err) => {
        setAdmin(false)
      })
  }, [])

  const redirect = () => {
    if (admin) {
      return children
    } else {
      return <Error statusCode={401} title="Unauthorized access" />
    }
  }

  return admin !== null && <> {redirect()} </>
}

export default AdminRoute
