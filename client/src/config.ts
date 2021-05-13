import axios from 'axios'
import { getVCPJWT } from './services/authentication'
export const STG_API_URL: string = process.env.NEXT_PUBLIC_STG_API_URL
export const DEV_API_URL: string = process.env.NEXT_PUBLIC_DEV_API_URL
export const VOUCH_MGMT_URL: string = process.env.NEXT_PUBLIC_VOUCH_MGMT_URL
export const VOUCH_PORTAL_URL: string = process.env.NEXT_PUBLIC_VOUCH_PORTAL_URL

export const apiClient = axios.create({
  baseURL: STG_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getVCPJWT()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const vouchApiClient = axios.create({
  baseURL: VOUCH_MGMT_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

vouchApiClient.interceptors.request.use((config) => {
  const token = getVCPJWT()
  if (token) {
    config.headers['x-access-token'] = `v3___${token}`
  }
  return config
})
