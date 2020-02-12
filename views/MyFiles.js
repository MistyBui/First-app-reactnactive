import React from 'react';
import List from '../components/List';
import {View} from 'react-native';
import PropTypes from 'prop-types';


const MyFiles = (props) =>{
  const {navigation} = props;
  return (
    <View>
      <List navigation ={navigation} mode={'myfiles'}></List>
    </View>
  )
}

MyFiles.prototype = {
  navigation: PropTypes.object,
};

export default MyFiles;
