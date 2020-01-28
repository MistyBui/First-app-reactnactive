import React, {useState} from 'react';
import { AsyncStorage} from 'react-native';
import {Container, Header, Content,View, Text, Button, Form, Item, Input, Title} from 'native-base';
import PropTypes from 'prop-types';
import { login, register } from "../hooks/APIHook";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from '../hooks/LoginHook';

const Login = (props) => { // props is needed for navigation
  const [error, setError] = useState('')
  const {inputs, handleUsernameChange, handlePasswordChange, handleEmailChange, handleFullnameChange} = useSignUpForm();

  const signInAsync = async () => {
    try{
      const user = await login(inputs);
      console.log('login',user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e){
      console.log(e.message);
    }
  };

  const registerAsync = async () => {
    try{
      const result = await register(inputs);
      console.log('register',result);
      if (!result.error){
        signInAsync();
      } else {
        setError(result.error)
      }

    } catch (e){
      console.log(e.message);
    }
  };

  return (
    <Container>
      <Header />
        <Content>
        <Form>
          <View>
            <Title>
              <Text>Login</Text>
            </Title>
            <Item>
              <Input
                autoCapitalize='none'
                placeholder='username'
                onChangeText={handleUsernameChange}
              />
            </Item>
            <Item>
            <Input
                autoCapitalize='none'
                placeholder='email'
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
              />
            </Item>

              <Button block onPress={signInAsync}><Text>Sign in!</Text></Button>
            </View>

            <View>
              <Title>
                <Text>Register</Text>
              </Title>

              <Item>
                <Input
                autoCapitalize='none'
                placeholder='username'
                onChangeText={handleUsernameChange}
              />
              </Item>
              <Item>
              <Input
                autoCapitalize='none'
                placeholder='email'
                onChangeText={handleEmailChange}
              />
              </Item>

              <Item>
              <Input
                autoCapitalize='none'
                placeholder='fullname'
                onChangeText={handleFullnameChange}
              />
              </Item>

              <Item>
                <Input
                autoCapitalize='none'
                placeholder='password'
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                />
              </Item>
              <Button block onPress={registerAsync}><Text>Register</Text></Button>
              <Text>{error}</Text>
            </View>
          </Form>
      </Content>
    </Container>

  );
};




// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
