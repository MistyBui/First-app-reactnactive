import {useState, setState} from 'react';
import validate from 'validate.js';

const emptyError = {
  username: undefined,
  email: undefined,
  password: undefined,
  fullname: undefined,
  fetch: undefined,
}
const validator = {
  username: {
    length: {
      minimum: 3,
      message: 'minimum 3 characters',
    },
  },
  password: {
    length: {
      minimum: 5,
      message: 'minimum 5 characters',
    },
  },
  email: {
    presence: {
      message: 'required!',
    },
    email: {
      message: "doesn't look like a valid email",
      }
  },
  fullname: {
    format: {
      pattern: "/^[A-Za-z]+$/",
      flags: "i",
      message: "can only contain a-z"
    },
  },
};

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(emptyError)
  const handleUsernameChange = (text) => {

    setInputs(inputs =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handleEmailChange = (text) => {
    setInputs(inputs =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullnameChange = (text) => {
    setInputs(inputs =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs(inputs =>
      ({
        ...inputs,
        password: text,
      }));
  };

  const validateField = (attr,value) =>{
    try{
    const valResult = validate({[attr]: value}, validator);
    console.log('validate',valResult);
    let valid= undefined;
    if(valResult) {
      valid = valResult[attr][0];
    }
    setErrors((errors) => ({
      ...errors,
      [attr]: valid,
    }));
  } catch (e){
    console.log(e);
  }
  };



  return {
    handleUsernameChange,
    handleEmailChange,
    handleFullnameChange,
    handlePasswordChange,
    validateField,
    inputs,
    errors
  };
};


export default useSignUpForm;
