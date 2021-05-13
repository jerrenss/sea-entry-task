import { AxiosError } from 'axios'
import { vouchApiClient } from '../config'
import { JWTResponse } from '../types'

export const getJWTToken = async (sso_ticket: Object): Promise<JWTResponse> => {
  try {
    const response = await vouchApiClient.post(
      '/v2/employees/sso/ticket/activate',
      sso_ticket,
    )
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

export const getVCPUserData = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('VCPUserData')) {
      return JSON.parse(localStorage.getItem('VCPUserData'))
    }
  }
}

export const getVCPJWT = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('VCPJWT')) {
      return localStorage.getItem('VCPJWT')
    }
  }
}

export const getVCPUserObjectID = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('VCPUserObjectID')) {
      return localStorage.getItem('VCPUserObjectID')
    }
  }
}

export const getHotelName = () => {
  const VCPUserData: any = getVCPUserData()
  if (isAdmin()) {
    return getAdminViewMode()
  } else {
    return VCPUserData?.merchant?.companyName || 'Not Logged In'
  }
}

export const getAdminViewMode = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('VCPAdminViewMode')) {
      return localStorage.getItem('VCPAdminViewMode')
    }
  }
}

export const getVCPUserType = () => {
  const VCPUserData: any = getVCPUserData()
  return VCPUserData?.employee?.typeOfUser
}

export const isAdmin = (): boolean => {
  const VCPUserType: string = getVCPUserType()
  return VCPUserType === 'VCP-Admin' || VCPUserType === 'VCP-Admin-Dev'
}

export const isUser = (): boolean => {
  const VCPUserType: string = getVCPUserType()
  return VCPUserType === 'VCP-User' || VCPUserType === 'VCP-User-Dev'
}

export default {
  getJWTToken,
  getVCPUserData,
  getVCPJWT,
  getVCPUserObjectID,
  getVCPUserType,
  getAdminViewMode,
  isAdmin,
}
