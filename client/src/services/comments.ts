import { apiClient } from '../config'

interface CreateCommentInput {
  event_id: number
  content: string
}

export const createComment = (createCommentInput: CreateCommentInput) => {
  return apiClient.post(`/comments/create`, createCommentInput)
}

export const getEventComments = (eventId: string) => {
  return apiClient.get(`/comments/event/${eventId}`)
}
