import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  H3,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';

const mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';
const deviceHeight = Dimensions.get('window').height;

const Single = (props) => {
  const { navigation } = props;
  const file = navigation.getParam('filename', 'file');
  const key= navigation.getParam('file_id','noid');

  console.log(file, key);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <AsyncImage
              style={{
                width: '100%',
                height: deviceHeight / 2,
              }}
              spinnerColor='#777'
              source={{uri: mediaUrl + file}}
            />
            </CardItem>
          <CardItem>
            <Left>
              <Icon name='image'/>
              <Body>
                <H3>{JSON.stringify(navigation.getParam('title', 'title'))}</H3>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );

};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};



export default Single;
