import { apiClient } from '../config'

interface LoginInput {
  username: string
  password: string
}

export const loginUser = (credentials: LoginInput) => {
  return apiClient.post(`/users/login`, credentials)
}

export const signoutUser = () => {
  return apiClient.get(`/users/signout`)
}

export const isLoggedInUser = () => {
  return apiClient.get(`/auth/user`)
}

export const isLoggedInAdmin = () => {
  return apiClient.get(`/auth/admin`)
}
