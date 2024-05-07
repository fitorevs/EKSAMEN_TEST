import { createClient } from '@sanity/client'

export const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-06-05',
  token: process.env.SANITY_USER_TOKEN
})

export const readClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-06-05',
  useCdn: true
})