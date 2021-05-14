import { apiClient } from '../config'

export const getEventRegistrations = (eventId: string) => {
  return apiClient.get(`/registers/event/${eventId}`)
}

export const createRegistration = (eventId: string) => {
  return apiClient.get(`/registers/create/${eventId}`)
}

export const deleteRegistration = (eventId: string) => {
  return apiClient.delete(`/registers/delete/${eventId}`)
}
