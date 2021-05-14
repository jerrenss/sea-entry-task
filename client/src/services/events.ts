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

export const getAllEvents = () => {
  return apiClient.get(`/events`)
}

export const getSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}`)
}
