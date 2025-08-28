import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Although cache is more faster but delay for 60 sec to update newly added conten
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
