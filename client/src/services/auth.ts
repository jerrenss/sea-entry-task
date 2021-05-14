import { apiClient } from '../config'

interface LoginInput {
  username: string
  password: string
}

export const loginUser = (credentials: LoginInput) => {
  return apiClient.post(`/users/login`, credentials)
}
