import { apiClient } from '../config'

interface CreateUserInput {
  first_name: string
  last_name: string
  username: string
  password: string
  is_admin: boolean
}

export const createUser = (createUserInput: CreateUserInput) => {
  return apiClient.post(`/users/create`, createUserInput)
}

export const getSingleUser = () => {
  return apiClient.get(`/users/current`)
}
