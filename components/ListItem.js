import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  console.log(props.singleMedia);
  const singleMedia = props.singleMedia;
  return (
    <TouchableOpacity style={styles.touch}>
      <Image
        style={{width: 100, height: 100, borderRadius: 50, marginTop: 25}}
        source={{uri: singleMedia.thumbnails.w160}}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={{textAlign:"justify", width: 270, marginBottom: 5}}>{singleMedia.description}</Text>
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
    backgroundColor:'#E8E8E8',
    marginBottom: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 1
 },
  text: {
    paddingLeft:10,
  },

  title: {
    fontWeight: 'bold',
    color: 'orange',
    margin: 5,
    fontSize: 20
  }
});

export default ListItem;
