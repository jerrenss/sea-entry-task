import { AxiosError } from 'axios'
import { apiClient } from '../config'

const getHousekeepingById = async (housekeepingId: string) => {
  try {
    const response = await apiClient.get(`/housekeeping-id/${housekeepingId}`)
    const data = response.data
    return data.housekeeping
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getHousekeepingByUser = async (housekeepingUser: string) => {
  try {
    const response = await apiClient.get(
      `/housekeeping-user/${housekeepingUser}`,
    )
    const data = response.data
    return data.housekeeping
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateHousekeepingById = async (housekeeping, housekeepingId: string) => {
  try {
    const response = await apiClient.put(
      `/update-housekeeping-id/${housekeepingId}`,
      housekeeping,
    )
    const data = response.data
    return data.housekeeping
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const updateHousekeepingByUser = async (
  housekeeping,
  housekeepingUser: string,
) => {
  try {
    const response = await apiClient.put(
      `/update-housekeeping-user/${housekeepingUser}`,
      housekeeping,
    )
    const data = response.data
    return data.housekeeping
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getHousekeepingById,
  getHousekeepingByUser,
  updateHousekeepingById,
  updateHousekeepingByUser,
}
