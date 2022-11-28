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
import VideoPlayer from 'react-native-video-player';

function SocialWatchScreen(props) {
  const {navigation, route} = props;
  const [watchData, setWatchData] = useState([
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
    },
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
    },
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
    },
  ]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.getParent().setOptions({
        title: 'Watch',
      });
    });
  }, [navigation]);

  const postMenuOption = [
    {
      btn: 'Save',
      type: 1,
    },
    {
      btn: 'Unfollow User',
      type: 2,
    },
    {
      btn: 'Hide Post',
      type: 3,
    },
    {
      btn: 'Delete',
      type: 4,
    },
    {
      btn: 'Report Post',
      type: 5,
    },
  ];

  const VideoLinkBtnLayout = () => {
    return (
      <View style={{position: 'relative'}}>
        <Button
          style={styles.videoLink}
          labelStyle={{fontSize: 13}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Video link
        </Button>
        <Icon
          style={{
            position: 'absolute',
            top: 7,
            right: 10,
          }}
          name="plus"
          size={22}
          color={AppColor.white}
        />
      </View>
    );
  };

  const VideoLayout = ({item}) => {
    return (
      <View style={styles.userPost}>
        <View
          style={[
            GlobalStyles.flexRow,
            {marginTop: 10, paddingHorizontal: 15, alignItems: 'center'},
          ]}>
          <Image
            source={
              // {uri: item?.profile_image} ??
              item?.profilePic
            }
            style={styles.userImage}
          />
          <Text style={styles.userName}>{item?.name}</Text>

          <View>
            <Menu>
              <MenuTrigger>
                <MIcon
                  name="dots-horizontal"
                  size={20}
                  color={AppColor.lightGray}
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
                    backgroundColor: 'rgba(242, 245, 243,0.9)',
                    paddingBottom: 15,
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

        <Pressable
          onPress={() => {
            // setPopupImage(postImage);
            // setImagePopupVisible(true);
          }}>
          <VideoPlayer
            style={{marginTop: 5}}
            stereoPan={2}
            video={{uri: item?.videolink}}
            autoplay={false}
            onPlayPress={value => {
              console.log('valu', value);
            }}
            // controls={false}
            // fullScreenOnLongPress={true}
            // fullscreenAutorotate={true}
            // fullscreenOrientation="landscape"
            // onFullscreenPlayerDidDismiss={value => {
            //   console.log('onFullscreenPlayerDidDismiss', value);
            // }}
            // disableFullscreen={false}
            // onFullscreenPlayerWillDismiss={value => {
            //   console.log('onFullscreenPlayerWillDismiss', value);
            // }}
            // fullscreen={true}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
        </Pressable>

        <View
          style={[
            GlobalStyles.flexRow,
            {
              alignItems: 'center',
              paddingHorizontal: 5,
              paddingTop: 10,
              height: 30,
              // backgroundColor: 'red',
            },
          ]}>
          <Pressable onPress={() => {}}>
            <View
              style={[
                GlobalStyles.flexRow,
                {alignItems: 'center', marginLeft: -8},
              ]}>
              <IconButton
                icon="cards-heart-outline"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {}}
              />
              <Text style={styles.likes}>{0}</Text>
            </View>
          </Pressable>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                width: Dimensions.get('window').width / 1.28,
                height: 30,
                // backgroundColor: 'blue',
                marginLeft: 5,
              },
            ]}>
            <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <IconButton
                icon={require('../Assets/message2.png')}
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  // if (item?.commentsCount > 0) {
                  // }
                }}
              />
              {/* <Image
                  source={require('../Assets/message2.png')}
                  style={styles.message}
                /> */}
              <Text style={styles.likes}>{' ' + 0}</Text>
            </View>

            <MIcon
              name="share-variant-outline"
              size={20}
              color={AppColor.darkGray}
            />
          </View>
        </View>

        <View style={styles.postText}>
          <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
            <Text style={{fontWeight: 'bold', color: AppColor.darkGray}}>
              {'Lorem '}
            </Text>
            <Text
              style={{
                color: AppColor.darkGray,
              }}>
              {'ipsum dolor sit amet, consectetur adipiscing elit,'}
            </Text>
          </View>
          <Text
            style={{
              color: AppColor.darkGray,
            }}>
            {'sed do eiusmodipsum dolor sit amet, consectetur ,'}
          </Text>
          <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
            <Text style={{color: AppColor.darkGray}}>
              {'adipiscing elit sed do eiusmod '}
            </Text>
            <Text
              style={{
                color: AppColor.greenButton,
              }}>
              {'#Lorem'}
            </Text>
          </View>
          <View style={styles.transparentView} />
        </View>
      </View>
    );
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center', padding: 10}]}>
      <View>
        <FlatList
          data={watchData}
          renderItem={VideoLayout}
          ListHeaderComponent={VideoLinkBtnLayout}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  videoLink: {
    width: Dimensions.get('window').width / 1.1,
    backgroundColor: AppColor.greenButton,
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
  transparentView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    width: '100%',
    height: 35,
  },
  userPost: {
    width: '98%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15,
    // height: Dimensions.get('window').height / 1.6,
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  userPostImage: {
    width: '100%',
    height: Dimensions.get('window').height / 1.8,
    marginTop: 5,
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

export default SocialWatchScreen;
