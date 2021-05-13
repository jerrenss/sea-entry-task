import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { ContentType, TableResponseData, TableData } from '../types'

interface Nearby {
  nearbyAmenities?: TableData
  nearbyFood?: TableData
  nearbyAttractions?: TableData
}

type NearbyResponseData = {
  _id?: string
  nearby: Nearby
}

const getNearbyAmenitiesByUser = async (userId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-user/${userId}`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyAmenities
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getNearbyAmenitiesById = async (
  nearbyAmenityId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-id/${nearbyAmenityId})`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyAmenities
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getNearbyFoodByUser = async (userId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-user/${userId}`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyFood
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getNearbyFoodById = async (
  nearbyAmenityId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-id/${nearbyAmenityId})`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyFood
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getNearbyAttractionsByUser = async (
  userId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-user/${userId}`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyAttractions
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getNearbyAttractionsById = async (
  nearbyAmenityId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/nearby-id/${nearbyAmenityId})`)
    const data: NearbyResponseData = response.data
    return data.nearby.nearbyAttractions
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateNearbyByUser = async (nearbyAmenities, userId: string) => {
  try {
    const response = await apiClient.put(
      `/update-nearby-user/${userId}`,
      nearbyAmenities,
    )
    const data = response.data
    return data.nearby
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getNearbyAmenitiesById,
  getNearbyAmenitiesByUser,
  getNearbyAttractionsById,
  getNearbyAttractionsByUser,
  getNearbyFoodById,
  getNearbyFoodByUser,
  updateNearbyByUser,
}
