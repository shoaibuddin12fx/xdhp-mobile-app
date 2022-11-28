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
import {Switch, Searchbar} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {notificationEnum} from '../const/Enum';
import {Checkbox} from 'react-native-paper';

function ChatScreen(props) {
  const {navigation, route} = props;
  const [checkBoxView, setCheckBoxView] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const settingOptions = [
    {
      option: 'Chat Sounds',
      type: 1,
    },

    {
      option: 'Select',
      type: 2,
    },
    {
      option: 'Delete all read',
      type: 4,
    },
    {
      option: 'Chat Settings',
      type: 3,
    },
  ];

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
      isCheck: true,
    },
    {
      userImage: require('../Assets/notificationImge3.png'),
      userName: 'Emmaneul',
      msg: 'Lorem ipsum',
      time: '2m',
      newMsg: false,
      isCheck: true,
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
      isCheck: true,
    },
  ]);

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
              justifyContent: 'space-around',
            }}>
            {!checkBoxView && (
              <Image
                source={require('../Assets/pencil.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
            )}
            {!checkBoxView && (
              <Menu>
                <MenuTrigger>
                  <Icon
                    name="cog-outline"
                    size={22}
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
                      backgroundColor: 'rgba(242, 245, 243,0.96)',
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
                            navigation.navigate('newChat');
                            // setCheckBoxView(true);
                            break;
                          case 3:
                            console.log('3');
                            setChats([]);

                            break;
                          case 4:
                            console.log('4');

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

  const AllChats = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('inbox', {item: item})}
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
            <Text
              numberOfLines={2}
              style={{
                color: AppColor.black,
                fontWeight: item.newMsg ? 'bold' : 'normal',
                fontSize: 13,
              }}>
              {item.msg}
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
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {}}>
        <Text style={styles.backTextWhite}>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          console.log('data.item.key', data.item);
          setChats(chats.filter(x => x !== data.item));
        }}>
        <Text style={styles.backTextWhite}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({section}) => <Text>{section.title}</Text>;

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
        <View>
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
        </View>
      </View>
      {checkBoxView && (
        <View style={styles.deleteORSelect}>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Pressable
              onPress={() => {
                if (checked) {
                  setChats([]);
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

export default ChatScreen;
