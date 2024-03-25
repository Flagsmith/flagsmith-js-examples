/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Suspense} from 'react';
import {OpenFeature} from '@openfeature/web-sdk';
import flagsmith from 'react-native-flagsmith';
import {OpenFeatureProvider} from '@openfeature/react-sdk';
import {FlagsmithProvider} from '@openfeature/flagsmith';
import ExampleComponent from './ExampleComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
OpenFeature.setProviderAndWait(
  new FlagsmithProvider({
    environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
    flagsmithInstance: flagsmith,
    cacheFlags: true,
    AsyncStorage,
  }),
);

function App(): React.JSX.Element {
  return (
    <OpenFeatureProvider>
      <>
        <ExampleComponent />
      </>
    </OpenFeatureProvider>
  );
}

export default App;
