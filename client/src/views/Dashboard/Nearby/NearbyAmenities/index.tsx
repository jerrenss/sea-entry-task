import React, { useEffect, useState } from 'react'
import nearbyService from '../../../../services/nearby'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import NEARBY_AMENITIES_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import { renderSpecialColumn } from '../../../../utils'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Nearby Amenities'
const modalDetails: ModalDetails = NEARBY_AMENITIES_MODAL_DETAILS

const NearbyAmenities: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [nearbyAmenities, setNearbyAmenities] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    nearbyService.getNearbyAmenitiesByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setNearbyAmenities(data.content)
    })
    populateTable(headers, nearbyAmenities)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, nearbyAmenities)
  }, [headers, nearbyAmenities])

  const populateTable = (
    headers: HeaderComponents[],
    nearbyAmenities: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, nearbyAmenities)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateNearbyAmenities = (data) => {
    setLoading(true)
    const nearbyAmenitiesValues = getTableValues(data)
    nearbyService
      .updateNearbyByUser(
        { 'nearbyAmenities.content': nearbyAmenitiesValues },
        userId,
      )
      .then((updatedData) => {
        setNearbyAmenities(updatedData.nearbyAmenities.content)
      })
      .then(() => activityService.addActivity('UPDATE NEARBY AMENITIES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    nearbyService
      .updateNearbyByUser(
        {
          'nearbyAmenities.headers': headers,
          'nearbyAmenities.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.nearbyAmenities.headers))
        setNearbyAmenities(updatedData.nearbyAmenities.content)
      })
      .then(() =>
        activityService.addActivity('UPDATE NEARBY AMENITIES HEADERS'),
      )
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={'Nearby Amenities'} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={nearbyAmenities}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateNearbyAmenities}
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default NearbyAmenities
