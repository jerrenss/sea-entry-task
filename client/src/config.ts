const axios = require('axios')
export const DEV_API_URL: string = process.env.NEXT_PUBLIC_DEV_API_URL

export const apiClient = axios.create({
  baseURL: DEV_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
