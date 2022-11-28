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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-player';

function GroupAbout(props) {
  return (
    // <ScrollView>
    <View style={{backgroundColor: AppColor.appBg}}>
      <View style={styles.viewStyle}>
        <View style={[GlobalStyles.flexRow1]}>
          <Text style={styles.title}>ABOUT</Text>
          <View
            style={[
              styles.lineStyle,
              {width: Dimensions.get('window').width / 1.3},
            ]}
          />
          {/* <Text style={styles.numStyle}>5.7K</Text> */}
        </View>
        <Text style={styles.textStyle} numberOfLines={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.{' '}
        </Text>
        {/* <View style={[GlobalStyles.flexRow1, {marginTop: 15}]}>
          <View style={styles.lineStyle2} />
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </View> */}
      </View>

      <View style={[styles.viewStyle, {marginTop: 8}]}>
        <View style={[GlobalStyles.flexRow1]}>
          <Text style={styles.title}>MEMBER</Text>
          <View
            style={[
              styles.lineStyle,
              {width: Dimensions.get('window').width / 1.55},
            ]}
          />
          <Text style={styles.numStyle}>5.7K</Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 20, marginLeft: 10}]}>
          <Image
            source={require('../Assets/notificationImge.png')}
            style={{width: 35, height: 35, borderRadius: 20}}
          />
          <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
            Bill Gates
          </Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 15, marginLeft: 10}]}>
          <Image
            source={require('../Assets/notificationImge.png')}
            style={{width: 35, height: 35, borderRadius: 20}}
          />
          <View>
            <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
              Bill Gates
            </Text>
            <Text
              style={{
                color: AppColor.greenButton,
                marginLeft: 10,
                fontSize: 11,
              }}>
              Friend
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 15, marginLeft: 10}]}>
          <Image
            source={require('../Assets/notificationImge.png')}
            style={{width: 35, height: 35, borderRadius: 20}}
          />
          <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
            Bill Gates
          </Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 15}]}>
          <View style={styles.lineStyle2} />
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </View>
      </View>

      <View style={[styles.viewStyle, {marginTop: 8}]}>
        <View style={[GlobalStyles.flexRow1]}>
          <Text style={styles.title}>RULES</Text>
          <View
            style={[
              styles.lineStyle,
              {width: Dimensions.get('window').width / 1.3},
            ]}
          />
          {/* <Text style={styles.numStyle}>5.7K</Text> */}
        </View>

        <View style={[GlobalStyles.flexRow1, {marginTop: 20, marginLeft: 10}]}>
          <Icon
            // style={{marginRight: 5}}
            name="chevron-right"
            size={15}
            color={AppColor.greenButton}
          />
          <Text
            style={{color: AppColor.darkGray, fontSize: 12, fontWeight: '500'}}>
            {' '}
            No bad behaviour
          </Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 10, marginLeft: 10}]}>
          <Icon
            // style={{marginRight: 5}}
            name="chevron-right"
            size={15}
            color={AppColor.greenButton}
          />
          <Text
            style={{color: AppColor.darkGray, fontSize: 12, fontWeight: '500'}}>
            {' '}
            No bad behaviour
          </Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 10, marginLeft: 10}]}>
          <Icon
            // style={{marginRight: 5}}
            name="chevron-right"
            size={15}
            color={AppColor.greenButton}
          />
          <Text
            style={{color: AppColor.darkGray, fontSize: 12, fontWeight: '500'}}>
            {' '}
            No bad behaviour
          </Text>
        </View>

        <View style={[GlobalStyles.flexRow1, {marginTop: 15}]}>
          <View style={styles.lineStyle2} />
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </View>
      </View>

      <View style={[styles.viewStyle, {marginBottom: 10, marginTop: 8}]}>
        <View style={[GlobalStyles.flexRow1]}>
          <Text style={styles.title}>ACTIVITY</Text>
          <View
            style={[
              styles.lineStyle,
              {width: Dimensions.get('window').width / 1.4},
            ]}
          />
          {/* <Text style={styles.numStyle}>5.7K</Text> */}
        </View>

        <View style={[GlobalStyles.flexRow1, {marginTop: 20, marginLeft: 10}]}>
          <IIcon
            // style={{marginRight: 5}}
            name="newspaper-outline"
            size={15}
            color={AppColor.greenButton}
          />
          <Text
            style={{
              color: AppColor.darkGray,
              fontSize: 12,
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {' '}
            Daily Post
          </Text>
        </View>
        <View style={[GlobalStyles.flexRow1, {marginTop: 10, marginLeft: 10}]}>
          <IIcon
            // style={{marginRight: 5}}
            name="people-circle-outline"
            size={15}
            color={AppColor.greenButton}
          />
          <Text
            style={{
              color: AppColor.darkGray,
              fontSize: 12,
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {' '}
            Members Active
          </Text>
        </View>

        {/* <View style={[GlobalStyles.flexRow1, {marginTop: 15}]}>
          <View style={styles.lineStyle2} />
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </View> */}
      </View>
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  lineStyle: {
    height: 1,
    backgroundColor: AppColor.lightGray2,
    marginLeft: 15,
    marginTop: 5,
  },
  lineStyle2: {
    height: 1,
    backgroundColor: AppColor.lightGray2,
    width: Dimensions.get('window').width / 1.19,
    // marginLeft: 15,
    marginTop: 5,
  },
  numStyle: {
    fontSize: 12,
    color: AppColor.greenButton,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 10,
  },
  seeAllText: {
    fontSize: 11,
    color: AppColor.greenButton,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5,
  },
  textStyle: {
    color: AppColor.lightGray,
    fontSize: 13,
    marginLeft: 15,
    paddingHorizontal: 10,
    // textAlign: 'center',
    marginTop: 10,
  },
  title: {color: AppColor.darkGray, fontSize: 17, fontWeight: '500'},
  viewStyle: {
    backgroundColor: AppColor.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 3,
  },
});

export default GroupAbout;
