import React, {FC, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNumberFlagValue} from '@openfeature/react-sdk';
import {OpenFeature} from '@openfeature/web-sdk';
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExampleComponentType = {};

const ExampleComponent: FC<ExampleComponentType> = ({}) => {
  const font_size = useNumberFlagValue('font_size', 12); // only causes re-render if specified flag values / traits change
  const identify = useCallback(() => {
    const userData = {id: 'flagsmith_sample_user', example_trait: 1};
    OpenFeature.setContext({
      targetingKey: userData.id,
      traits: {example_trait: userData.example_trait},
    });
    AsyncStorage.setItem('userData', JSON.stringify(userData));

  }, []);
  const logout = useCallback(() => {
    OpenFeature.setContext({});
  }, []);
  const identity = OpenFeature.getContext()?.targetingKey;
  return (
    <View style={{paddingTop: 100}}>
      <Text>font_size: {font_size}</Text>
      {identity ? (
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={identify}>
          <Text>Identify</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExampleComponent;
