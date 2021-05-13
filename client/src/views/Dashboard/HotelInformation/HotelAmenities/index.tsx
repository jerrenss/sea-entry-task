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
import HOTEL_AMENITIES_MODAL_DETAILS from './const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'
import { renderSpecialColumn } from '../../../../utils'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Hotel Amenities'
const modalDetails: ModalDetails = HOTEL_AMENITIES_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const HotelAmenities: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [hotelAmenities, setHotelAmenities] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    hotelInformationService.getHotelInformationByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.amenities.headers)
      setHeaders(updatedHeaders)
      setHotelAmenities(data.amenities.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, hotelAmenities)
  }, [headers, hotelAmenities])

  const populateTable = (
    headers: HeaderComponents[],
    amenities: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, amenities)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateHotelAmenities = (data) => {
    setLoading(true)
    const hotelAmenitiesValues = getTableValues(data)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'amenities.content': hotelAmenitiesValues },
        userId,
      )
      .then((updatedData) => {
        setHotelAmenities(updatedData.amenities.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL AMENITIES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    hotelInformationService
      .updateHotelInformationByUser(
        { 'amenities.headers': headers, 'amenities.content': content },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.amenities.headers))
        setHotelAmenities(updatedData.amenities.content)
      })
      .then(() => activityService.addActivity('UPDATE HOTEL AMENITIES HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={hotelAmenities}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateHotelAmenities}
          updateHeadersAndContent={updateHeadersAndContent}
          uploadRef="name"
        />
      </Layout>
    </UserRoute>
  )
}

export default HotelAmenities
