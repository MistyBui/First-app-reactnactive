import React, {useState,useEffect} from 'react';
import { Card, Icon, CardItem, Container, Header, Left, Right, Body, Text, Button, Content, Title} from 'native-base';
import {AsyncStorage, Image} from 'react-native';
import PropTypes from 'prop-types';
import { avatar } from '../hooks/APIHook';
const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';


const Profile = (props) => {
  const [user, setUser] = useState({});
  const userToState = async () => {
    const userFromStorage = await AsyncStorage.getItem('user');
    setUser(JSON.parse(userFromStorage));
  };
  useEffect(()=>{
    userToState();
  }, []);

  const signOutAsync = async () => {
       await AsyncStorage.clear();
       props.navigation.navigate('Auth');
     };

  const filename = async () => {
    const userJson = await AsyncStorage.getItem('user');
    console.log(userJson);
    const user = JSON.parse(userJson);
    console.log(user);
    const tag = await avatar(user.user_id);
    console.log(tag);
    user.avatarFilename = tag[0].filename;
    setUser(() => {
      return user;
    });
    };
    useEffect(() => {
      filename();
    }, []);

  return (
    <Container>
      <Header>
        <Left/>
        <Body>
           <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Card>
        <CardItem>
        <Left>
              <Icon name='person' />
              <Text>Username: {user.username}</Text>
            </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
              style={{height: 500, width: 'auto', flex: 1}}
              source={{uri: mediaURL + user.avatarFilename}}
            />
        </CardItem>
        <CardItem>
          <Body>
            <Text>Fullname:{user.full_name}</Text>
            <Text>Email:{user.email}</Text>
          </Body>
        </CardItem>
        <Button block onPress={signOutAsync}><Text>Sign Out</Text></Button>
        </Card>
      </Content>
    </Container>
  );


  }

Profile.propTypes = {
  navigation: PropTypes.object,
}
export default Profile;
