import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { TableData } from '../types'

interface FoodAndBeverage {
  restaurants?: TableData
  inRoomDining?: TableData
}

type FoodAndBeverageResponseData = {
  _id?: string
  foodAndBeverage: FoodAndBeverage
}

const getRestaurantsById = async (
  foodAndBeverageId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(
      `/foodAndBeverage-id/${foodAndBeverageId})`,
    )
    const data: FoodAndBeverageResponseData = response.data
    return data.foodAndBeverage.restaurants
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getRestaurantsByUser = async (userId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/foodAndBeverage-user/${userId}`)
    const data: FoodAndBeverageResponseData = response.data
    return data.foodAndBeverage.restaurants
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getInRoomDiningById = async (
  foodAndBeverageId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(
      `/foodAndBeverage-id/${foodAndBeverageId})`,
    )
    const data: FoodAndBeverageResponseData = response.data
    return data.foodAndBeverage.inRoomDining
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getInRoomDiningByUser = async (userId: string): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/foodAndBeverage-user/${userId}`)
    const data: FoodAndBeverageResponseData = response.data
    return data.foodAndBeverage.inRoomDining
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateFoodAndBeverageByUser = async (
  foodAndBeverages,
  userId: string,
) => {
  try {
    const response = await apiClient.put(
      `/update-foodAndBeverage-user/${userId}`,
      foodAndBeverages,
    )
    const data = response.data
    return data.foodAndBeverage
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getRestaurantsById,
  getRestaurantsByUser,
  getInRoomDiningById,
  getInRoomDiningByUser,
  updateFoodAndBeverageByUser,
}
