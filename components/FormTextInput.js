import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, Badge, Text, Content} from 'native-base';

const FormTextInput = (props) => {
  const {error,...otherProps} = props;
  return (
    <Content>
      <Item error={error}>
        <Input  {...otherProps}/>
      </Item>
      {error &&
      <Badge><Text>{error}</Text></Badge>}
    </Content>

  );
};



FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
