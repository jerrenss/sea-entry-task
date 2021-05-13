import React, { useEffect, useState } from 'react'
import nearbyService from '../../../../services/nearby'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import NEARBY_FOOD_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import { renderSpecialColumn } from '../../../../utils'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Nearby Food'
const modalDetails: ModalDetails = NEARBY_FOOD_MODAL_DETAILS

const NearbyFood: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [nearbyFood, setNearbyFood] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    nearbyService.getNearbyFoodByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setNearbyFood(data.content)
    })
    populateTable(headers, nearbyFood)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, nearbyFood)
  }, [headers, nearbyFood])

  const populateTable = (
    headers: HeaderComponents[],
    nearbyFood: string[][],
  ) => {
    // get the keys from the headers for zipping with Food array
    const tableInfo = populateTableHelper(headers, nearbyFood)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateNearbyFood = (data) => {
    setLoading(true)
    const nearbyFoodValues = getTableValues(data)
    nearbyService
      .updateNearbyByUser({ 'nearbyFood.content': nearbyFoodValues }, userId)
      .then((updatedData) => {
        setNearbyFood(updatedData.nearbyFood.content)
      })
      .then(() => activityService.addActivity('UPDATE NEARBY FOOD'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    nearbyService
      .updateNearbyByUser(
        {
          'nearbyFood.headers': headers,
          'nearbyFood.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.nearbyFood.headers))
        setNearbyFood(updatedData.nearbyFood.content)
      })
      .then(() => activityService.addActivity('UPDATE NEARBY FOOD HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={'Nearby Food'} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={nearbyFood}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateNearbyFood}
          uploadRef="name"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default NearbyFood
