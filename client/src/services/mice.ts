import { AxiosError } from 'axios'
import { apiClient } from '../config'
import { TableData } from '../types'

interface MICE {
  MICEFacilities?: TableData
  MICEWeddingPackages?: TableData
}

type MICEResponseData = {
  _id?: string
  MICEDocument: MICE
}

/* Axios call for MICE Facilities */
const getMICEFacilitiesById = async (miceId: string) => {
  try {
    const response = await apiClient.get(`/MICE-id/${miceId}`)
    const data: MICEResponseData = response.data
    return data.MICEDocument.MICEFacilities
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getMICEFacilitiesByUser = async (userId: string) => {
  try {
    const response = await apiClient.get(`/MICE-user/${userId}`)
    const data: MICEResponseData = response.data
    return data.MICEDocument.MICEFacilities
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

/* Axios call for MICE Wedding Packages */
const getMICEWeddingPackagesById = async (
  miceId: string,
): Promise<TableData> => {
  try {
    const response = await apiClient.get(`/MICE-id/${miceId}`)
    const data: MICEResponseData = response.data
    return data.MICEDocument.MICEWeddingPackages
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const getMICEWeddingPackagesByUser = async (userId: string) => {
  try {
    const response = await apiClient.get(`/MICE-user/${userId}`)
    const data: MICEResponseData = response.data
    return data.MICEDocument.MICEWeddingPackages
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

/* Update MICE data in either table */
//takes in an object containing the fields to update
const updateMICEByUser = async (mice, userId: string) => {
  try {
    const response = await apiClient.put(`/update-MICE-user/${userId}`, mice)
    const data = response.data
    return data.MICE
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

const updateMICEById = async (mice, miceId: string) => {
  try {
    const response = await apiClient.put(`/update-MICE-user/${miceId}`, mice)
    const data = response.data
    return data.MICE
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
    throw err
  }
}

export default {
  getMICEFacilitiesByUser,
  getMICEWeddingPackagesByUser,
  getMICEFacilitiesById,
  getMICEWeddingPackagesById,
  updateMICEByUser,
  updateMICEById,
}
