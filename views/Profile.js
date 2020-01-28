import React, {useState,useEffect} from 'react';
import { Container, Header, Left, Right, Body, Text, Button, Content, Title, Item} from 'native-base';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';


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
        <Item>
          <Text>Username:{user.username}</Text>
        </Item>
        <Item>
         <Text>Fullname:{user.full_name}</Text>
          <Text>Email:{user.email}</Text>
        </Item>
        <Item>
          <Button block onPress={signOutAsync}><Text>Sign Out</Text></Button>
        </Item>
      </Content>
    </Container>
  );
};



Profile.propTypes = {
  navigation: PropTypes.object,
}
export default Profile;
