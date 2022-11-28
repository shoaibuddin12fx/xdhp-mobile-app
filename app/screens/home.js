import React from 'react';
import {View, Text} from 'react-native';

function Home(props) {
  const {navigation, route} = props;
  return (
    <View>
      <Text>This is Home</Text>
    </View>
  );
}

export default Home;
