import { AxiosError } from 'axios'
import { vouchApiClient } from '../config'

const getMerchantCollectionDocuments = async (
  merchantObjectId: string,
  collection: string,
) => {
  try {
    const response = await vouchApiClient.get(
      `v2/database/collections/vc_${merchantObjectId}_${collection}?query=%7B+%7D&order=`,
    )
    return response.data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const updateMerchantCollection = async (
  content,
  merchantObjectId: string,
  collection: string,
) => {
  try {
    const response = await vouchApiClient.post(
      `v2/database/collections/documents`,
      {
        collection: `vc_${merchantObjectId}_${collection}`,
        objects: content,
      },
    )
    return response
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const clearMerchantCollection = async (
  rows,
  merchantObjectId: string,
  collection: string,
) => {
  try {
    const response = await vouchApiClient.post(
      `v2/database/collections/documents/delete`,
      {
        col: `vc_${merchantObjectId}_${collection}`,
        selectedRows: rows,
      },
    )
    return response
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const getCurrentMerchantObjectId = async () => {
  try {
    const response = await vouchApiClient.get(`v2/employees/me`)
    return response.data
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getMerchantCollectionDocuments,
  updateMerchantCollection,
  clearMerchantCollection,
  getCurrentMerchantObjectId,
}
