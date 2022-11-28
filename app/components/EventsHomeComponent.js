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
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {IconButton, Button} from 'react-native-paper';
import {getUser, getUserData} from '../helpers/localStorage';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';

function EventsHomeComponent(props) {
  const {
    navigation,
    route,
    setViewEventsPopupVisible,
    setEventItem,
    allEvents,
    setDisable,
    setEventID,
    getEventById,
    setAllEvents,
    getUserInterest,
    disable,
  } = props;
  const [eventsData, setEventsData] = useState([
    {
      name: 'Sarah Cruise',
      cover: require('../Assets/djPic2.png'),
      dateTime: '2nd Feb 2022 | 3:00PM Eastern',
      eventDec: 'Lorem ipsum dolor sit amet',
      freeOrPayed: '$50',
    },
    {
      name: 'Sarah Cruise',
      cover: require('../Assets/djPic2.png'),
      dateTime: '2nd Feb 2022 | 3:00PM Eastern',
      eventDec: 'Lorem ipsum dolor sit amet',
      freeOrPayed: 'Free',
    },
    {
      name: 'Sarah Cruise',
      cover: require('../Assets/djPic2.png'),
      dateTime: '2nd Feb 2022 | 3:00PM Eastern',
      eventDec: 'Lorem ipsum dolor sit amet',
      freeOrPayed: '$50',
    },
  ]);
  const postMenuOption = [
    {
      btn: 'Share',
      type: 1,
    },
    {
      btn: 'Hide Event',
      type: 3,
    },
    {
      btn: 'Delete',
      type: 4,
    },
    {
      btn: 'Report Event',
      type: 5,
    },
  ];

  const EventsHome = ({item}) => {
    // console.log('EventsHome', item);
    var date = moment(item?.start_date).format('Do MMM YYYY');
    var time = moment(item?.start_time).format('hh:mm A');
    return (
      <Pressable
        onPress={() => {
          setViewEventsPopupVisible(true);
          setEventItem(item);
          getEventById(item?.id);
        }}>
        <View style={styles.userPost}>
          <View style={{position: 'relative'}}>
            <Image
              source={{uri: item?.banner_image}}
              style={styles.userPostImage}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={[GlobalStyles.flexRow1, {height: 60, marginTop: 10}]}>
              <View
                style={{
                  width: Dimensions.get('window').width / 1.6,
                  borderRightWidth: 1,
                  borderColor: AppColor.lightGray2,
                }}>
                <Text
                  style={{
                    color: AppColor.greenButton,
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  {date + ' | ' + time}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '95%',
                    color: AppColor.darkGray,
                    fontSize: 15,
                    fontWeight: '500',
                    marginTop: 1,
                  }}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    color: AppColor.lightGray,
                    fontSize: 12,
                    marginTop: 1,
                  }}>
                  {item?.event_type}
                </Text>
              </View>
              <View style={[GlobalStyles.centered]}>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '100%',
                    // backgroundColor: 'red',
                    color: AppColor.greenButton,
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginLeft: 15,
                    // marginRight: -3,
                  }}>
                  {'$' + item?.price}
                </Text>
              </View>
            </View>

            <View style={[GlobalStyles.flexRow1, {marginTop: 12}]}>
              <View style={{position: 'relative'}}>
                <Button
                  style={styles.videoLink}
                  labelStyle={{fontSize: 13, color: AppColor.darkGray}}
                  mode="contained"
                  onPress={() => {
                    getUserInterest(item.id);
                    console.log('123213', disable);
                    setDisable(!disable);
                  }}>
                  Interested
                </Button>
                <IIcon
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 13,
                  }}
                  name="heart-outline"
                  size={20}
                  color={disable ? AppColor.greenButton : AppColor.darkGray}
                />
              </View>
              <View style={styles.videoLink2}>
                <Menu>
                  <MenuTrigger>
                    <MIcon
                      name="share-variant-outline"
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
                        paddingTop: 5,
                        borderRadius: 8,
                        paddingLeft: 10,
                        backgroundColor: 'rgba(242, 245, 243,0.9)',
                        paddingBottom: 10,
                      },
                    }}>
                    {postMenuOption.map(option => (
                      <MenuOption
                        customStyles={{
                          optionText: {
                            color:
                              option?.btn == 'Delete'
                                ? AppColor.cancel
                                : AppColor.darkGray,
                            fontSize: 12,
                          },
                        }}
                        style={{
                          padding: 5,
                        }}
                        onSelect={() => {
                          switch (option.type) {
                            case 4:
                              //   postDelete(item?.post_id);
                              break;
                          }
                        }}
                        text={option?.btn}
                      />
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center', padding: 10}]}>
      <View>
        <FlatList
          data={allEvents}
          renderItem={EventsHome}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  videoLink: {
    width: Dimensions.get('window').width / 1.7,
    marginRight: 5,
    backgroundColor: AppColor.lightGray2,
    borderRadius: 20,
    alignSelf: 'center',
  },
  videoLink2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 70,
    height: 38,
    backgroundColor: AppColor.lightGray2,
    borderRadius: 20,
    alignSelf: 'center',
  },
  likes: {
    color: AppColor.darkGray,
    fontSize: 11,
    marginLeft: -8,
    // marginTop: -17,
    // marginLeft: -10,
  },
  message: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  postText: {
    marginTop: 10,
    position: 'relative',
    paddingHorizontal: 15,
  },
  postText2: {
    marginTop: 5,
    position: 'relative',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  transparentView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    width: '100%',
    height: 35,
  },
  userPost: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    // paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15,
    paddingBottom: 15,
    // height: Dimensions.get('window').height / 1.6,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 1,
  },
  userPostImage: {
    width: '100%',
    // height: Dimensions.get('window').height / 3,
    height: 200,
    resizeMode: 'cover',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // marginTop: 5,
  },
  popupImgeStyle: {
    width: '100%',
    height: Dimensions.get('window').height / 1.5,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: AppColor.darkGray,
    fontWeight: 'bold',
    width: '78%',
    // backgroundColor: 'red',
  },
  whatsNew: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
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
    width: '97%',
    marginLeft: 10,
    // backgroundColor: 'red',
    // paddingBottom: 150,
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
  modalView2: {
    height: '100%',
    flex: 1,
    backgroundColor: AppColor.black,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
  },
  modalinnerViewPosition: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: AppColor.white,
    elevation: 15,
    padding: 10,
    height: 120,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default EventsHomeComponent;
