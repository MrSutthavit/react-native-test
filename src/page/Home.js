import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 8,
          width: '50%',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text style={{fontSize: 20, color: '#000'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
