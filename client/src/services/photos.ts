import { apiClient } from '../config'

export const uploadSinglePhoto = (formData) => {
  return apiClient.post(`/photos/uploadSingle`, formData)
}
