import { apiClient } from '../config'

export const getEventLikes = (eventId: string) => {
  return apiClient.get(`/likes/event/${eventId}`)
}
