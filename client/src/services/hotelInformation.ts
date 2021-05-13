import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { TableData } from '../types'
import { getVCPJWT } from './authentication'

interface HotelInformation {
  user?: string
  general?: any
  policies?: any
  essentials?: TableData
  amenities?: TableData
  contactInformation?: TableData
}

type HotelInformationsResponseData = {
  _id?: string
  hotelInformation: HotelInformation
}

const getHotelInformationById = async (
  hotelInformationId: string,
): Promise<HotelInformation> => {
  try {
    const response = await apiClient.get(
      `/hotelInformation-id/${hotelInformationId}`,
    )
    const data: HotelInformationsResponseData = response.data
    return data.hotelInformation
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getHotelInformationByUser = async (
  userId: string,
): Promise<HotelInformation> => {
  try {
    const response = await apiClient.get(`/hotelInformation-user/${userId}`)
    const data = response.data
    return data.hotelInformation
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateHotelInformationByUser = async (
  hotelInformation,
  userId: string,
) => {
  try {
    const response = await apiClient.put(
      `/update-hotelInformation-user/${userId}`,
      hotelInformation,
    )
    const data = response.data
    return data.hotelInformation
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getHotelInformationById,
  getHotelInformationByUser,
  updateHotelInformationByUser,
}
