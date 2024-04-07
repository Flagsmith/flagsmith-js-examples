/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Suspense} from 'react';
import {OpenFeature} from '@openfeature/web-sdk';
import {OpenFeatureProvider} from '@openfeature/react-sdk';
import {Text} from 'react-native';

import ExampleComponent from './ExampleComponent';
import flagsmithProvider from "./flagsmithProvider";

OpenFeature.setProvider(
  flagsmithProvider,
);

function App(): React.JSX.Element {
  return (
    <OpenFeatureProvider>
      <Suspense fallback={<Text>Loading</Text>}>
        <ExampleComponent />
      </Suspense>
    </OpenFeatureProvider>
  );
}

export default App;
