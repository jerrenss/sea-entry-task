import React, { useEffect, useState } from 'react'
import foodAndBeveragesService from '../../../../services/foodAndBeverages'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import FNB_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import { renderSpecialColumn } from '../../../../utils'

// define constants
const userId: string = VCPUserObjectID
const tableTitle: string = 'Restaurants'
const modalDetails: ModalDetails = FNB_MODAL_DETAILS

const Restaurants: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [fnb, setFnb] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    foodAndBeveragesService.getRestaurantsByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setFnb(data.content)
    })
    populateTable(headers, fnb)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, fnb)
  }, [headers, fnb])

  const populateTable = (headers: HeaderComponents[], fnb: string[][]) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, fnb)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateFnb = (data) => {
    setLoading(true)
    const fnbValues = getTableValues(data)
    foodAndBeveragesService
      .updateFoodAndBeverageByUser({ 'restaurants.content': fnbValues }, userId)
      .then((updatedData) => {
        setFnb(updatedData.restaurants.content)
      })
      .then(() => activityService.addActivity('UPDATE FNB RESTAURANTS'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    foodAndBeveragesService
      .updateFoodAndBeverageByUser(
        {
          'restaurants.headers': headers,
          'restaurants.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.restaurants.headers))
        setFnb(updatedData.restaurants.content)
      })
      .then(() => activityService.addActivity('UPDATE FNB RESTAURANTS HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={fnb}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateFnb}
          uploadRef="restaurantName"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default Restaurants
