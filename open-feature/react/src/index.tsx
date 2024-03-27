import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FlagsmithProvider} from '@openfeature/flagsmith'
import {OpenFeature} from "@openfeature/web-sdk";
import {OpenFeatureProvider} from "@openfeature/react-sdk";
import {createFlagsmithInstance} from "flagsmith";

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
