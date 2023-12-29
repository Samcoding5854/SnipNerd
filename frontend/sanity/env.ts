export const apiVersion =
process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-27'

console.log(process.env.NEXT_PUBLIC_SANITY_API_VERSION)

console.log('Before dataset:', process.env.SANITY_STUDIO_DATASET);

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET'
);

console.log('After dataset:', process.env.SANITY_STUDIO_DATASET);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
  )
    
export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
