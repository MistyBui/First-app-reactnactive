import React, {useContext} from 'react';
import ListItems from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import { getAllMedia } from "../hooks/APIHook";
import {List as BaseList} from 'native-base';



const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  return (
    <BaseList
    dataArray={media}
    renderRow={
      (item) => <ListItems
        navigation={props.navigation}
        singleMedia={item}
      />
    }
    keyExtractor={(item, index) => index.toString()}
  />
  );
};



 export default List;
