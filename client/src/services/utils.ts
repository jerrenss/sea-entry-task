import { AxiosError } from 'axios'
import { apiClient } from '../config'

/* Axios calls for all Utility Functions */

const uploadImageTable = async (formContent) => {
  try {
    const response = await apiClient.post(`/upload-image-table`, formContent)
    const data = response.data
    return data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const deleteS3Item = async (objectKey: string) => {
  try {
    const response = await apiClient.post(`/delete-S3-item`, {
      objectKey: objectKey,
    })
    const data = response.data
    return data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getCollectionsInfo = async (): Promise<any> => {
  try {
    const response = await apiClient.get(`/getCollectionsInfo`)
    const info = response.data
    return info
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  uploadImageTable,
  deleteS3Item,
  getCollectionsInfo,
}
