import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <View style={styles.continer}>
      <TouchableOpacity
        style={styles.Touch}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text style={styles.text}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Touch: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default Home;
