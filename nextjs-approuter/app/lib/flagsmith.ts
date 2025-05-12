import { HasFeatureOptions } from 'flagsmith'
import { User } from '@/app/types'
import flagsmith from 'flagsmith/isomorphic'
type FeatureFlagValue = string | number | boolean | null

/**
 * Check if a feature flag is enabled, and return its associated
 * value.
 *
 * @param {string} flagName
 * @param {HasFeatureOptions} options
 * @returns {Promise<{ enabled: boolean, value: FeatureFlagValue }>}
 */
export async function checkFeatureFlag(
  flagName: string,
  options?: HasFeatureOptions,
): Promise<{ enabled: boolean; value: FeatureFlagValue }> {
  await flagsmith.init({
    // If the environment ID is not set, throw an error to avoid silent failures.
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID,
  })

  const value = flagsmith.getValue(flagName)
  const enabled = flagsmith.hasFeature(flagName, options)

  return { enabled, value }
}

/**
 * Check if a feature flag is enabled for the current user.
 *
 * @param {string} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUser(
  flagName: string,
  user: User,
): Promise<boolean> {
  const { enabled, value: userEmailListJSON } = await checkFeatureFlag(flagName)

  // Check this out in the terminal console. It can also appear in the browser console
  // with a "Server" label prefixed.
  console.log('isFeatureEnabledForUser', {
    user,
    flagName,
    enabled,
    userEmailListJSON,
  })

  // If the feature flag is not enabled, return false because there is no need
  // to check the email list.
  if (!enabled) return false

  // If the feature flag is enabled, check if the user's email is in the list.
  // The Flagsmith UI should indicate if the JSON value is valid, but if you want to be
  // extra careful, wrap this in a try/catch block.
  const userEmailList = JSON.parse(userEmailListJSON as string)

  // We're looking for an array of emails, so if the value is not an array, return false.
  if (!Array.isArray(userEmailList)) return false

  // Check if the user's email is in the list.
  return userEmailList.includes(user.email)
}
