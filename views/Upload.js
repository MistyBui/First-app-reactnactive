import React, {useEffect, useState} from 'react';
import {Container, Header, Content, Form, Title, Item, Button, H2, Text, Body} from 'native-base';
import Image, {Dimensions, AsyncStorage} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHook';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';

const deviceHeight = Dimensions.get('window').height;


const Upload = (props) => {
  const [image,setImage] = useState(null);
  const {handleDescriptionChange, handleTitleChange, handleUpload, inputs} = useUploadForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      exif: true,
    });
    if (!result.cancelled) {
      setImage(result);
      console.log(result)
    }
  };

  return (

      <Content>
        <Form>
          {image &&
          <Image source={{ uri: image.uri }} style={{width: '100%', height: deviceHeight / 3}} />}
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.title}
              placeholder='Title'
              onChangeText={handleTitleChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.description}
              placeholder='Description'
              onChangeText={handleDescriptionChange}
            />
          </Item>
          <Button block light onPress={pickImage}><Text>Select</Text></Button>
          <Button block light onPress={() => {handleUpload(image, props.navigation);}}><Text>Upload</Text></Button>
        </Form>
      </Content>

  )
}

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
