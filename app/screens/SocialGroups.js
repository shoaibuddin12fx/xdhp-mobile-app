import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
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
  Modal,
} from 'react-native';
import {
  Button,
  Searchbar,
  Avatar,
  IconButton,
  Switch,
  Checkbox,
} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import GroupFeeds from '../components/GroupFeeds';
import GoupEvents from '../components/GoupEvents';
import GroupAbout from '../components/GroupAbout';
import GroupMembers from '../components/GroupMembers';
import {Formik} from 'formik';
import {Avatar as Navater} from 'native-base';

var postdescription;

function SocialGroups(props) {
  const {navigation, route} = props;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [viewType, setViewType] = useState('1');
  const [popupVisible, setPopupVisible] = useState(false);
  const [inviteFriendsPopupVisible, setInviteFriendsPopupVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [checked, setChecked] = useState(false);
  const [eventViewVisible, setEventViewVisible] = useState(true);
  const [eventItem, setEventItem] = useState();
  const [groupPostDes, setGroupPostDes] = useState('Submit a Post');

  console.log('eventItem', eventItem);

  const onChangeSearch = query => setSearchQuery(query);

  const CreatGroupPost = useRef();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.getParent().setOptions({headerShown: false});
    });

    navigation.addListener('blur', () => {
      navigation.getParent().setOptions({headerShown: true});
    });
  }, [navigation]);

  const Popup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={popupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <View style={{position: 'relative', flex: 1}}>
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: AppColor.white,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: AppColor.lightGray2,
              },
            ]}>
            <View style={[GlobalStyles.flexRow1]}>
              <IconButton
                style={{marginLeft: -2}}
                icon="arrow-left"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  postdescription = null;
                  setPopupVisible(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Create Post
              </Text>
            </View>
          </View>
          <View style={styles.whatsNew2}>
            <Image
              source={require('../Assets/userImage.png')}
              style={styles.whatsNewImage}
            />
            <View>
              <Text
                style={{
                  color: AppColor.darkGray,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {'Sarah Cruise'}
              </Text>
              <Text
                style={{
                  color: AppColor.lightGray,
                  marginLeft: 10,
                  // fontWeight: 'bold',
                  fontSize: 12,
                }}>
                {'Post for Mercedes'}
              </Text>
            </View>
          </View>

          {/* <Text
            style={{color: AppColor.lightGray, marginLeft: 20, marginTop: 10}}>
            {groupPostDes}
          </Text> */}

          <View>
            <Formik
              innerRef={CreatGroupPost}
              initialValues={{
                description: '',
              }}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              // validationSchema={reviewSchema}
              onSubmit={(values, action) => {
                console.log('FormikValues', values);
                postdescription = values.description;
                // setGroupPostDes(values.description);
                // return;
              }}>
              {formikProps => (
                <View>
                  <TextInput
                    multiline={true}
                    style={styles.whatsNewText}
                    placeholderTextColor={AppColor.lightGray}
                    value={formikProps.values.description}
                    onChangeText={value => {
                      formikProps.setFieldValue('description', value);
                      postdescription = value;
                      // setGroupPostDes(value);
                    }}
                    // onChangeText={formikProps.handleChange('description')}
                    onBlur={formikProps.handleBlur('description')}
                    placeholder="Submit a Post"
                  />
                </View>
              )}
            </Formik>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#efefef',
              height: 60,
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}>
            <Text style={[styles.whatsNewText, {color: AppColor.darkGray}]}>
              {'Add to your post'}
            </Text>
            <View style={[GlobalStyles.flexRow1]}>
              <IIcon
                style={{marginLeft: -15}}
                name={'attach-outline'}
                size={25}
                color={AppColor.greenButton}
              />
              <IIcon
                style={{marginLeft: 10}}
                name={'image-outline'}
                size={25}
                color={AppColor.greenButton}
              />
            </View>
          </View>
        </View>
        {/* <View style={styles.modalinnerViewPosition}>
          {modalIcons.map(item => (
            <Pressable onPress={item.onpress}>
              <View
                style={[
                  GlobalStyles.flexRow1,
                  {
                    marginTop: 10,
                    paddingVertical: 10,
                  },
                ]}>
                <Icon name={item.icon} size={20} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View> */}
      </View>
    </Modal>
  );

  const [inviteFriends, setInviteFriends] = useState([
    {
      name: 'bilal',
      check: true,
    },
    {
      name: 'noman',
      check: false,
    },
    {
      name: 'adeel',
      check: false,
    },
    {
      name: 'umar',
      check: false,
    },
    {
      name: 'dani',
      check: false,
    },
  ]);

  const inviteFriendsList = ({item}) => {
    return (
      <View
        style={[
          GlobalStyles.flexRow1,
          {
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 15,
            backgroundColor: item.check ? '#efefef' : AppColor.white,
          },
        ]}>
        <View style={[GlobalStyles.flexRow1]}>
          <Image
            style={{width: 45, height: 45, borderRadius: 25}}
            source={require('../Assets/notificationImge.png')}
          />
          <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
            {item.name}
          </Text>
        </View>
        <Checkbox
          status={item.check ? 'checked' : 'unchecked'}
          onPress={() => {
            // setChecked(!checked);
          }}
        />
      </View>
    );
  };

  const InviteFriendsPopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={inviteFriendsPopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <View>
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: AppColor.white,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: AppColor.lightGray2,
              },
            ]}>
            <View style={[GlobalStyles.flexRow1]}>
              <IconButton
                style={{marginLeft: -2}}
                icon="arrow-left"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  postdescription = null;
                  setInviteFriendsPopupVisible(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                {'Invite friends (group name)'}
              </Text>
            </View>

            <IconButton
              style={{marginLeft: -2}}
              icon="close"
              size={20}
              color={AppColor.darkGray}
              onPress={() => {
                postdescription = null;
                setInviteFriendsPopupVisible(false);
              }}
            />
          </View>

          <View>
            <Searchbar
              style={styles.searchBarStyle}
              inputStyle={styles.searchBarInputStyle}
              iconColor={AppColor.greenButton}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              loading={true}
            />
          </View>
          <View style={{marginTop: 10}}>
            <FlatList data={inviteFriends} renderItem={inviteFriendsList} />
          </View>
        </View>
      </View>
    </Modal>
  );

  const icons = [
    {
      icon: require('../Assets/message.png'),
      type: 1,
    },
    {
      icon: require('../Assets/bell.png'),
      type: 2,
    },
    {
      icon: require('../Assets/search.png'),
      type: 3,
    },
  ];
  const dotsHorizontal = [
    {
      btn: 'Mute Group',
      type: 1,
    },
    {
      btn: 'Share Group',
      type: 2,
    },
    {
      btn: 'Leave Group',
      type: 3,
    },
  ];
  const plusIcon = [
    {
      btn: 'Create Post',
      type: 1,
      icon: 'newspaper-outline',
      onPress: () => {
        setPopupVisible(true);
      },
    },
    {
      btn: 'Create Event',
      type: 2,
      icon: 'star-outline',
      onPress: () => {
        // setPopupVisible(true)
      },
    },
    {
      btn: 'Invite',
      type: 3,
      icon: 'add-circle-outline',
      onPress: () => {
        // setPopupVisible(true);
        navigation.navigate('inviteFriendToGroup');
      },
    },
  ];
  const buttonText = [
    {
      text: 'Feeds',
      type: 1,
    },
    {
      text: 'About',
      type: 2,
    },
    {
      text: 'Members',
      type: 3,
    },
    {
      text: 'Events',
      type: 4,
    },
  ];

  const eventDelails = [
    {
      icon: 'dots-horizontal-circle-outline',
      title: 'Public Event',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      title: 'Public Event',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      title: 'Public Event',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      title: 'Public Event',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      title: 'Public Event',
    },
  ];

  const avaterData = [
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  ];

  return (
    <ScrollView>
      {eventViewVisible && (
        <View style={[GlobalStyles.container3]}>
          <ImageBackground
            source={require('../Assets/carImage.png')}
            resizeMode="cover"
            style={{width: '100%', height: 150}}>
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  justifyContent: 'space-between',
                  marginTop: 5,
                  marginHorizontal: 5,
                },
              ]}>
              <IconButton
                // style={{marginRight: 10}}
                icon={'arrow-left'}
                size={20}
                color={AppColor.white}
                // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
              />
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                  // marginRight: 5,
                }}>
                {icons.map(item => (
                  <Pressable
                    onPress={() => {
                      console.log('icon', item);
                      switch (item.type) {
                        case 1:
                          console.log('1');
                          navigation.navigate('chat');
                          break;

                        case 2:
                          navigation.navigate('notifications');
                          console.log('2');
                          break;

                        case 3:
                          console.log('3');
                          break;
                      }
                    }}>
                    <IconButton
                      style={{marginRight: 2}}
                      icon={item.icon}
                      size={20}
                      color={AppColor.white}
                      // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </ImageBackground>
          {/* 00000000000000000000000000000000000000000000000000 */}

          <View>
            <View style={[GlobalStyles.flexRow1, styles.friendList]}>
              <View style={[GlobalStyles.flexRow1]}>
                <Avatar.Image
                  style={{backgroundColor: AppColor.white}}
                  size={50}
                  source={require('../Assets/notificationImge.png')}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={styles.friendsName}>{'Mercedes'}</Text>
                  <View style={[GlobalStyles.flexRow1]}>
                    <Text
                      style={[
                        styles.bio,
                        {color: AppColor.greenButton, fontWeight: 'bold'},
                      ]}>
                      {'Public Group'}
                    </Text>
                    <Text style={[styles.bio, {color: AppColor.darkGray}]}>
                      {' | 5.7K members'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[GlobalStyles.flexRow1, {marginRight: 5}]}>
                <Menu style={{marginRight: 10}}>
                  <MenuTrigger>
                    <Icon
                      style={{marginRight: 5}}
                      name="dots-horizontal-circle-outline"
                      size={20}
                      color={AppColor.darkGray}
                    />
                  </MenuTrigger>

                  <MenuOptions
                    customStyles={{
                      optionWrapper: {marginLeft: 10, marginRight: 10},
                      optionsContainer: {
                        width: 180,
                        marginLeft: -8,
                        marginTop: 30,
                        borderRadius: 8,
                        paddingTop: 5,
                        paddingHorizontal: 5,
                        backgroundColor: 'rgba(242, 245, 243,0.9)',
                        paddingBottom: 10,
                      },
                    }}>
                    {dotsHorizontal.map(option => (
                      <MenuOption
                        customStyles={{
                          optionText: {
                            color:
                              option?.type == 3
                                ? AppColor.cancel
                                : AppColor.darkGray,
                            fontSize: 12,
                          },
                        }}
                        style={{
                          padding: 5,
                        }}
                        onSelect={() => {}}>
                        <View
                          style={[
                            GlobalStyles.flexRow1,
                            {
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <Text
                            style={{
                              color:
                                option?.type == 1 || option?.type == 2
                                  ? AppColor.cancel
                                  : AppColor.darkGray,
                              fontSize: 12,
                            }}>
                            {option.btn}
                          </Text>
                          {option.type == 1 && (
                            <Switch
                              value={isSwitchOn}
                              onValueChange={onToggleSwitch}
                            />
                          )}
                        </View>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
                <Menu>
                  {/* + button */}
                  <MenuTrigger>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: AppColor.greenButton,
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                      }}>
                      <Icon
                        // style={{marginRight: 5}}
                        name="plus"
                        size={12}
                        color={AppColor.white}
                      />
                    </View>
                  </MenuTrigger>

                  <MenuOptions
                    customStyles={{
                      // optionWrapper: {marginLeft: 10, marginRight: 10},
                      optionsContainer: {
                        width: 180,
                        marginLeft: 0,
                        marginTop: 30,
                        borderRadius: 8,
                        paddingTop: 5,
                        paddingLeft: 10,
                        backgroundColor: 'rgba(24, 161, 158,0.9)',
                        paddingBottom: 10,
                      },
                    }}>
                    {plusIcon.map(option => (
                      <MenuOption
                        customStyles={{
                          optionText: {
                            color:
                              option?.type == 1 || option?.type == 2
                                ? AppColor.cancel
                                : AppColor.darkGray,
                            fontSize: 12,
                          },
                        }}
                        style={{
                          padding: 5,
                        }}
                        onSelect={option.onPress}
                        // text={option?.btn}
                      >
                        <View
                          style={[
                            GlobalStyles.flexRow1,
                            {
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <Text
                            style={{
                              color: AppColor.white,
                              fontSize: 12,
                            }}>
                            {option.btn}
                          </Text>
                          <IIcon
                            style={{marginRight: 5}}
                            name={option?.icon}
                            size={20}
                            color={AppColor.white}
                          />
                        </View>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
          {/* 00000000000000000000000000000000000000000000000000 */}

          <View
            style={[
              GlobalStyles.flexRow,
              {
                justifyContent: 'space-around',
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

          {viewType == 1 && <GroupFeeds />}
          {viewType == 2 && <GroupAbout />}
          {viewType == 3 && <GroupMembers />}
          {viewType == 4 && (
            <GoupEvents
              setEventViewVisible={setEventViewVisible}
              setEventItem={setEventItem}
            />
          )}

          {/* <Popup /> */}
          <InviteFriendsPopup />
        </View>
      )}
      {!eventViewVisible && (
        <View style={[GlobalStyles.container3]}>
          <ImageBackground
            source={eventItem?.cover}
            resizeMode="cover"
            style={{width: '100%', height: 200}}>
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  justifyContent: 'space-between',
                  marginTop: 5,
                  marginHorizontal: 5,
                },
              ]}>
              <IconButton
                // style={{marginRight: 10}}
                icon={'arrow-left'}
                size={20}
                color={AppColor.white}
                onPress={() => {
                  setEventViewVisible(true);
                  setEventItem(null);
                }}
                // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
              />
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                  // marginRight: 5,
                }}>
                {icons.map(item => (
                  <Pressable
                    onPress={() => {
                      console.log('icon', item);
                      switch (item.type) {
                        case 1:
                          console.log('1');
                          navigation.navigate('chat');
                          break;

                        case 2:
                          navigation.navigate('notifications');
                          console.log('2');
                          break;

                        case 3:
                          console.log('3');
                          break;
                      }
                    }}>
                    <IconButton
                      style={{marginRight: 2}}
                      icon={item.icon}
                      size={20}
                      color={AppColor.white}
                      // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </ImageBackground>
          <View
            style={[
              styles.postText,
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between'},
            ]}>
            <View>
              <Text
                style={{
                  color: AppColor.darkGray,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Music Event
              </Text>
              <Text
                style={{
                  color: AppColor.cancel,
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Saturday, March 10th, 10AM
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: AppColor.darkGray,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {'$25/TicketIcon'}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.postText,
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between'},
            ]}>
            <View style={GlobalStyles.flexRow1}>
              <View style={styles.ticketBtn}>
                <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                  Interested
                </Text>
                <Icon
                  style={{marginLeft: 5}}
                  name="cards-heart-outline"
                  size={15}
                  color={AppColor.darkGray}
                />
              </View>
              <View style={styles.ticketBtn2}>
                <Text style={{color: AppColor.white, fontSize: 12}}>
                  Buy Tickets
                </Text>
                <Icon
                  style={{marginLeft: 5}}
                  name="cards-heart-outline"
                  size={15}
                  color={AppColor.white}
                />
              </View>
            </View>
            <View style={GlobalStyles.flexRow1}>
              <IconButton
                // style={{marginLeft: 5}}
                icon="share-variant-outline"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {}}
              />
              <IconButton
                // style={{marginLeft: 5}}
                icon="dots-horizontal-circle-outline"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {}}
              />
            </View>
          </View>

          <View
            style={[
              styles.postText,
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between'},
            ]}>
            <View style={GlobalStyles.flexRow1}>
              <Navater.Group
                _avatar={{
                  size: 'md',
                }}
                max={5}>
                {avaterData.map(item => (
                  <Navater bg="green.500" source={{uri: item.uri}}>
                    AJ
                  </Navater>
                ))}
              </Navater.Group>
            </View>
            <View style={GlobalStyles.flexRow1}>
              <View style={styles.ticketBtn}>
                <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                  Interested
                </Text>
                <Icon
                  style={{marginLeft: 5}}
                  name="cards-heart-outline"
                  size={15}
                  color={AppColor.darkGray}
                />
              </View>
            </View>
          </View>

          <View style={{backgroundColor: AppColor.appBg}}>
            <View style={styles.viewStyle}>
              <View style={[GlobalStyles.flexRow1]}>
                <Text style={styles.title}>LOCATION</Text>
                <View
                  style={[
                    // styles.lineStyle,
                    {
                      height: 1,
                      backgroundColor: AppColor.lightGray2,
                      marginLeft: 10,
                      marginTop: 5,
                      width: Dimensions.get('window').width / 1.4,
                    },
                  ]}
                />
              </View>
              <Image
                style={[
                  // styles.lineStyle,
                  {
                    height: 150,
                    width: '100%',
                    marginTop: 10,
                  },
                ]}
                source={require('../Assets/map.png')}
              />
              <Text style={{color: AppColor.darkGray, marginTop: 5}}>
                East Orange, NJ 07017, USA
              </Text>
            </View>

            <View style={styles.viewStyle}>
              <View style={[GlobalStyles.flexRow1]}>
                <Text style={styles.title}>DETAILS</Text>
                <View
                  style={[
                    // styles.lineStyle,
                    {
                      height: 1,
                      backgroundColor: AppColor.lightGray2,
                      marginLeft: 10,
                      marginTop: 5,
                      width: Dimensions.get('window').width / 1.33,
                    },
                  ]}
                />
              </View>
              <View style={{marginTop: 15}}>
                {eventDelails.map(item => (
                  <View style={[GlobalStyles.flexRow1, {marginTop: 5}]}>
                    <Icon
                      style={{marginRight: 5}}
                      name={item.icon}
                      size={20}
                      color={AppColor.greenButton}
                    />
                    <Text
                      style={{
                        color: AppColor.darkGray,
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                <View
                  style={[
                    // styles.lineStyle,
                    {
                      height: 1,
                      backgroundColor: AppColor.lightGray2,

                      marginTop: 5,
                      width: Dimensions.get('window').width / 1.33,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.title,
                    {
                      color: AppColor.greenButton,
                      marginLeft: 5,
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginTop: 3,
                    },
                  ]}>
                  READ MORE
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: AppColor.white,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 8,
  },
  lineStyle: {
    height: 5,
    backgroundColor: AppColor.darkGray,
    marginLeft: 10,
    marginTop: 5,
  },
  title: {color: AppColor.darkGray, fontSize: 17, fontWeight: '500'},
  postText: {
    marginTop: 10,
    position: 'relative',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
  },
  ticketBtn: {
    width: 115,
    backgroundColor: AppColor.lightGray2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    marginRight: 5,
  },
  ticketBtn2: {
    width: 115,
    backgroundColor: AppColor.greenButton,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    marginLeft: 5,
  },
  avaterBorder: {
    borderWidth: 1.5,
    padding: 2,
    borderRadius: 50,
    borderColor: AppColor.greenButton,
  },
  bio: {
    fontSize: 12,
  },
  friendList: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    backgroundColor: AppColor.white,
    marginHorizontal: 10,
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
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  navigationBarStyle: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: '100%',
    flex: 1,
    backgroundColor: AppColor.white,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
  },
  whatsNew2: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 30,
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  whatsNewImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  whatsNewText: {
    color: AppColor.lightGray,
    fontWeight: '500',
    marginHorizontal: 5,
    fontSize: 16,
    width: '80%',
    marginLeft: 10,
    // position:'absolute',
    // bottom:0
    // backgroundColor: 'red',
    // paddingBottom: 150,
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

export default SocialGroups;
