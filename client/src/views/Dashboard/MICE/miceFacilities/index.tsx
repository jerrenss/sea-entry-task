import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import miceService from '../../../../services/mice'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import MICE_FACILITIES_MODAL_DETAILS from './const'
import { renderSpecialColumn } from '../../../../utils'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'MICE Facilities'
const modalDetails: ModalDetails = MICE_FACILITIES_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const MICEFacilities: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [MICEFacilities, setMICEFacilities] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    miceService.getMICEFacilitiesByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setMICEFacilities(data.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, MICEFacilities)
  }, [headers, MICEFacilities])

  const populateTable = (
    headers: HeaderComponents[],
    MICEFacilities: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, MICEFacilities)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateMICEFacilities = (data) => {
    setLoading(true)
    const MICEFacilitiesValues = getTableValues(data)
    miceService
      .updateMICEByUser(
        { 'MICEFacilities.content': MICEFacilitiesValues },
        userId,
      )
      .then((updatedData) => {
        console.log('updatedData', updatedData)
        setMICEFacilities(updatedData.MICEFacilities.content)
      })
      .then(() => activityService.addActivity('UPDATE MICE FACILITIES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    miceService
      .updateMICEByUser(
        {
          'MICEFacilities.headers': headers,
          'MICEFacilities.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.MICEFacilities.headers))
        setMICEFacilities(updatedData.MICEFacilities.content)
      })
      .then(() => activityService.addActivity('UPDATE MICE FACILITIES HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={MICEFacilities}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateMICEFacilities}
          uploadRef="venueName"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default MICEFacilities
