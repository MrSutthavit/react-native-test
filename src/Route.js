import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './page/Home';
import Main from './page/Main';
import Create from './page/Create';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName={Home}>
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Main'}
        component={Main}
        options={{
          headerLeft: null,
          headerBackVisible: false,
          headerTitle: 'สมาชิก',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={'Create'}
        component={Create}
        options={{
          headerTitle: null,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

export default MainStack;
