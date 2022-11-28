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

function GoupEvents(props) {
  const {navigation, route,setEventViewVisible,setEventItem} = props;
  const [feedsData, setFeedsData] = useState([
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png')
    },
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png')
    },
    {
      name: 'Sarah Cruise',
      videolink:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png')
    },
  ]);
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

  const Feeds = ({item}) => {
    return (
      <Pressable onPress={()=>{
      }}>
      <View style={styles.userPost}>
        {/* <ImageBackground
          resizeMode="contain"
          style={{
            width: '100%',
            height: 300,
            borderRadius: 50,
          }}
          source={require('../Assets/djPic2.png')}></ImageBackground> */}
        {/* <View
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
        </View> */}

        <View style={{position: 'relative'}}>
          <Image
            source={require('../Assets/postImage.png')}
            style={styles.userImage}
          />
          <Image
            source={
              // {uri: postImage}
              // ??
              require('../Assets/djPic2.png')
            }
            style={styles.userPostImage}
          />
          <Text
            style={{
              color: AppColor.white,
              position: 'absolute',
              bottom: 10,
              right: 15,
            }}>
            Free
          </Text>
        </View>

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
                // width: Dimensions.get('window').width / 1.28,
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
              style={{
                marginLeft: 20,
                width: Dimensions.get('window').width / 1.8,
                // backgroundColor: 'red',
              }}
              name="share-variant-outline"
              size={20}
              color={AppColor.darkGray}
            />

            <View>
              <Menu>
                <MenuTrigger>
                  <MIcon
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
        </View>
        <View style={styles.postText}>
          <Text style={{color: AppColor.greenButton, fontWeight: 'bold'}}>
            Music Event
          </Text>
          <Text style={{color: AppColor.cancel, fontSize: 13}}>
            Saturday, March 10th, 10AM
          </Text>
        </View>

        <View style={styles.postText2}>
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
      </Pressable>
    );
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center', padding: 10}]}>
      <View>
        <FlatList data={feedsData} renderItem={Feeds} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    width: '98%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    // paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15,
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

export default GoupEvents;
