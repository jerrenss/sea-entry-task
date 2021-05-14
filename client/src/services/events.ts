import { apiClient } from '../config'

export const getAllEvents = () => {
  return apiClient.get(`/events`)
}

export const getSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}`)
}
