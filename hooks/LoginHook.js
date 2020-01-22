import {useState} from 'react';

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
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
  return {
    handleUsernameChange,
    handleEmailChange,
    handleFullnameChange,
    handlePasswordChange,
    inputs,
  };
};

export default useSignUpForm;
