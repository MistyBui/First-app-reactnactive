import React, {useContext} from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import { getAllMedia } from "../hooks/APIHook";



const List = () => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  console.log('List', data, loading);
  setMedia(data);
  return (
    <FlatList
      data={media}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem key={item.id} singleMedia={item} />}
    />
  );
};



 export default List;
