import React from 'react';
import PropTypes from 'prop-types';
import {Container, Content, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
const mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';

const ListItems = (props) => {
  const singleMedia = props.singleMedia;
  return (

          <ListItem thumbnail>
            <Left>
              <Thumbnail square
                source={{uri: mediaUrl + props.singleMedia.filename}}
              />
            </Left>
            <Body>
              <Text>{singleMedia.title}</Text>
              <Text>{singleMedia.description}</Text>
            </Body>
            <Right>
            <Button rounded info
            onPress={
              () => {
                props.navigation.push('Single',{
                    file_id: singleMedia.file_id,
                    title: singleMedia.title,
                    filename: singleMedia.filename
                });
              }
            }>
                  <Text>View</Text>
              </Button>
            </Right>
          </ListItem>

  )
}
ListItem.propTypes = {
  singleMedia: PropTypes.object,
};




export default ListItems;
