/**
 * The names of the feature flags in Flagsmith. We use this type
 * to ensure that we are using the correct feature flag names in the app.
 * If there's a typo or a mismatch, the build will fail.
 */
export type FeatureFlagName =
  // Welcome message is a simple feature flag that we can use to
  // test the feature flag integration. It is a "txt" value type and
  // will be rendered in the app on client-side.
  | 'welcome_message'
  // Beta users is a multi-value feature flag that we can use to
  // test the feature flag integration. It is a "json" value type and
  // contains an array of user emails.
  | 'beta_users'
