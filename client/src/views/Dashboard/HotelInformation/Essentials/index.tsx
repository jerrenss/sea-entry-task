import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import hotelInformationService from '../../../../services/hotelInformation'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import ESSENTIALS_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import integrationService from '../../../../services/integration'
import { renderSpecialColumn } from '../../../../utils'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Essentials'
const modalDetails: ModalDetails = ESSENTIALS_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const Essentials: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [essentials, setEssentials] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    hotelInformationService.getHotelInformationByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.essentials.headers)
      setHeaders(updatedHeaders)
      setEssentials(data.essentials.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, essentials)
  }, [headers, essentials])

  const populateTable = (
    headers: HeaderComponents[],
    essentials: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, essentials)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateEssentials = (data) => {
    setLoading(true)
    const essentialsValues = getTableValues(data)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'essentials.content': essentialsValues },
        userId,
      )
      .then((updatedData) => {
        setEssentials(updatedData.essentials.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL ESSENTIALS'))
      // .then(() =>
      //   integrationService.getMerchantCollectionDocuments(
      //     '5f9f71d1bbd1cb00226973bb',
      //     'Test',
      //   ),
      // )
      // .then((resp) => {
      //   const result = []
      //   resp.forEach((item) => {
      //     result.push(item.objectId)
      //   })
      //   console.log(result)
      //   return result
      // })
      // .then((result) => {
      //   integrationService.clearMerchantCollection(
      //     result,
      //     '5f9f71d1bbd1cb00226973bb',
      //     'Test',
      //   )
      // })
      // .then(() =>
      //   integrationService.updateMerchantCollection(
      //     data,
      //     '5f9f71d1bbd1cb00226973bb',
      //     'Test',
      //   ),
      // )
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'essentials.headers': headers, 'essentials.content': content },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.essentials.headers))
        setEssentials(updatedData.essentials.content)
      })
      .then(() =>
        activityService.addActivity('UPDATE HOTEL ESSENTIALS HEADERS'),
      )
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={essentials}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateEssentials}
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default Essentials
