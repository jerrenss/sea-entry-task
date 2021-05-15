import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import { isLoggedInUser } from '../../services/auth'

const UserRoute = (props) => {
  const { children } = props
  const [user, setUser] = useState(null)

  useEffect(() => {
    isLoggedInUser()
      .then((res) => {
        setUser(true)
      })
      .catch((err) => {
        setUser(false)
      })
  }, [])

  const redirect = () => {
    if (user) {
      return children
    } else {
      return <Error statusCode={401} title="Unauthorized access" />
    }
  }

  return user !== null && <> {redirect()} </>
}

export default UserRoute
