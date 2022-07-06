import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import persist from './src/config/store';
import {LogBox} from 'react-native';
import Route from './src/Route';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const persisStore = persist();
  return (
    <NavigationContainer>
      <Provider store={persisStore.store}>
        <Route />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
