import React, { useEffect, useState } from 'react'
import UserRoute from '../../../../components/Authentication/UserRoute'
import Layout from '../../../../components/Layout'
import Table, {
  getTableValues,
  populateTableHelper,
} from '../../../../components/Table'
import roomsService from '../../../../services/rooms'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { renderSpecialColumn } from '../../../../utils'
import { VCPUserObjectID } from '../../const'
import ROOM_TYPES_MODAL_DETAILS from './const'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Room Types'
const modalDetails: ModalDetails = ROOM_TYPES_MODAL_DETAILS

const RoomTypes: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    roomsService.getRoomTypesByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setRoomTypes(data.content)
    })
    populateTable(headers, roomTypes)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, roomTypes)
  }, [headers, roomTypes])

  const populateTable = (
    headers: HeaderComponents[],
    roomTypes: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, roomTypes)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateRoomTypes = (data) => {
    setLoading(true)
    const roomTypesValues = getTableValues(data)
    roomsService
      .updateRoomsByUser({ 'roomTypes.content': roomTypesValues }, userId)
      .then((updatedData) => {
        setRoomTypes(updatedData.roomTypes.content)
      })
      .then(() => activityService.addActivity('UPDATE ROOM TYPES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    roomsService
      .updateRoomsByUser(
        { 'roomTypes.headers': headers, 'roomTypes.content': content },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.roomTypes.headers))
        setRoomTypes(updatedData.roomTypes.content)
      })
      .then(() => activityService.addActivity('UPDATE ROOM TYPES HEADERS'))
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={roomTypes}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateRoomTypes}
          uploadRef="type"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default RoomTypes
