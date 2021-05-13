import { AxiosError } from 'axios'
import { apiClient } from '../config'

interface Profile {
  _id?: string
  chatPersonaName?: string
  chatAvatar?: string
  hotelLogo?: string
  brandTemplatePrimary?: string
  brandTemplateSecondary?: any
}

interface Profiles {
  profile: Profile
}

const getProfileById = async (profileId: string): Promise<Profiles> => {
  try {
    const response = await apiClient.get<Profiles>(`/profile-id/${profileId}`)
    return response.data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getProfileByUser = async (userId: string): Promise<Profiles> => {
  try {
    const response = await apiClient.get<Profiles>(`/profile-user/${userId}`)
    return response.data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateProfileByUser = async (profile: any, userId: string) => {
  try {
    const response = await apiClient.put(
      `/update-profile-user/${userId}`,
      profile,
    )
    return response.data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getProfileById,
  getProfileByUser,
  updateProfileByUser,
}
