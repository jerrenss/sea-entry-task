import { apiClient } from '../config'

export const getAllEvents = () => {
  return apiClient.get(`/events`)
}
