import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false, // Disabled CDN for production to ensure fresh data and avoid auth issues
})
