import { apiClient } from '../config'

export const getEventLikes = (eventId: string) => {
  return apiClient.get(`/likes/event/${eventId}`)
}

export const createLike = (eventId: string) => {
  return apiClient.get(`/likes/create/${eventId}`)
}

export const deleteLike = (eventId: string) => {
  return apiClient.delete(`/likes/delete/${eventId}`)
}
