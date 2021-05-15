// import React, { useState, useEffect } from 'react'
// import { isUser, isAdmin } from '../../services/authentication'
// import Error from 'next/error'

// const UserRoute = (props) => {
//   const { children } = props
//   const [admin, setAdmin] = useState(null)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     setAdmin(isAdmin())
//     setUser(isUser())
//   }, [])

//   const redirect = (admin, user) => {
//     if (admin || user) {
//       return children
//     } else {
//       return <Error statusCode={403} title="Unauthorized access" />
//     }
//   }

//   return admin !== null && user !== null && <> {redirect(admin, user)} </>
// }

// export default UserRoute

import React from 'react'
const Temp: React.FC = (props) => {
  return <h1>Temp</h1>
}

export default Temp
