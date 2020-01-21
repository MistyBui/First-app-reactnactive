import React from 'react'
import List from '../components/List';
import {StyleSheet, View} from 'react-native';

const Home = (props) => {
  const {navigation} = props
  return (
    <View style={styles.container}>
      <List navigation ={navigation}></List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 });

export default Home;
