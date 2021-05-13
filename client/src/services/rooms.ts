import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { ContentType, TableData } from '../types'

interface Room {
  roomTypes?: TableData
  roomAmenitiesDescription?: TableData
  roomFloorPlan?: any
}

type RoomsResponseData = {
  _id?: string
  room: Room
}

/* Axios calls for Room Types */
const getRoomTypesById = async (roomTypeId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/room-id/${roomTypeId})`)
    const data: RoomsResponseData = response.data
    return data.room.roomTypes
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getRoomTypesByUser = async (userId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/room-user/${userId}`)
    const data: RoomsResponseData = response.data
    return data.room.roomTypes
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

/* Axios calls for Room Amenities Description */
const getRoomAmenitiesDescriptionById = async (
  roomTypeId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/room-id/${roomTypeId})`)
    const data: RoomsResponseData = response.data
    return data.room.roomAmenitiesDescription
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getRoomAmenitiesDescriptionByUser = async (
  userId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/room-user/${userId}`)
    const data: RoomsResponseData = response.data
    return data.room.roomAmenitiesDescription
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getRoomFloorPlanById = async (roomFloorPlanId: string) => {
  try {
    const response = await apiClient.get(`/room-id/${roomFloorPlanId}`)
    const data: RoomsResponseData = response.data
    return data.room.roomFloorPlan
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getRoomFloorPlanByUser = async (userId: string) => {
  try {
    const response = await apiClient.get(`/room-user/${userId}`)
    const data: RoomsResponseData = response.data
    return data.room.roomFloorPlan
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

/* Update data in database for both with the same method */
const updateRoomsById = async (rooms, roomsId: string) => {
  try {
    const response = await apiClient.put(`/update-room-user/${roomsId}`, rooms)
    const data = response.data
    return data.room
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateRoomsByUser = async (rooms, userId: string) => {
  try {
    const response = await apiClient.put(`/update-room-user/${userId}`, rooms)
    const data = response.data
    return data.room
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

export default {
  getRoomTypesById,
  getRoomTypesByUser,
  getRoomAmenitiesDescriptionById,
  getRoomAmenitiesDescriptionByUser,
  getRoomFloorPlanById,
  getRoomFloorPlanByUser,
  updateRoomsByUser,
  updateRoomsById,
}
