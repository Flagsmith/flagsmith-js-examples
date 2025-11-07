import React from 'react';
import flagsmith from 'flagsmith';
import {FlagsmithProvider} from 'flagsmith/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppComponent from './ExampleComponent';

export default function () {
  return (
    <FlagsmithProvider
      options={{
        environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
        cacheFlags: true,
        enableLogs: true,
        AsyncStorage: AsyncStorage,
        onError: error => {
          console.warn(error);
        },
      }}
      flagsmith={flagsmith}>
      <AppComponent />
    </FlagsmithProvider>
  );
}
