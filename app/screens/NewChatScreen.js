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
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Button, Searchbar, Switch} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {notificationEnum} from '../const/Enum';
import {Checkbox} from 'react-native-paper';

function NewChatScreen(props) {
  const {navigation, route} = props;
  const [checkBoxView, setCheckBoxView] = useState(false);
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [chats, setChats] = useState([
    {
      userImage: require('../Assets/notificationImge.png'),
      userName: 'John.J',
      msg: 'Good night',
      time: '2m',
      newMsg: false,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge2.png'),
      userName: 'Lelah',
      msg: 'Hi',
      time: '2m',
      newMsg: true,
      isCheck: false,
    },
    {
      userImage: require('../Assets/notificationImge3.png'),
      userName: 'Emmaneul',
      msg: 'Lorem ipsum',
      time: '2m',
      newMsg: false,
      isCheck: false,
    },
    {
      userImage: require('../Assets/notificationImge2.png'),
      userName: 'Lelah',
      msg: 'Lorem ipsum',
      time: '2m',
      newMsg: false,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge3.png'),
      userName: 'Emmaneul',
      msg: 'Lorem ipsum',
      time: '2m',
      newMsg: true,
      isCheck: false,
    },
  ]);

  const AllChats = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={[
          styles.rowFront,
          {
            backgroundColor: item.isCheck ? '#f2f2f2' : AppColor.white,
            marginBottom: item.isCheck ? 2 : 0,
          },
        ]}
        // underlayColor={'#AAA'}
      >
        <View
          style={[
            GlobalStyles.flexRow,
            {
              alignItems: 'center',
              marginHorizontal: 10,
              paddingVertical: 5,
              //   marginBottom: 5,
              height: 60,
            },
          ]}>
          <Image
            source={item.userImage}
            style={{width: 35, height: 35, borderRadius: 20}}
          />
          <View
            style={{
              width: '72%',
              marginLeft: 10,
              //   flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: AppColor.black,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              {item.userName + ' '}
            </Text>
            {/* <Text
              numberOfLines={2}
              style={{
                color: AppColor.black,
                fontWeight: item.newMsg ? 'bold' : 'normal',
                fontSize: 13,
              }}>
              {item.msg}
            </Text> */}
          </View>

          <Checkbox
            status={item.isCheck ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          {/* {!checkBoxView && (
            <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.newMsg
                    ? AppColor.greenButton
                    : AppColor.white,
                  borderRadius: 5,
                }}
              />

              <Text
                style={{
                  color: AppColor.lightGray,
                  marginLeft: 25,
                  fontSize: 12,
                  //   marginRight: item.newMsg ? 0 : -10,
                }}>
                {item.time}
              </Text>
            </View>
          )} */}
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <View style={[GlobalStyles.container3]}>
      <Searchbar
        style={{
          backgroundColor: '#f2f2f2',
          elevation: 0,
          width: '90%',
          height: 40,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 10,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{marginTop: 10}}>
        <FlatList data={chats} renderItem={AllChats} />
        {/* <View>
            <SwipeListView
              // useSectionList={true}
              data={chats}
              renderItem={AllChats}
              renderHiddenItem={renderHiddenItem}
              renderSectionHeader={renderSectionHeader}
              // leftOpenValue={75}
              // rightOpenValue={-150}
              rightOpenValue={checkBoxView ? 10 : -150}
              previewRowKey={'0'}
              // previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={value => {
                console.log('value', value);
              }}
  
              // onSwipeValueChange={onSwipeValueChange => {
              //   console.log('onSwipeValueChange', onSwipeValueChange);
              // }}
            />
          </View> */}
      </View>

      <View style={styles.deleteORSelect}>
        <View
          style={{
            backgroundColor: AppColor.greenButton,
            // borderColor: AppColor.white,
            width: '100%',
            // width: Dimensions.get('window').width / 1.1,
            height: 40,

            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',

            // borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../Assets/chatIcon.png')}
            style={{
              width: 20,
              height: 20,

              position: 'absolute',
              left: 10,
            }}
          />
          <Text style={[GlobalStyles.buttonHrLbl]}>Start Chatting</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  deleteORSelect: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: AppColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  lineView: {
    width: '100%',
    height: 3,
    backgroundColor: AppColor.appBg,
    marginTop: 20,
  },
  notificationBtn: {
    width: 150,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: AppColor.white,
    fontSize: 13,
  },
  rowFront: {
    alignItems: 'center',
    // backgroundColor: AppColor.white,
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    height: 60,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: AppColor.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: AppColor.darkGray,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'tomato',
    right: 0,
  },
});

export default NewChatScreen;
