const axios = require('axios')

export const apiClient = axios.create({
  baseURL: '/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
