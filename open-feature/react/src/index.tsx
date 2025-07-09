import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { OpenFeature } from "@openfeature/web-sdk";
import { OpenFeatureProvider } from "@openfeature/react-sdk";
import "./index.css";

import App from "./App";
import flagsmithProvider from "./flagsmithProvider";

OpenFeature.setProvider(flagsmithProvider);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <OpenFeatureProvider>
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </OpenFeatureProvider>
);
