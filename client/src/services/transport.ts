import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { TableData } from '../types'

type Transport = TableData

type TransportResponseData = {
  transport: Transport
}

const getTransportInformationByUser = async (
  userId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/transport-user/${userId}`)
    const data: TransportResponseData = response.data
    return data.transport
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getTransportInformationById = async (
  transportId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/transport-id/${transportId}`)
    const data: TransportResponseData = response.data
    return data.transport
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateTransportInformationByUser = async (
  transportInformation,
  userId: string,
) => {
  try {
    const response = await apiClient.put(`/update-transport-user/${userId}`, {
      headers: transportInformation.headers,
      content: transportInformation.content,
    })
    const data = response.data
    return data.transport
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const updateTransportInformationById = async (
  transportInformation,
  transportId: string,
) => {
  try {
    const response = await apiClient.put(
      `/update-transport-id/${transportId}`,
      { content: transportInformation },
    )
    const data = response.data
    return data.transport
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getTransportInformationById,
  getTransportInformationByUser,
  updateTransportInformationByUser,
  updateTransportInformationById,
}
