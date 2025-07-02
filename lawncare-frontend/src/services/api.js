import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://lawncare-backend.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getQuote = async (quoteData) => {
  const response = await api.post('/quotes', quoteData)
  return response.data
}

export const diagnoseProblem = async (image, description) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)
  
  const response = await api.post('/diagnose', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Add more API calls as needed