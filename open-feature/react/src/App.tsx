import React from "react";
import { useNumberFlagValue } from "@openfeature/react-sdk";
import { OpenFeature } from "@openfeature/web-sdk";
import flagsmithProvider from "./flagsmithProvider";

function App() {
  const font_size = useNumberFlagValue("font_size", 12);

  const identify = () => {
    const userData = { id: "flagsmith_sample_user", example_trait: 1 };
    OpenFeature.setContext({
      targetingKey: userData.id,
      traits: { example_trait: userData.example_trait },
    });
  };

  const logout = () => {
    OpenFeature.setContext({});
  };

  const identity = flagsmithProvider.flagsmithClient.identity;
  return (
    <div className="App">
      <div className="font-size">
        <code>font_size</code> flag value: <span>{font_size}</span>
      </div>
      {identity ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={identify}>Identify</button>
      )}
    </div>
  );
}

export default App;
