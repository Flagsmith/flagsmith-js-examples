import { FlagsmithClientProvider } from "@openfeature/flagsmith-client-provider";

const environmentID = process.env.REACT_APP_FLAGSMITH_ENVIRONMENT_ID;
const api = process.env.REACT_APP_FLAGSMITH_API;

/**
 * The FlagsmithClientProvider is the instance of the Flagsmith client provider
 * that will be used by OpenFeature to retrieve the value of your feature flags.
 */
const flagsmithProvider = new FlagsmithClientProvider({
  api,
  environmentID,
  cacheFlags: true,
});

export { flagsmithProvider };
