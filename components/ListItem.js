import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  console.log(props.singleMedia);
  const singleMedia = props.singleMedia;
  return (
    <TouchableOpacity
      style={styles.touch}
      onPress={
        () => {
          props.navigation.push('Single',{
              file_id: singleMedia.file_id,
              title: singleMedia.title,
              filename: singleMedia.filename
          });
        }
      }>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: mediaUrl + props.singleMedia.filename}}
      />
      <View style={styles.text}>
        <Text style={{fontWeight: 'bold'}}>{singleMedia.title}</Text>
        <Text style={{textAlign:"justify", width: 270}}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  touch: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'#808080',
    marginBottom: 5,
    padding: 10,
 },
 text: {
    paddingLeft:10,
 }
});

export default ListItem;
