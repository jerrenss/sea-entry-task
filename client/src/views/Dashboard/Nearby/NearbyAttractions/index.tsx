import React, { useEffect, useState } from 'react'
import nearbyService from '../../../../services/nearby'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import NEARBY_ATTRACTIONS_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import { renderSpecialColumn } from '../../../../utils'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Nearby Attractions'
const modalDetails: ModalDetails = NEARBY_ATTRACTIONS_MODAL_DETAILS

const NearbyAttractions: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [nearbyAttractions, setNearbyAttractions] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    nearbyService.getNearbyAttractionsByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setNearbyAttractions(data.content)
    })
    populateTable(headers, nearbyAttractions)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, nearbyAttractions)
  }, [headers, nearbyAttractions])

  const populateTable = (
    headers: HeaderComponents[],
    NearbyAttractions: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, NearbyAttractions)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateNearbyAttractions = (data) => {
    setLoading(true)
    const nearbyAttractionsValues = getTableValues(data)
    nearbyService
      .updateNearbyByUser(
        { 'nearbyAttractions.content': nearbyAttractionsValues },
        userId,
      )
      .then((updatedData) => {
        setNearbyAttractions(updatedData.nearbyAttractions.content)
      })
      .then(() => activityService.addActivity('UPDATE NEARBY ATTRACTIONS'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    nearbyService
      .updateNearbyByUser(
        {
          'nearbyAttractions.headers': headers,
          'nearbyAttractions.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.nearbyAttractions.headers))
        setNearbyAttractions(updatedData.nearbyAttractions.content)
      })
      .then(() =>
        activityService.addActivity('UPDATE NEARBY ATTRACTIONS HEADERS'),
      )
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={nearbyAttractions}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateNearbyAttractions}
          uploadRef="name"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default NearbyAttractions
