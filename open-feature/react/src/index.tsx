import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// The OpenFeature object is a singleton that provides access to the OpenFeature API,
// and is used to set properties of the integration such as the provider, context, identity, etc.
import { OpenFeature } from "@openfeature/web-sdk";

// The OpenFeatureProvider component is a wrapper that provides the OpenFeature API
// to the rest of the application through the use of React's Context API and hooks.
import { OpenFeatureProvider } from "@openfeature/react-sdk";

// The flagsmithProvider is the instance of the Flagsmith client provider will be used
// by OpenFeature to retrieve the value of your feature flags.
import { flagsmithProvider } from "./flagsmithProvider";

// Set the provider to the flagsmithProvider instance. We only need to do this once,
// at the highest level of the application.
OpenFeature.setProvider(flagsmithProvider);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <OpenFeatureProvider>
    {/**
     * The OpenFeatureProvider component is a wrapper that provides the OpenFeature API
     * to the rest of the application through the use of React's Context API and hooks.
     * It is used to set the provider, context, identity, etc.
     */}
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </OpenFeatureProvider>
);
