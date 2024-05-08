import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'ukxpjouz',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-03-07',
})

export const writeClient = createClient({
  projectId: 'ukxpjouz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
  token: 'skMCOwpdAXAT6hYrQO95WaaAAa18fArtwhwwSmI39BrKoe3aenyuIw5dHCXjQi5ZCbx4UHfNScM3ZB2w9xXMfZ6c8y1QfVOvZC0JlCsQ69vOgr0phvSmlVqoOTOQRMXVnauED1xiTwmJxYayeJagoPxq1DYGhRBK3rqfwbbLMrEC5rhJDOcb'
})