import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {FlagsmithProvider} from '@openfeature/flagsmith'
import App from './App';
import {OpenFeature} from "@openfeature/web-sdk";
import {OpenFeatureProvider} from "@openfeature/react-sdk";

OpenFeature.setProvider(new FlagsmithProvider({
    environmentID: "QjgYur4LQTwe5HpvbvhpzK",
    cacheFlags:true
}));

ReactDOM.render(
  <OpenFeatureProvider>
    <App />
  </OpenFeatureProvider>,
  document.getElementById('root')
);
