import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AdminRoute from '../../../components/Authentication/AdminRoute'
import Layout from '../../../components/Layout'
import { STG_API_URL } from '../../../config'
import userService from '../../../services/users'
import DeleteMerchantModal from './DeleteMerchantModal'
import moment from 'moment'
import { getVCPJWT } from '../../../services/authentication'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  listContainer: {
    marginTop: theme.spacing(1),
  },
  card: {
    backGroundColor: theme.palette.background.secondary,
    marginTop: theme.spacing(2.5),
  },
  hotelName: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(24),
  },
  statusText: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16),
  },
  statusComplete: {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.success.main,
  },
  statusIncomplete: {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.error.main,
  },
  buttonContainer: {
    marginBottom: theme.spacing(1),
  },
  updateBoxContainer: {
    padding: theme.spacing(1),
  },
  updateBox: {
    height: '150px',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.primary,
    borderRadius: '10px',
    overflowY: 'scroll',
  },
  updateBoxHeader: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(17),
  },
  exportButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    marginLeft: theme.spacing(1),
  },
}))

const AllMerchants: React.FC = () => {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [targetMerchant, setTargetMerchant] = useState('')
  const [deleteMerchantModalOpen, setDeleteMerchantModalOpen] = useState(false)

  const handleDeleteMerchantButtonClick = () => {
    setDeleteMerchantModalOpen(!deleteMerchantModalOpen)
    setTargetMerchant('')
  }

  // Will need to convert this fetch function to axios
  const exportData = async (objectID, name) => {
    await fetch(`${STG_API_URL}/export-excel/${objectID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getVCPJWT()}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = url
        a.download = `${name}-Information.xlsx`
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
  }

  const handleViewData = (objectID, name) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('VCPUserObjectID', objectID)
      localStorage.setItem('VCPAdminViewMode', name)
    }
    // Force reload
    window.location.href = '/dashboard/profile'
  }

  const handleDeleteMerchant = (objectID) => {
    userService
      .deleteUser(objectID)
      .then((response) => {
        loadUsers()
      })
      .catch((err) => alert('Error in deleting merchant'))
  }

  const handleInitMerchantColl = (merchantID) => {
    userService
      .initUserCollection(merchantID)
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => alert('Error in initialising merchant'))
  }

  const loadUsers = () => {
    userService
      .getAllUsers()
      .then((response) => setUsers(response))
      .catch((err) => alert(err))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <AdminRoute>
      <Layout pageTitle="All Merchants" isAdmin>
        <DeleteMerchantModal
          open={deleteMerchantModalOpen}
          onClickHandler={handleDeleteMerchantButtonClick}
          handleDeleteMerchant={handleDeleteMerchant}
          targetMerchant={targetMerchant}
        />
        <Box className={classes.root}>
          {users.map(({ _id, createdAt, name, completed }, index) => {
            return (
              <Card key={_id} className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <CardContent>
                      <Typography className={classes.hotelName}>
                        {`${index + 1}. ${name}`}
                      </Typography>
                      <Typography className={classes.statusText}>
                        {`Created: ${moment(createdAt).format(
                          'DD/MM/YYYY hh:mm A',
                        )}`}
                      </Typography>
                      <Typography
                        display="inline"
                        className={classes.statusText}
                      >
                        Status:
                      </Typography>
                      <Typography
                        display="inline"
                        className={
                          completed
                            ? classes.statusComplete
                            : classes.statusIncomplete
                        }
                      >
                        {completed ? 'Completed' : 'Incomplete'}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewData(_id, name)}
                      >
                        View Data
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => exportData(_id, name)}
                      >
                        Export Excel
                      </Button>
                      {/* <Button variant="contained" color="primary" disabled>
                        Edit Merchant
                      </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleDeleteMerchantButtonClick()
                          setTargetMerchant(_id)
                        }}
                      >
                        Delete Merchant
                      </Button>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={()=> {
                          console.log("_id:", _id)
                          handleInitMerchantColl(_id)
                        }}
                      >Initialise</Button> */}
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            )
          })}
        </Box>
      </Layout>
    </AdminRoute>
  )
}

export default AllMerchants
