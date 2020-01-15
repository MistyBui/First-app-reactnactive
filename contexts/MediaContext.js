import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MediaContext = React.createContext([]); //can be empty array ([])

const mediaArray = [];

const MediaProvider = (props) => {
  const [media, setMedia] = useState(mediaArray); //return context with data and function thats modified data
  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {props.children}
    </MediaContext.Provider>
  );
};
/*props.children: everything in mediaprovider in appjs*/
MediaProvider.propTypes = {
  children: PropTypes.node,
};

export {MediaContext, MediaProvider};
