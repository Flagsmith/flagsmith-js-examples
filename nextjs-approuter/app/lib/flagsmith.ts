import { HasFeatureOptions, IFlagsmith } from 'flagsmith'

import type { FeatureFlagName } from './flags'
import { User } from '@/app/types'
import flagsmith from 'flagsmith/isomorphic'
import { getDefaultUser } from '../utils/getDefaultUser'
import { getTraits } from '../utils/getTraits'

type FeatureFlagValue = string | number | boolean | null

/**
 * Initialize the Flagsmith client.
 *
 * @returns {Promise<IFlagsmith>}
 */
export async function getFlagsmith(): Promise<IFlagsmith> {
  const defaultUser = await getDefaultUser()
  const traits = getTraits(defaultUser)

  await flagsmith.init({
    // Although this init is done on the server, the environment key is
    // public and can be accessed by the client because the key gets passed
    // with state to the client-side Provider component (it is not a secret).
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_KEY || '',
    identity: defaultUser?.id,
    traits,
  })

  return flagsmith
}

/**
 * Check if a feature flag is enabled, and return its associated
 * value.
 *
 * @param {string} flagName
 * @param {HasFeatureOptions} options
 * @returns {Promise<{ enabled: boolean, value: FeatureFlagValue }>}
 */
export async function checkFeatureFlag(
  flagName: FeatureFlagName,
  options?: HasFeatureOptions,
): Promise<{ enabled: boolean; value: FeatureFlagValue }> {
  const flagsmith = await getFlagsmith()

  const value = flagsmith.getValue(flagName)
  const enabled = flagsmith.hasFeature(flagName, options)

  return { enabled, value }
}
