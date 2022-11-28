import React, {useEffect, useState, useRef, useCallback} from 'react';
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
  Keyboard,
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
import {Switch} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {notificationEnum} from '../const/Enum';
import {Checkbox} from 'react-native-paper';
import moment from 'moment';

var Textss;
var count = 0;

function InboxScreen(props) {
  const [textValue, setTextValue] = useState(null);
  // const [time,setTime] = useState()
  const [data, setdata] = useState([]);
  const [checkIcon, setCheckIcon] = useState(false);
  const [checkIcon2, setCheckIcon2] = useState(false);

  // const flatlistRef = useRef();
  const yourRef = useRef(null);
  const {navigation, route} = props;
  // const [text, setText] = useState();
  const {item} = route?.params;
  console.log('item', item);

  const longPressBtns = [
    {
      icon: require('../Assets/trash.png'),
      btnText: 'Delete',
      type: 1,
    },
    {
      icon: require('../Assets/alert-circle.png'),
      btnText: 'Report',
      type: 2,
    },
    {
      icon: require('../Assets/arrow-redo.png'),
      btnText: 'Reply',
      type: 3,
    },
    {
      icon: require('../Assets/copy.png'),
      btnText: 'Copy',
      type: 4,
    },
    {
      icon: require('../Assets/arrow-redo2.png'),
      btnText: 'Forword',
      type: 5,
    },
  ];

  const Item = ({item}) => {
    console.log('item', item);
    return (
      <Pressable
        onLongPress={() => {
          console.log('press');
          setCheckIcon(true);
        }}>
        <View style={{position: 'relative', justifyContent: 'center'}}>
          {checkIcon && (
            <Icon
              style={{position: 'absolute', right: 10}}
              name="check-circle-outline"
              size={20}
              color={AppColor.greenButton}
              onPress={() => {
                // navigation.goBack();
              }}
            />
          )}
          {/* <View style={styles.msgView}> */}

          <View style={styles.textView}>
            <Text style={styles.textStyle} multiline={true}>
              {item.message}
            </Text>
            {/* <Text style={styles.dateStyle}>{item.time}</Text> */}
          </View>
          <Image
            source={require('../Assets/notificationImge.png')}
            style={styles.imageStyle}
          />
          {/* </View> */}

          {/* <Text style={styles.dateStyle}>{item.time}</Text> */}
        </View>
      </Pressable>
    );
  };

  const Item1 = ({item}) => {
    console.log('item', item);
    return (
      <Pressable
        onLongPress={() => {
          setCheckIcon2(true);
        }}>
        <View style={{position: 'relative', justifyContent: 'center'}}>
          {checkIcon2 && (
            <Icon
              style={{position: 'absolute', left: 10}}
              name="check-circle-outline"
              size={20}
              color={AppColor.greenButton}
              onPress={() => {
                // navigation.goBack();
              }}
            />
          )}
          <View style={styles.replyView}>
            <Text style={styles.textStyle2} multiline={true}>
              {item.message}
            </Text>
          </View>

          {/* <View style={styles.replyView}>
          <Text style={styles.textStyle}>Let's schedule meeting?</Text>
        </View> */}

          {/* <Text style={styles.dateStyle}>{item.time}</Text> */}
        </View>
      </Pressable>
    );
  };
  const renderItem = ({item}) => {
    console.log('itemss', item);
    if (item.id % 2 === 0) {
      return <Item item={item} />;
    } else {
      return <Item1 item={item} />;
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/chatBg.png')}
      style={[GlobalStyles.flex]}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={20}
          color={AppColor.darkGray}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={[GlobalStyles.flexRow, styles.userNameView]}>
          <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
            <Image source={item?.userImage} style={styles.userImageStyle} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                marginLeft: 10,
                color: AppColor.darkGray,
              }}>
              {item?.userName}
            </Text>
          </View>
          <Icon
            name="dots-horizontal"
            size={20}
            color={AppColor.darkGray}
            onPress={() => {}}
          />
        </View>
      </View>
      <View>
        <FlatList
          style={{marginTop: 10, marginHorizontal: 10}}
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
          onLayout={() => yourRef.current.scrollToEnd()}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      {/* {!checkIcon && !checkIcon2 && ( */}
      <View style={[styles.footer, {zIndex: 0}]}>
        <View style={styles.msgTextView}>
          <TextInput
            style={[styles.msgText]}
            placeholderTextColor={AppColor.lightGray}
            placeholder="Type Here"
            value={textValue}
            multiline={true}
            onChangeText={text => {
              console.log(text);
              setTextValue(text);
            }}
          />
          <Icon
            style={{
              transform: [{rotate: '320deg'}],
              marginLeft: 2,
              marginTop: -5,
            }}
            name="send"
            size={25}
            color={AppColor.greenButton}
            onPress={() => {
              // setTime(new Date() )
              var timing = moment(new Date()).format('hh:mm A');
              if (textValue === null) {
                console.log('kch be');
              } else {
                let newData = [
                  ...data,
                  {
                    id: count++,
                    message: textValue,
                    time: timing,
                  },
                ];
                setdata(newData);
                setTextValue(null);
                Keyboard.dismiss();
              }
            }}
          />
        </View>
        <View
          style={{
            width: '20%',
            paddingLeft: 5,
          }}>
          <View
            style={[
              GlobalStyles.flexRow,
              {alignItems: 'center', justifyContent: 'space-around'},
            ]}>
            <Image
              source={require('../Assets/attachIcon.png')}
              style={styles.icon}
            />
            <Image
              source={require('../Assets/photoIcon.png')}
              style={styles.icon}
            />
          </View>
          <Image
            source={require('../Assets/happyIcon.png')}
            style={[{alignSelf: 'center', width: 20, height: 20}]}
          />
        </View>
      </View>

      {checkIcon ||
        (checkIcon2 && (
          <View
            style={[
              styles.footer,
              {zIndex: 1, justifyContent: 'space-around'},
            ]}>
            {longPressBtns.map(item => (
              <Pressable
                onPress={() => {
                  setCheckIcon(false);
                  setCheckIcon2(false);
                }}>
                <View
                  style={[
                    GlobalStyles.centered,
                    {marginRight: -10, marginLeft: -10},
                  ]}>
                  <Image
                    source={item.icon}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        item.btnText == 'Delete'
                          ? '#e56565'
                          : AppColor.greenButton,
                      marginTop: 2,
                    }}>
                    {item.btnText}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      {/* )} */}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#f9f9f7',

    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  header: {
    width: '100%',
    height: 80,
    backgroundColor: AppColor.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  icon: {resizeMode: 'contain', width: 30, height: 30},
  msgTextView: {
    width: '80%',
    backgroundColor: AppColor.white,
    height: 60,
    borderRadius: 10,
    // elevation: 2,
    paddingRight: 5,
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: AppColor.lightGray2,
    alignItems: 'center',
  },
  msgText: {
    fontSize: 15,
    color: AppColor.darkGray,
    width: '90%',
    marginLeft: 2,
  },
  userNameView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    width: Dimensions.get('window').width / 1.2,
  },
  userImageStyle: {width: 40, height: 40, borderRadius: 25},

  barView: {
    width: 150,
    height: 3,
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: 3,
  },
  buttonView: {
    height: 40,
    width: 40,
    // borderRadius: 20,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // padding: 0,
    alignSelf: 'center',
    //  justifyContent: "center",
    backgroundColor: 'red',
    marginLeft: 20,
  },
  chatView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  dateStyle: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 10,
    marginTop: 10,
    marginBottom: 10,
    // marginLeft:30
  },
  flexView: {
    flex: 1,
  },
  iconStyle: {
    color: 'red',
    position: 'absolute',
    left: 0,
  },
  Input: {
    height: 40,
    width: '85%',
    color: 'gray',
    // borderWidth: 2,
    // borderColor: Colors.main,
    borderRadius: 20,
    padding: 10,
    fontFamily: 'OpenSans_600SemiBold',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 5,
  },
  msgView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  nameStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
  },
  nameBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  replyView: {
    height: 'auto',
    marginLeft: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: AppColor.greenButton,
    // marginRight: 20,
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  sendView: {
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 5,
    // position: "absolute",
    // bottom: 10,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  sendIcon: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textView: {
    backgroundColor: AppColor.lightGray2,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,

    justifyContent: 'center',

    paddingVertical: 6,
    width: 150,

    height: 'auto',
    marginRight: 50,
    marginTop: 15,
  },
  textStyle: {
    fontSize: 14,
    color: AppColor.darkGray,
    // width:"auto"
  },
  textStyle2: {
    fontSize: 14,
    color: AppColor.white,
    // width:"auto"
  },
});

export default InboxScreen;
