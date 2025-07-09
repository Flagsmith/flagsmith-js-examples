import { FlagsmithClientProvider } from "@openfeature/flagsmith-client-provider";

const environmentID = process.env.REACT_APP_FLAGSMITH_ENVIRONMENT_ID;
const api = process.env.REACT_APP_FLAGSMITH_API;

const flagsmithProvider = new FlagsmithClientProvider({
  api,
  environmentID,
  cacheFlags: true,
});

export default flagsmithProvider;
