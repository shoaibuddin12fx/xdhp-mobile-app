import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {Button, Searchbar, Avatar} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyPhotos from '../components/MyPhotos';
import SocialProfile from '../components/SocialProfile';
import SocialCover from '../components/SocialCover';

function PhotosView(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.getParent().setOptions({
        title: 'Photos',
      });
    });
  }, [navigation]);

  const buttonText = [
    {
      text: 'My Photos',
      type: 1,
    },
    {
      text: 'Profile',
      type: 2,
    },
    {
      text: 'Cover',
      type: 3,
    },
  ];

  return (
    <View style={[GlobalStyles.container3]}>
      <View
        style={[
          GlobalStyles.flexRow,
          {
            // justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: AppColor.white,
            // width: '100%',
            height: 45,
            elevation: 5,
            marginLeft: -5,
            marginRight: -5,
          },
        ]}>
        {buttonText?.map(item => (
          <Pressable
            onPress={() => {
              var btnolor = 1;
              switch (item.type) {
                default:
                  setViewType(item.type);
                  break;
              }
            }}>
            <View style={[styles.navigationBarStyle]}>
              <Text
                style={{
                  color:
                    item.type == viewType
                      ? AppColor.greenButton
                      : AppColor.black,
                  fontSize: 14,
                }}>
                {item.text}
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      item.type == viewType
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable>
        ))}
      </View>

      {viewType == 1 && <MyPhotos />}
      {viewType == 2 && <SocialProfile />}
      {viewType == 3 && <SocialCover />}
    </View>
  );
}
const styles = StyleSheet.create({
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  navigationBarStyle: {
    marginTop: 10,
    marginLeft: 25,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhotosView;
