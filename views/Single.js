import React from 'react';
import {View, Text} from 'native-base';
import {Image} from 'react-native';

const mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';


const Single = (props) => {
  const { navigation } = props;
  const file = navigation.getParam('filename', 'file');
  const key= navigation.getParam('file_id','noid');

  console.log(file, key);
  return (
    <View>
      <Text>Title: {JSON.stringify(navigation.getParam('title', 'title'))}</Text>
      <Image
        style={{width: 150, height: 150}}
        source={{uri: mediaUrl + file}}
      />
    </View>
  );
};



export default Single;
