import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { OpenFeature } from "@openfeature/web-sdk";
import { OpenFeatureProvider } from "@openfeature/react-sdk";
import "./index.css";

import App from "./App";
import flagsmithProvider from "./flagsmithProvider";

OpenFeature.setProvider(flagsmithProvider);

ReactDOM.render(
  <OpenFeatureProvider>
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </OpenFeatureProvider>,
  document.getElementById("root")
);
