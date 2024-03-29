import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FlagsmithProvider} from '@openfeature/flagsmith'
import {OpenFeature} from "@openfeature/web-sdk";
import {OpenFeatureProvider} from "@openfeature/react-sdk";
import {createFlagsmithInstance} from "flagsmith";

// Mock cached logged in user and provider it to OpenFeature
try {
    const userData = localStorage.getItem("userData")
    if(userData) {
        const {id,...rest} = JSON.parse(userData)
        OpenFeature.setContext({targetingKey: id, traits: {...rest}})
    }
} catch {}

OpenFeature.setProvider(new FlagsmithProvider({
    environmentID: "QjgYur4LQTwe5HpvbvhpzK",
    cacheFlags:true,
    flagsmithInstance: createFlagsmithInstance()
}));

ReactDOM.render(
  <OpenFeatureProvider>
    <App />
  </OpenFeatureProvider>,
  document.getElementById('root')
);
