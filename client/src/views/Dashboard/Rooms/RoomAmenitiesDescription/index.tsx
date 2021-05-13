import React, { useEffect, useState } from 'react'
import roomsService from '../../../../services/rooms'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import ROOM_AMENITIES_DESCRIPTION_MODAL_DETAILS from './const'
import { renderSpecialColumn } from '../../../../utils'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Room Amenities Description'
const modalDetails: ModalDetails = ROOM_AMENITIES_DESCRIPTION_MODAL_DETAILS

const RoomAmenitiesDescription: React.FC = (props) => {
  const [headers, setHeaders] = useState([])
  const [roomAmenitiesDescription, setRoomAmenitiesDescription] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    roomsService.getRoomAmenitiesDescriptionByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setRoomAmenitiesDescription(data.content)
    })
    populateTable(headers, roomAmenitiesDescription)
    setLoading(false)
  }, [])

  useEffect(() => {
    populateTable(headers, roomAmenitiesDescription)
  }, [headers, roomAmenitiesDescription])

  const populateTable = (
    headers: HeaderComponents[],
    roomAmenitiesDescription: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, roomAmenitiesDescription)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateRoomAmenitiesDescription = (data) => {
    setLoading(true)
    const roomAmenitiesDescriptionValues = getTableValues(data)
    roomsService
      .updateRoomsByUser(
        {
          'roomAmenitiesDescription.content': roomAmenitiesDescriptionValues,
        },
        userId,
      )
      .then((updatedData) => {
        setRoomAmenitiesDescription(
          updatedData.roomAmenitiesDescription.content,
        )
      })
      .then(() =>
        activityService.addActivity('UPDATE ROOM AMENITIES DESCRIPTION'),
      )
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    roomsService
      .updateRoomsByUser(
        {
          'roomAmenitiesDescription.headers': headers,
          'roomAmenitiesDescription.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(
          renderSpecialColumn(updatedData.roomAmenitiesDescription.headers),
        )
        setRoomAmenitiesDescription(
          updatedData.roomAmenitiesDescription.content,
        )
      })
      .then(() =>
        activityService.addActivity(
          'UPDATE ROOM AMENITIES DESCRIPTION HEADERS',
        ),
      )
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={roomAmenitiesDescription}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateRoomAmenitiesDescription}
          uploadRef="item"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default RoomAmenitiesDescription
