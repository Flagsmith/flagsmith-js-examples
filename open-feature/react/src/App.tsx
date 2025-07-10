import React from "react";

// Whenever we need to modify the context, we can use the OpenFeature object.
import { OpenFeature } from "@openfeature/web-sdk";

// The useNumberFlagValue hook is a hook that allows us to get the value of a number flag,
// from the OpenFeature API via whichever provider we have set.
import { useNumberFlagValue } from "@openfeature/react-sdk";

// By extracting the identity to a separate hook, we can swap out the provider
// without having to change the identity hook.
import { useIdentity } from "./useIdentity";

function App() {
  const identity = useIdentity();

  const font_size = useNumberFlagValue("font_size", 12);

  const login = () => {
    // We can set the context to any data we want, and it will be used to evaluate
    // the value of the feature flag. In this case, we are setting the targeting key
    // to the user's id, and the trait to the user's example trait. These properties
    // would normally be retrieved from a database or other data source upon authentication.
    const userData = { id: "flagsmith_sample_user", example_trait: 1 };

    OpenFeature.setContext({
      targetingKey: userData.id,
      traits: { example_trait: userData.example_trait },
    });
  };

  const logout = () => {
    OpenFeature.setContext({});
  };

  return (
    <div className="App">
      <div className="font-size">
        <code>font_size</code> flag value: <span>{font_size}</span>
      </div>
      {identity ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default App;
