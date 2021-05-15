import { apiClient } from '../config'

interface CreateEventInput {
  title: string
  description: string
  event_date: string
  location: string
  category: string
}

export const createEvent = (createEventInput: CreateEventInput) => {
  return apiClient.post(`/events/create`, createEventInput)
}

export const getAllEvents = (page: number) => {
  return apiClient.get(`/events/?page=${page}`)
}

export const getEventsCount = () => {
  return apiClient.get(`/events/count`)
}

export const getSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}`)
}
