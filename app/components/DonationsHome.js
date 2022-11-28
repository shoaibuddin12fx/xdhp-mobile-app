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
import * as Progress from 'react-native-progress';

function DonationsHome(props) {
  const {
    navigation,
    route,
    setSingleDonationData,
    setViewDonationPopupVisible,
  } = props;
  const [donationList, setDonationList] = useState([
    {
      name: 'Sarah Cruise',
      videolink: require('../Assets/djPic2.png'),
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png'),
    },
    {
      name: 'Sarah Cruise',
      videolink: require('../Assets/donationImage.png'),
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png'),
    },
    {
      name: 'Sarah Cruise',
      videolink: require('../Assets/donationImage2.png'),
      profilePic: require('../Assets/postImage.png'),
      cover: require('../Assets/djPic2.png'),
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

  const Donations = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setViewDonationPopupVisible(true);
          setSingleDonationData(item);
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
            <Image source={item?.videolink} style={styles.userPostImage} />
          </View>

          <View style={[styles.postText, GlobalStyles.flexRow1]}>
            <Text
              style={{
                color: AppColor.greenButton,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Music Event
            </Text>

            <MIcon name="share-variant" size={20} color={AppColor.darkGray} />
          </View>

          <Text
            style={{
              color: AppColor.darkGray,
              fontWeight: 'bold',
              fontSize: 16,
              paddingHorizontal: 15,
            }}>
            Support Our Cause
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: AppColor.lightGray,
              //   fontWeight: 'bold',
              fontSize: 13,
              paddingLeft: 15,
              marginRight: 30,
            }}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmodipsum dolor sit amet, consectetur ,'
            }
          </Text>
          <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
            <Text
              style={{
                color: AppColor.darkGray,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
              }}>
              {'$5000 Donated'}
            </Text>

            <Progress.Bar
              style={{
                marginTop: 5,
                backgroundColor: AppColor.lightGray2,
                borderColor: AppColor.lightGray2,
                borderWidth: 0,
              }}
              color={AppColor.greenButton}
              progress={0.3}
              width={Dimensions.get('window').width / 1.26}
              height={8}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center', padding: 10}]}>
      <View>
        <FlatList data={donationList} renderItem={Donations} />
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
    justifyContent: 'space-between',
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

export default DonationsHome;
