import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.form}>
      <Text>Login</Text>
         <FormTextInput
           autoCapitalize='none'
           placeholder='username'
           onChangeText={handleUsernameChange}
         />
         <FormTextInput
           autoCapitalize='none'
           placeholder='email'
           onChangeText={handlePasswordChange}
           secureTextEntry={true}
         />
         <Button title="Sign in!" onPress={signInAsync} />
      </View>

      <View style={styles.form}>
         <Text>Register</Text>
         <FormTextInput
           autoCapitalize='none'
           placeholder='username'
           onChangeText={handleUsernameChange}
         />
         <FormTextInput
           autoCapitalize='none'
           placeholder='email'
           onChangeText={handleEmailChange}
         />
         <FormTextInput
           autoCapitalize='none'
           placeholder='fullname'
           onChangeText={handleFullnameChange}
         />
         <FormTextInput
           autoCapitalize='none'
           placeholder='password'
           onChangeText={handlePasswordChange}
           secureTextEntry={true}
         />
         <Button title="Register" onPress={registerAsync} />
         <Text>{error}</Text>
       </View>
     </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  form:{
    padding: 20,
  }
});

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
