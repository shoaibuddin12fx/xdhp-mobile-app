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
import IIcon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';

function MatrimonialHome(props) {
  const {navigation, route, setupProfile, setViewProfilePopupVisible} = props;
  const [homeList, setHomeList] = useState([
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
    {
      name: 'kate Wilson',
      cityCountry: 'Toronto, Canada',
    },
  ]);

  const TopBtnLayout = () => {
    return (
      <View>
        {setupProfile && (
          <View style={{position: 'relative'}}>
            <Button
              style={styles.videoLink}
              labelStyle={{fontSize: 13}}
              mode="contained"
              onPress={() => console.log('Pressed')}>
              FIND A PANTER
            </Button>
            <Icon
              style={{
                position: 'absolute',
                top: 7,
                right: 10,
              }}
              name="filter"
              size={22}
              color={AppColor.white}
            />
          </View>
        )}
        {!setupProfile && (
          <View style={{position: 'relative'}}>
            <Button
              style={styles.videoLink2}
              labelStyle={{fontSize: 11}}
              mode="contained"
              onPress={() => console.log('Pressed')}>
              Setup Your Profile to Preview other Profile
            </Button>
            <IIcon
              style={{
                position: 'absolute',
                top: 6,
                right: 10,
              }}
              name="information-circle-outline"
              size={22}
              color={AppColor.white}
            />
          </View>
        )}
      </View>
    );
  };

  const MatrimonialProfiles = () => {
    return (
      <Pressable
        onPress={() => {
          setViewProfilePopupVisible(setupProfile ? true : false);
        }}>
        <ImageBackground
          blurRadius={setupProfile ? 0 : 15}
          style={styles.matrimonialPhoto}
          borderRadius={20}
          source={require('../Assets/postImage.png')}>
          <LinearGradient
            colors={['#ffffff00', '#ffffff90', 'white']}
            style={{
              height: '25%',
              width: '100%',
              position: 'absolute',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              bottom: 0,
              padding: 10,
            }}>
            <Text
              style={[
                {fontWeight: 'bold', color: AppColor.darkGray, marginTop: 2},
              ]}>
              Kate Wilson
            </Text>
            <Text minimumFontScale={0} style={[{color: AppColor.greenButton}]}>
              {'Toronto, Canada'}
            </Text>
          </LinearGradient>
          {/* <View style={{width:'100%',height:50,position:'absolute',bottom:0,borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'rgba(250, 250, 250,0.8)',paddingHorizontal:10}}>
            <Text style={[{fontWeight:'bold',color:AppColor.darkGray,marginTop:2}]}>Kate Wilson</Text>
            <Text style={[{marginTop:2,color:AppColor.greenButton,}]}>{'Toronto, Canada'}</Text>
        </View> */}
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        GlobalStyles.container,
        {alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5},
      ]}>
      <View style={[{marginLeft: 5, marginRight: 5, marginTop: 10}]}>
        <FlatList
          numColumns={2}
          data={homeList}
          renderItem={MatrimonialProfiles}
          ListHeaderComponent={TopBtnLayout}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  matrimonialPhoto: {
    width: Dimensions.get('window').width / 2.2,
    height: Dimensions.get('window').height / 2.7,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 15,
  },
  videoLink: {
    width: Dimensions.get('window').width / 1.06,
    backgroundColor: AppColor.greenButton,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'relative',
  },
  videoLink2: {
    width: Dimensions.get('window').width / 1.06,
    backgroundColor: AppColor.cancel,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'relative',
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

export default MatrimonialHome;
