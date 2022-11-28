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
import {Button, Searchbar, Avatar, IconButton} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function FriendsRequestList(props) {
  const [friendRequestList, setFrendRequestList] = useState([
    {
      name: 'Bilal',
      bio: 'pta nh',
      mutual: 3,
      profilePic: require('../Assets/notificationImge.png'),
    },
    {
      name: 'Noman',
      bio: 'pta nh',
      mutual: 3,
      profilePic: require('../Assets/notificationImge.png'),
    },
    {
      name: 'Adeel',
      bio: 'pta nh',
      mutual: 3,
      profilePic: require('../Assets/notificationImge.png'),
    },
    {
      name: 'Umar',
      bio: 'pta nh',
      mutual: 3,
      profilePic: require('../Assets/notificationImge.png'),
    },
  ]);

  const FriendRequestListItem = ({item}) => {
    return (
      <View style={[GlobalStyles.flexRow1, styles.friendList]}>
        <View style={[GlobalStyles.flexRow1]}>
          <View style={styles.avaterBorder}>
            <Avatar.Image
              style={{backgroundColor: AppColor.white}}
              size={60}
              source={item?.profilePic}
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={styles.friendsName}>{item?.name}</Text>
            <Text style={styles.bio}>{item?.bio}</Text>
            <Text style={styles.mutualfriends}>
              {item?.mutual + ' mutual friend'}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow1]}>
          <Text style={styles.bio}>ACCEPT</Text>
          <IconButton
            icon="close"
            size={20}
            color={AppColor.cancel}
            onPress={() => {
              setFrendRequestList(friendRequestList.filter(x => x !== item));
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{padding: 10}}>
      <View>
        <FlatList data={friendRequestList} renderItem={FriendRequestListItem} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  avaterBorder: {
    borderWidth: 1.5,
    padding: 2,
    borderRadius: 50,
    borderColor: AppColor.greenButton,
  },
  bio: {
    fontSize: 13,
    fontWeight: 'bold',
    color: AppColor.greenButton,
  },
  friendList: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    marginHorizontal: 5,
  },
  friendsName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppColor.darkGray,
  },
  mutualfriends: {
    fontSize: 11,
    fontWeight: 'bold',
    color: AppColor.lightGray,
  },
  searchBarStyle: {
    backgroundColor: AppColor.lightGray2,
    height: 40,
    // paddingTop: 5,
    // paddingBottom: 5,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchBarInputStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
});

export default FriendsRequestList;
