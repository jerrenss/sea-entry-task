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
import HOTEL_POLICIES_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import { renderSpecialColumn } from '../../../../utils'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Hotel Policies'
const modalDetails: ModalDetails = HOTEL_POLICIES_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const HotelPolicies: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [hotelPolicies, setHotelPolicies] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    hotelInformationService.getHotelInformationByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.policies.headers)
      setHeaders(updatedHeaders)
      setHotelPolicies(data.policies.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, hotelPolicies)
  }, [headers, hotelPolicies])

  const populateTable = (headers: HeaderComponents[], policies: string[][]) => {
    // get the keys from the headers for zipping with policies array
    const tableInfo = populateTableHelper(headers, policies)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateHotelPolicies = (data) => {
    setLoading(true)
    const hotelPoliciesValues = getTableValues(data)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'policies.content': hotelPoliciesValues },
        userId,
      )
      .then((updatedData) => {
        setHotelPolicies(updatedData.policies.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL POLICIES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'policies.headers': headers, 'policies.content': content },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.policies.headers))
        setHotelPolicies(updatedData.policies.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL POLICIES HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={hotelPolicies}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateHotelPolicies}
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default HotelPolicies
