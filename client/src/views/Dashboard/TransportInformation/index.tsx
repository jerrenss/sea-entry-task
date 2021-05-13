import React, { useEffect, useState } from 'react'
import transportInformationService from '../../../services/transport'
import Layout from '../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../types'
import { VCPUserObjectID } from '../const'
import TRANSPORT_INFORMATION_MODAL_DETAILS from './const'
import UserRoute from '../../../components/Authentication/UserRoute'
import activityService from '../../../services/activity'
import { renderSpecialColumn } from '../../../utils'

// define constants
const userId: string = VCPUserObjectID
const tableTitle: string = 'Transport Information'
const modalDetails: ModalDetails = TRANSPORT_INFORMATION_MODAL_DETAILS

const TransportInformation: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [transportInformation, setTransportInformation] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    transportInformationService
      .getTransportInformationByUser(userId)
      .then((data) => {
        const updatedHeaders = renderSpecialColumn(data.headers)
        setHeaders(updatedHeaders)
        setTransportInformation(data.content)
      })
    populateTable(headers, transportInformation)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, transportInformation)
  }, [headers, transportInformation])

  const populateTable = (
    headers: HeaderComponents[],
    transportInformation: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, transportInformation)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateTransportInformation = (data) => {
    setLoading(true)
    const transportInformationValues = { content: getTableValues(data) }
    transportInformationService
      .updateTransportInformationByUser(transportInformationValues, userId)
      .then((updatedData) => {
        setTransportInformation(updatedData.content)
      })
      .then(() => activityService.addActivity('UPDATE TRANSPORT'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    transportInformationService
      .updateTransportInformationByUser(
        {
          headers: headers,
          content: content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.headers))
        setTransportInformation(updatedData.content)
      })
      .then(() => activityService.addActivity('UPDATE TRANSPORT HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={'Transport Information'} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={transportInformation}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateTransportInformation}
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default TransportInformation
