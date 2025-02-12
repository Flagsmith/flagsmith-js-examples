import { Flagsmith } from "flagsmith-nodejs";

// Initialize Flagsmith client for server-side usage
export const flagsmithClient = new Flagsmith({
  environmentKey: process.env.FLAGSMITH_ENVIRONMENT_ID || "",
});

/**
 * Utility function to get the state of a feature flag.
 * @param {string} flagName - The name of the feature flag.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the feature flag is enabled.
 */
export async function getFeatureFlagState(flagName: string): Promise<boolean> {
  const flags = await flagsmithClient.getEnvironmentFlags();
  return flags.isFeatureEnabled(flagName);
}

/**
 * Utility function to get the value of a feature flag.
 * @param {string} flagName - The name of the feature flag.
 * @returns {Promise<T | null>} - A promise that resolves to the value of the feature flag, or null if the flag does not exist.
 */
export async function getFeatureValue<T>(flagName: string): Promise<T | null> {
  const flags = await flagsmithClient.getEnvironmentFlags();
  return flags.getFeatureValue(flagName);
}

/**
 * Utility function to get both the state and value of a feature flag.
 * @param {string} flagName - The name of the feature flag.
 * @returns {Promise<{ value: any; status: boolean } | null>} - A promise that resolves to an object containing the value and status of the feature flag, or null if the flag does not exist.
 */
export async function getFeatureFlag(
  flagName: string
): Promise<{ value: any; status: boolean } | null> {
  const flags = await flagsmithClient.getEnvironmentFlags();

  return {
    value: flags.getFeatureValue(flagName),
    status: flags.isFeatureEnabled(flagName),
  };
}
