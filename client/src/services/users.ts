import Axios, { AxiosError } from 'axios'
import { apiClient, vouchApiClient } from '../config'

interface User {
  _id?: String
  name?: String
  completed?: Boolean
  header?: String
  profile?: String
  administration?: String
  amenities?: String
  hotelPolicies?: String
  hotelServices?: String
  roomTypes?: String
  facilities?: String
  nearbyAmenities?: String
  foodAndBeverages?: String
}

//returns a user object, queried by the userId
const getUserByUserId = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.get(`/user-id/${userId}`)
    const userData = response.data.user
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await apiClient.get(`/user-name/${username}`)
    const userData = response.data.user
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get(`/users`)
    const userData = response.data.users
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const addUser = async (merchantName: string): Promise<User> => {
  try {
    const response = await apiClient.post(`/add-user`, {
      name: merchantName,
      completed: false,
    })
    const userData = response.data.user
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const updateUserCompletion = async (
  completed: boolean,
  userId: string,
): Promise<User> => {
  try {
    const response = await apiClient.put(`/update-user/${userId}`, {
      completed,
    })
    const userData = response.data.user
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const initUserCollection = async (merchantID: string): Promise<void> => {
  try {
    // const collectionArr = [
    //   'General', 'Essentials', 'Hotel_Amenities', 'Hotel_Policies',
    //   'Contact_Information', 'Room_Types', 'Room_Amenities_Description', 'Room_Floor_Plan',
    //   'Mice_Facilities', 'Wedding_Packages', 'Restaurants', 'In-Room_Dining', 'Housekeeping',
    //   'Nearby_Amenities', 'Nearby_Food', 'Nearby_Attractions', 'Transport_Information']

    //From Unified Bot
    const collectionArr = [
      'Contact_Information',
      'Facilities',
      'Feedback',
      'Hotel_Info',
      'Hotel_Policies',
      'HousekeepingItems',
      'HousekeepingRequests',
      'Mice_Packages',
      'NearbyAmenities',
      'Restaurants',
      'RoomFaultsCode',
      'RoomFaultsRequests',
      'RoomServiceRequests',
      'Rooms',
      'Singapore_Attractions',
      'Transport',
      'Venues',
      'Weddings',
    ]

    collectionArr.map((name) =>
      vouchApiClient.post(
        `/v2/database/collections`,
        { collection: name, engine: 'parse' },
        { headers: { 'Content-Type': 'application/json' } },
      ),
    )

    // console.log(collectionArr)

    Axios.all(collectionArr).then(
      Axios.spread((...responses) => {
        // responses.forEach(response => console.log(response))
        console.log('All inserted')
      }),
    )
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const deleteUser = async (merchantName: string): Promise<User> => {
  try {
    const response = await apiClient.delete(`/deleteUser/${merchantName}`)
    const userData = response.data.user
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getUserByUserId,
  getUserByUsername,
  getAllUsers,
  updateUserCompletion,
  addUser,
  deleteUser,
  initUserCollection,
}
