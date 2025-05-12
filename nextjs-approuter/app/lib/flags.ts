/**
 * The names of the feature flags in Flagsmith. We use this type
 * to ensure that we are using the correct feature flag names in the app.
 * If there's a typo or a mismatch, the build will fail.
 */
export type FeatureFlagName = 'welcome_message' | 'beta_users'
