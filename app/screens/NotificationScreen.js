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
import {Switch} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {notificationEnum} from '../const/Enum';
import {Checkbox} from 'react-native-paper';

function NotificationScreen(props) {
  const {navigation, route} = props;
  const [btnColor, setBtnColor] = useState(1);
  useEffect(() => {
    setFilterNotification(notifications);
  }, []);

  const [checkBoxView, setCheckBoxView] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const [notificationType, setNotificationType] = useState([
    {
      notificationBtnText: 'All Notifications',
      type: 1,
    },
    {
      notificationBtnText: 'Friend Request',
      type: notificationEnum.friendRequest,
    },
    {
      notificationBtnText: 'Group Invitation',
      type: notificationEnum.groupInvite,
    },
    {
      notificationBtnText: 'Event Invitation',
      type: notificationEnum.eventInvite,
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      userImage: require('../Assets/notificationImge.png'),
      userName: 'John.J',
      notification: 'like your post',
      time: '2m',
      type: notificationEnum.likeOnPost,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge2.png'),
      userName: 'Lelah',
      notification: 'Commented on your post',
      time: '2m',
      type: notificationEnum.likeOnPost,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge3.png'),
      userName: 'Emmaneul',
      notification: 'Sent you a friend request',
      time: '2m',
      type: notificationEnum.friendRequest,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge2.png'),
      userName: 'Lelah',
      notification: 'Invited you to a Group',
      time: '2m',
      type: notificationEnum.groupInvite,
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge3.png'),
      userName: 'Emmaneul',
      notification: 'Invited you an event',
      time: '2m',
      type: notificationEnum.eventInvite,
      isCheck: true,
    },
  ]);
  const [filterNotifications, setFilterNotification] = useState([]);

  const settingOptions = [
    {
      option: 'Notification Sounds',
      type: 1,
    },
    {
      option: 'Read all',
      type: 2,
    },
    {
      option: 'Select',
      type: 3,
    },
    {
      option: 'Delete all read',
      type: 4,
    },
    {
      option: 'Notification Settings',
      type: 5,
    },
  ];

  const AllNotifications = ({item}) => {
    return (
      <TouchableHighlight
        // onPress={() => console.log('You touched me')}
        style={[
          styles.rowFront,
          {
            backgroundColor: checkBoxView ? '#f2f2f2' : AppColor.white,
            marginBottom: checkBoxView ? 2 : 0,
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
              height: 60,
            },
          ]}>
          <Image
            source={item.userImage}
            style={{width: 35, height: 35, borderRadius: 20}}
          />
          <View
            style={{
              width: '75%',
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColor.black,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              {item.userName + ' '}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: AppColor.black,

                fontSize: 13,
              }}>
              {item.notification}
            </Text>
          </View>
          {checkBoxView && (
            <Checkbox
              status={checked && item.isCheck ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          )}
          {!checkBoxView && (
            <Text
              style={{color: AppColor.lightGray, marginLeft: 25, fontSize: 12}}>
              {item.time}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const [isSwitchOn, setIsSwitchOn] = useState(false);

        const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

        return (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {!checkBoxView && (
              <Menu>
                <MenuTrigger>
                  <Icon
                    name="cog-outline"
                    size={20}
                    color={AppColor.darkGray}
                    // onPress={() => {
                    //   console.log('asdsad');
                    // }}
                  />
                </MenuTrigger>

                <MenuOptions
                  customStyles={{
                    // optionWrapper: {marginLeft: 10, marginRight: 10},
                    optionsContainer: {
                      width: 220,

                      marginLeft: -5,
                      marginTop: 22,
                      borderRadius: 8,
                      paddingLeft: 10,
                      backgroundColor: 'rgba(242, 245, 243,0.95)',
                      paddingBottom: 20,
                      position: 'relative',
                    },
                  }}>
                  {settingOptions.map(item => (
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color: item.type == 4 ? 'tomato' : AppColor.darkGray,
                          fontSize: 13,
                        },
                      }}
                      style={{
                        padding: 7,
                      }}
                      onSelect={() => {
                        switch (item.type) {
                          case 1:
                            onToggleSwitch();
                            break;
                          case 2:
                            console.log('2');
                            break;
                          case 3:
                            console.log('3');
                            setCheckBoxView(true);
                            break;
                          case 4:
                            console.log('4');
                            setFilterNotification([]);
                            break;
                          case 5:
                            console.log('5');
                            break;
                        }
                      }}>
                      <View
                        style={[
                          GlobalStyles.flexRow,
                          {
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <Text
                          style={{
                            color:
                              item.type == 4 ? 'tomato' : AppColor.darkGray,
                            fontSize: 13,
                          }}>
                          {item.option}
                        </Text>
                        {item.type == 1 && (
                          <View>
                            <Switch
                              value={isSwitchOn}
                              onValueChange={onToggleSwitch}
                              style={{marginRight: 5}}
                            />
                          </View>
                        )}
                      </View>
                    </MenuOption>
                  ))}
                </MenuOptions>
              </Menu>
            )}
            {checkBoxView && (
              <View>
                <Icon
                  name="close"
                  size={20}
                  color={AppColor.darkGray}
                  onPress={() => {
                    setCheckBoxView(false);
                  }}
                />
              </View>
            )}
          </View>
        );
      },
    });
  }, [navigation, checkBoxView]);
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text> */}
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          console.log('data.item.key', data.item);
          setFilterNotification(
            filterNotifications.filter(x => x !== data.item),
          );
        }}>
        <Text style={styles.backTextWhite}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({section}) => <Text>{section.title}</Text>;

  return (
    <View style={[GlobalStyles.container3]}>
      {!checkBoxView && (
        <View style={{paddingLeft: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {notificationType.map(item => (
              <Pressable
                onPress={() => {
                  switch (item.type) {
                    case 1:
                      setBtnColor(item.type);
                      setFilterNotification(notifications);
                      break;
                    default:
                      setBtnColor(item.type);
                      console.log('item.Type', item.type);
                      let filterItem = notifications.filter(
                        x => x.type == item.type,
                      );
                      console.log('filterItem', filterItem);
                      setFilterNotification(filterItem);
                      break;
                  }
                }}>
                <View
                  style={[
                    styles.notificationBtn,
                    {
                      backgroundColor:
                        item.type == btnColor
                          ? AppColor.greenButton
                          : AppColor.lightGray,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        item.type == btnColor ? AppColor.white : AppColor.black,
                    }}>
                    {item.notificationBtnText}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {!checkBoxView && <View style={styles.lineView} />}

      <View style={{marginTop: 10}}>
        <View>
          <SwipeListView
            // useSectionList={true}
            data={filterNotifications}
            renderItem={AllNotifications}
            renderHiddenItem={renderHiddenItem}
            renderSectionHeader={renderSectionHeader}
            // leftOpenValue={75}
            // rightOpenValue={-150}
            rightOpenValue={checkBoxView ? 10 : -80}
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
        </View>

        {/* <FlatList data={notifications} renderItem={AllNotifications} /> */}
      </View>
      {checkBoxView && (
        <View style={styles.deleteORSelect}>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Pressable
              onPress={() => {
                if (checked) {
                  setFilterNotification([]);
                }
              }}>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name="delete-forever-outline"
                  size={26}
                  color={'tomato'}
                />
                <Text style={{color: 'tomato', fontSize: 12}}>Delete</Text>
              </View>
            </Pressable>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Pressable
              onPress={() => {
                setChecked(!checked);
              }}>
              <View style={{alignItems: 'center', marginTop: -4}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  // onPress={() => {

                  // }}
                />
                <Text
                  style={{
                    color: AppColor.greenButton,
                    fontSize: 12,
                    marginTop: -5,
                  }}>
                  Select All
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  deleteORSelect: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 10,
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

export default NotificationScreen;
