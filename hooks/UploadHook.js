import {useState, useContext} from 'react';
import validate from 'validate.js';
import {AsyncStorage} from 'react-native';
import { fetchGET } from './APIHook';
import {MediaContext} from '../contexts/MediaContext';

const constraints = {
  title: {
    presence: {
      message: 'cannot be blank.',
    },
    length: {
      minimum: 3,
      message: 'must be at least 3 characters',
    },
  },
  description: {
    length: {
      maxiimum: 100,
      message: 'must be at max 100 characters',
    },
  },
}

const useUploadForm = () => {
  const [media, setMedia] = useContext(MediaContext);
  const [inputs, setInputs] = useState({});
  const [errors,setErrors] = useState({});

  const handleUpload = async (file) => {
    const filename = file.uri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') {
      type = 'image/jpeg';
    }

    const fd = newFormData();
    fd.append('title',inputs.title);
    fd.append('description', inputs.description);
    fd.append('file', {uri:file.uri, name:filename, type});
    try{
      const token = await AsyncStorage.getItem('userToken');
      const fetchOptions = {
        method: 'POST',
        headers: {
        'x-access-token': token,
        },
        body: fd,
      };

      const result = await fetch(
        'http://media.mw.metropolia.fi/wbma/media',
        fetchOptions,
      );
      const json = await result.json();
      if(json.file_id) {
        const json = await fetchGET('media/all');
        const result = await Promise.all(json.files.map(async (item) =>{
          return await fetchGET('media', item.file_id);
        }));
        setMedia(result);
        navigation.push('Home');
      }
    } catch (e){
      console.log(e.message);
    }
  };

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      }));
  };

  const handleDescriptionChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        description: text,
      }));
  };

  return {
    handleDescriptionChange,
    handleTitleChange,
    handleUpload,
    inputs,
    errors,
    setErrors,

  };
};



export default useUploadForm;
