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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

function FollowersList(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const friendMenuOption = [
    {
      btn: 'Add Friend',
      type: 1,
    },
    {
      btn: 'Follow',
      type: 2,
    },
    {
      btn: 'Block',
      type: 3,
    },
  ];

  const [followersList, setFollowersList] = useState([
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

  const HeaderSearchBar = () => {
    return (
      <Searchbar
        style={styles.searchBarStyle}
        inputStyle={styles.searchBarInputStyle}
        iconColor={AppColor.greenButton}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        loading={true}
      />
    );
  };

  const FollowersListItem = ({item}) => {
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
        <View>
          <Menu>
            <MenuTrigger>
              <Icon
                style={{marginRight: 5}}
                name="dots-horizontal"
                size={20}
                color={AppColor.darkGray}
              />
            </MenuTrigger>

            <MenuOptions
              customStyles={{
                // optionWrapper: {marginLeft: 10, marginRight: 10},
                optionsContainer: {
                  width: 140,

                  marginLeft: -5,
                  marginTop: 15,
                  borderRadius: 8,
                  paddingLeft: 10,
                  backgroundColor: AppColor.white,
                  paddingBottom: 10,
                },
              }}>
              {friendMenuOption.map(option => (
                <MenuOption
                  customStyles={{
                    optionText: {
                      color:
                        option?.type == 1 || option?.type == 2
                          ? AppColor.greenButton
                          : AppColor.darkGray,
                      fontSize: 12,
                    },
                  }}
                  style={{
                    padding: 5,
                  }}
                  onSelect={() => {}}
                  text={option?.btn}
                />
              ))}
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };
  return (
    <View style={{padding: 10}}>
      <View>
        <FlatList
          data={followersList}
          renderItem={FollowersListItem}
          ListHeaderComponent={HeaderSearchBar}
        />
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

export default FollowersList;
