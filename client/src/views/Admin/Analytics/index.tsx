import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import AdminRoute from '../../../components/Authentication/AdminRoute'
import MaterialTable from 'material-table'
import activityService from '../../../services/activity'
import utilsService from '../../../services/utils'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { Box, makeStyles } from '@material-ui/core'
import converter from 'json-2-csv'
import { downloadCsv } from '../../../utils'

const pageTitle: string = 'Analytics'

interface TableFormatProps {
  columns: Object[]
  data: Object[]
  tableTitle: string
  pagination: number
  handleRefreshTable: () => void
}

const TableFormat: React.FC<TableFormatProps> = (props) => {
  const { columns, data, tableTitle, pagination, handleRefreshTable } = props
  const options = {
    pageSize: pagination,
    exportButton: { csv: true },
    exportAllData: true,
    exportCsv: (columns, data) => {
      const dataRows = data.map(({ tableData, ...row }) => ({
        ...row,
      }))
      converter.json2csv(dataRows, (err, csv) => {
        if (err) {
          throw err
        }
        downloadCsv(csv, tableTitle)
      })
    },
    sorting: true,
    headerStyle: {
      fontSize: 16,
      fontWeight: 700,
    },
  }
  return (
    <MaterialTable
      title={tableTitle}
      options={options}
      columns={columns}
      data={data}
      style={{ overflowX: 'scroll' }}
      actions={[
        {
          icon: () => <AutorenewIcon />,
          tooltip: 'Refresh',
          position: 'toolbar',
          onClick: handleRefreshTable,
        },
      ]}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}))

const Analytics: React.FC = (props) => {
  const classes = useStyles()
  const [activityData, setActivityData] = useState([])
  const [collectionsData, setCollectionsData] = useState([])

  const fetchActivity = () => {
    activityService
      .getAllActivity()
      .then((response) => {
        setActivityData(response)
      })
      .catch((err) => alert(err))
  }

  const fetchCollections = () => {
    utilsService
      .getCollectionsInfo()
      .then((response) => {
        const keys = Object.keys(response)
        const values = Object.values(response)
        const result = []
        for (let i = 0; i < keys.length; i++) {
          result.push({ collection: keys[i], documentCount: values[i] })
        }
        setCollectionsData(result)
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    fetchActivity()
    fetchCollections()
  }, [])

  const handleRefreshActivityTable = () => {
    fetchActivity()
  }

  const handleRefreshCollectionsTable = () => {
    fetchCollections()
  }

  const activityColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Role', field: 'role' },
    { title: 'Email', field: 'email' },
    { title: 'Merchant', field: 'merchant' },
    { title: 'Action', field: 'action' },
    {
      title: 'Date & Time',
      field: 'dateTime',
    },
  ]

  const collectionsColumns = [
    { title: 'Collection Name', field: 'collection' },
    { title: 'Document Count', field: 'documentCount' },
  ]

  return (
    <AdminRoute>
      <Layout pageTitle={pageTitle} isAdmin>
        <Box className={classes.root}>
          <TableFormat
            columns={activityColumns}
            data={activityData}
            tableTitle="Activity Log"
            pagination={10}
            handleRefreshTable={handleRefreshActivityTable}
          />
        </Box>
        <Box className={classes.root}>
          <TableFormat
            columns={collectionsColumns}
            data={collectionsData}
            tableTitle="Database Collections"
            pagination={5}
            handleRefreshTable={handleRefreshCollectionsTable}
          />
        </Box>
      </Layout>
    </AdminRoute>
  )
}

export default Analytics
