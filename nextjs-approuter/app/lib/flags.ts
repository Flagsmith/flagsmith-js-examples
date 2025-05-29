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
  // Beta users is a feature flag that depends on the signed-in
  // user's email being passed in as a trait, to be tested against
  // the segment override in Flagsmith.
  | 'beta_users'
