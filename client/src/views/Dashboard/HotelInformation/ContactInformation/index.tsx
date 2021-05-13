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
import HOTEL_CONTACT_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import { renderSpecialColumn } from '../../../../utils'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Contact Information'
const modalDetails: ModalDetails = HOTEL_CONTACT_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const ContactInformation: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [contactInformation, setContactInformation] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    hotelInformationService.getHotelInformationByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(
        data.contactInformation.headers,
      )
      setHeaders(updatedHeaders)
      setContactInformation(data.contactInformation.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, contactInformation)
  }, [headers, contactInformation])

  const populateTable = (
    headers: HeaderComponents[],
    contactInformation: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, contactInformation)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateContactInformation = (data) => {
    setLoading(true)
    const contactInformationValues = getTableValues(data)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'contactInformation.content': contactInformationValues },
        userId,
      )
      .then((updatedData) => {
        setContactInformation(updatedData.contactInformation.content)
      })
      .then(() =>
        activityService.addActivity('UPDATE HOTEL CONTACT INFORMATION'),
      )
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    hotelInformationService
      .updateHotelInformationByUser(
        {
          'contactInformation.headers': headers,
          'contactInformation.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.contactInformation.headers))
        setContactInformation(updatedData.contactInformation.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL CONTACT HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={contactInformation}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateContactInformation}
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default ContactInformation
