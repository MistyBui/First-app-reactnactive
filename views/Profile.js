import React, {useState,useEffect} from 'react';
import { Card, Icon, CardItem, Container, Header, Left, Right, Body, Text, Button, Content, Title} from 'native-base';
import {AsyncStorage, Image} from 'react-native';
import PropTypes from 'prop-types';
import { fetchGET } from '../hooks/APIHook';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import MyFiles from './MyFiles';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';
const deviceHeight = Dimensions.get('window').height;

const Profile = (props) => {
  const [user, setUser] = useState({
    userdata: {},
    avatar: '',
  });
  const userToState = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      const uData = JSON.parse(userFromStorage);
      const avatarPic = await fetchGET('tags', 'avatar_' + uData.user_id);
      console.log('aPic', avatarPic[0].filename);
      setUser((user) => (
        {
          userdata: uData,
          avatar: avatarPic[0].filename,
        }));
    } catch (e) {
      console.log('Profile error: ', e.message);
    }

  };
  useEffect(()=>{
    userToState();
  }, []);

  const signOutAsync = async () => {
       await AsyncStorage.clear();
       props.navigation.navigate('Auth');
     };

  return (
    <Container>
      <Content>
        <Card>
        <CardItem header bordered>
          <Icon name='person' />
          <Text>Username: {user.userdata.username}</Text>
        </CardItem>
        <CardItem cardBody>
          <AsyncImage
              style={{
                width: '100%',
                height: deviceHeight / 2,
              }}
              spinnerColor='#777'
              source={{uri: mediaURL + user.avatar}} />
        </CardItem>
        <CardItem>
          <Body>
            <Text>Fullname:{user.userdata.full_name}</Text>
            <Text numberOfLines={1}>Email:{user.userdata.email}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Body>
            <Button full onPress={
              () => {
                props.navigation.push('MyFiles');
              }}>
              <Text>My Files</Text>
            </Button>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Body>
            <Button full onPress={signOutAsync}>
              <Text>Logout</Text>
            </Button>
          </Body>
        </CardItem>

        </Card>
      </Content>
    </Container>
  );


  }

Profile.propTypes = {
  navigation: PropTypes.object,
}
export default Profile;
