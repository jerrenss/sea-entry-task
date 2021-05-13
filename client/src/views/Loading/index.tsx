import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import authenticationService, {
  getVCPUserType,
  isAdmin,
  isUser,
} from '../../services/authentication'
import integrationService from '../../services/integration'
import userService from '../../services/users'
import jwt from 'jsonwebtoken'
import { VOUCH_PORTAL_URL } from '../../config'
import activityService from '../../services/activity'
import integration from '../../services/integration'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Loading: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { sso_ticket } = router.query

  const processTicket = async (sso_ticket: String) => {
    // Process SSO ticker, converting it to a JWT token
    await authenticationService
      .getJWTToken({ SSO: sso_ticket })
      .then((response) => {
        const PUB_KEY = Buffer.from(
          JSON.parse(`"${process.env.NEXT_PUBLIC_PUB_KEY}"`),
          'utf-8',
        )
        const parsedToken = response.token.replace('v3___', '')
        jwt.verify(parsedToken, PUB_KEY, (err, decoded) => {
          if (err) {
            alert(
              'Unable to decode JWT Token. Please contact system administrator.',
            )
            router.push(`${VOUCH_PORTAL_URL}/weblogout`)
          } else {
            if (typeof window !== 'undefined') {
              localStorage.setItem('VCPJWT', parsedToken)
              localStorage.setItem('VCPUserData', JSON.stringify(decoded))
            }
            activityService.addActivity('LOGIN')
          }
        })
      })
      .catch((err) => {
        alert('Invalid Ticket. Please contact system administrator.')
        router.push(`${VOUCH_PORTAL_URL}/weblogout`)
      })

    //get and save current merchant object id
    await integrationService.getCurrentMerchantObjectId().then((response) => {
      const currMerchantObjId = response.merchants[0]._id
      if (typeof window !== 'undefined') {
        localStorage.setItem('MerchantObjectId', currMerchantObjId)
      }
    })

    // Handles routing according to user type
    const VCPUserType = getVCPUserType()
    if (VCPUserType === 'VCP-User' || VCPUserType === 'VCP-User-Dev') {
      await userService
        .getUserByUsername(
          authenticationService.getVCPUserData().merchant.companyName,
        )
        .then((response) => {
          if (!response?._id) {
            alert(
              'Hotel does not exist in database. Please contact system administrator',
            )
            router.push(`${VOUCH_PORTAL_URL}/weblogout`)
          } else {
            if (typeof window !== 'undefined') {
              localStorage.setItem('VCPUserObjectID', response?._id.toString())
            }
            router.push('/dashboard/profile')
          }
        })
    } else if (VCPUserType === 'VCP-Admin' || VCPUserType === 'VCP-Admin-Dev') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('VCPUserObjectID', '')
      }
      router.push('/admin/all-merchants')
    } else {
      router.push(`${VOUCH_PORTAL_URL}/weblogout`)
    }
  }

  if (sso_ticket && isAdmin()) {
    router.push('/admin/all-merchants')
  } else if (sso_ticket && isUser()) {
    router.push('/dashboard/profile')
  } else if (sso_ticket) {
    processTicket(sso_ticket.toString())
  }

  return (
    <Box className={classes.root}>
      <div className={classes.root}>
        <CircularProgress color="primary" size={100} />
        <Typography variant="h6">Loading...</Typography>
      </div>
    </Box>
  )
}

export default Loading
