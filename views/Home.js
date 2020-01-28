import React from 'react'
import List from '../components/List';
import {StyleSheet, View} from 'react-native';

const Home = (props) => {
  const {navigation} = props
  return (
    <View>
      <List navigation ={navigation}></List>
    </View>
  );
};


export default Home;
