import React, {useState} from 'react';
import { AsyncStorage} from 'react-native';
import {Container, Header, Content,Body, Text, Button, Form, Item, Input, Title, H2} from 'native-base';
import PropTypes from 'prop-types';
import { fetchGET, fetchPOST } from "../hooks/APIHook";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from '../hooks/LoginHook';


const Login = (props) => { // props is needed for navigation
  const [error, setError] = useState('')
  const [toggleForm, setToggleForm] = useState(true);
  const {
    inputs,
    errors,
    validateField,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange} = useSignUpForm();

  const signInAsync = async () => {
    try{
      const user = await fetchPOST('login', inputs);
      console.log('login',user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e){
      console.log('signInAsync error: ' + e.message);
      setError(e.message);
    }
  };

  const registerAsync = async () => {
    try{
      const result = await fetchPOST('users', inputs);
      console.log('register',result);
      signInAsync();

    } catch (e){
      console.log('registerAsync error: ', e.message);
      setError(e.message);
    }
  };
  const checkAvailable = async (evt) => {
    const text = evt.nativeEvent.text;
    try{
    const result = await fetchGET('users/username', text);
    if(!result.available) {
      setError('username is not avai')
    } else {
      setError('');
    }
  }catch (e){
    setError(e.message);
  }
  };

  return (
    <Container>
      <Header>
        <Body><Title>MyApp</Title></Body>
      </Header>
      <Content>
        {toggleForm ? (

        <Form>
            <Title>
              <H2>Login</H2>
            </Title>
            <Item>
              <FormTextInput

                autoCapitalize='none'
                placeholder='username'
                onChangeText={handleUsernameChange}
              />
            </Item>
            <Item>
            <FormTextInput
                autoCapitalize='none'
                placeholder='password'
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
              />
            </Item>

            <Button full onPress={signInAsync}><Text>Sign in!</Text></Button>
            <Button dark full onPress={() => {
                setToggleForm(false);
              }}>
              <Text>or Register</Text>
            </Button>
            </Form>
            ) : (
            <Form>
              <Title>
                <H2>Register</H2>
              </Title>

              <Item>
                <FormTextInput
                autoCapitalize='none'
                placeholder='username'
                value={inputs.username}
                onChangeText={handleUsernameChange}
                onEndEditing={ (evt) => {
                  checkAvailable(evt),
                  validateField('username',inputs.username)
                }}
                error={errors.username}
              />
              </Item>
              <Item>
              <FormTextInput
                autoCapitalize='none'
                placeholder='email'
                value={inputs.email}
                onChangeText={handleEmailChange}
                onEndEditing={ () => {
                  validateField('email',inputs.email)
                }}
                error={errors.email}

              />
              </Item>

              <Item>
              <FormTextInput
                autoCapitalize='none'
                placeholder='fullname'
                value={inputs.full_name}
                onChangeText={handleFullnameChange}
                onEndEditing={ () => {
                  validateField('fullname',inputs.full_name)
                }}
                error={errors.fullname}
              />
              </Item>

              <Item>
                <FormTextInput
                autoCapitalize='none'
                placeholder='password'
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                value={inputs.password}
                onEndEditing={ () => {
                  validateField('password',inputs.password)
                }}
                error={errors.password}
                />
              </Item>
              <Item>
                <FormTextInput
                autoCapitalize='none'
                placeholder='retype password'
                secureTextEntry={true}
                onEndEditing={ () => {

                }}
                />
              </Item>
              <Button block onPress={registerAsync}><Text>Register</Text></Button>
              <Button dark full onPress={() => {
                setToggleForm(true);
              }}>
              <Text>or Login</Text>
            </Button>
              <Text>{error}</Text>
          </Form>
        )}
      </Content>
    </Container>

  );
};




// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
