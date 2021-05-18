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

export const getAllEvents = (page: number, category: string) => {
  return apiClient.get(`/events?page=${page}&category=${category}`)
}

export const getEventsCount = (category: string) => {
  return apiClient.get(`/events/count?category=${category}`)
}

export const getEventCategories = () => {
  return apiClient.get(`/events/categories`)
}

export const getSingleEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}`)
}
