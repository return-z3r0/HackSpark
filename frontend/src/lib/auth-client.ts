import axios from 'axios'
import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3001',
})

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})
