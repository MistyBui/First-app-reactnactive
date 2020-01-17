import React from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import List from './components/List'
import Constants from 'expo-constants';


const mediaArray = [
  {
    'key': '0',
    'title': 'Title 1',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    'thumbnails': {
      w160: 'http://placekitten.com/160/161',
    },
    'filename': 'http://placekitten.com/2048/1920',
  },
  {
    'key': '1',
    'title': 'Title 2',
    'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/162',
    },
    'filename': 'http://placekitten.com/2041/1922',
  },
  {
    'key': '2',
    'title': 'Title 3',
    'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/163',
    },
    'filename': 'http://placekitten.com/2039/1920',
  },
];


const App = () => {
  return (
    <View style={{flex:1 ,flexDirection: 'column'}}>
      <View style={styles.statusBar}></View>
      <View style= {styles.header}>
        <Image style={styles.catImg} source={require('./assets/header.jpg')}/>
        <Text style={styles.catTxt}>1435 Homeless Cats</Text>
      </View>
      <View style={styles.container}>
        <List mediaArray={mediaArray} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar:{
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginBottom: 10
  },
  catImg:{
    height: 300,
    width:'auto',
  },
  catTxt: {
    fontWeight: "bold",
    backgroundColor: 'rgba(192,192,192,0.4)',
    width: 150,
    position: 'absolute',
    top: 100,
    left: 0,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  }
});

export default App;
