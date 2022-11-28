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
  TouchableHighlight,
} from 'react-native';
import {RaisedButton} from './Button';
import {Button, IconButton, Avatar} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSlider from 'react-native-image-slider';
import {ImageCarousel} from 'image-auto-scroll';
import StarRating from 'react-native-star-rating-widget';
import {Loader} from './LoaderComponent';
import {ServiceApi} from '../Api/ServiceApi';
import {getUser, getUserData} from '../helpers/localStorage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const iconBackground = require('../Assets/Polygon.png');
const iconBackground2 = require('../Assets/Polygon2.png');
const icons = require('../Assets/newspaper.png');

function DrawerContent(props) {
  const [viewVisibl, setViewVisibl] = useState(false);
  const logout = () => {
    // removeUser();
    // deleteTokenFromAPI();
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };
  const navigation = props.navigation;

  const [selectedId, setSelectedId] = useState(null);
  const [dawerData, setDawerData] = useState([
    {
      id: '1',
      title: 'Social',
      icon: require('../Assets/newspaper.png'),
      nav: 'socialHome',
    },
    {
      id: '2',
      title: 'Events',
      icon: require('../Assets/calendar.png'),
      nav: 'events',
    },
    {
      id: '3',
      title: 'Classified\nAds',
      icon: require('../Assets/computer-screen2.png'),
      nav: 'ClassifiedAds',
    },
    {
      id: '4',
      title: 'Shop',
      icon: require('../Assets/shop-bag.png'),
      nav: 'home',
    },
    {
      id: '5',
      title: 'Jobs',
      icon: require('../Assets/briefcase.png'),
      nav: 'jobs',
    },
    {
      id: '6',
      title: 'Polling',
      icon: require('../Assets/polling.png'),
      nav: 'polling',
      // nav: 'reportContact',
    },
    {
      id: '7',
      title: 'Donation',
      icon: require('../Assets/charity.png'),
      nav: 'donations',
    },
    {
      id: '8',
      title: 'Matrimonial',
      icon: require('../Assets/wedding-rings.png'),
      nav: 'matrimonials',
    },
    {
      id: '9',
      title: 'Volunteer',
      icon: require('../Assets/hands-up.png'),
      nav: 'volunteer',
    },
  ]);

  const DrawerItems = ({item, onPress}) => {
    return (
      // <TouchableOpacity >
      <TouchableHighlight
        underlayColor={'#dfffee'}
        style={{
          width: 94,
          height: 60,
          marginRight: 25,
          marginBottom: 20,
        }}
        onPress={() => {
          navigation.navigate(item?.nav);
          setSelectedId(item.id);
        }}>
        {/* <ImageBackground
          style={[
            GlobalStyles.centered,
            {width: 94, height: 91, marginRight: 25, marginBottom: 20},
          ]}
          resizeMode="contain"
          source={iconBackground2}>
          <ImageBackground
            style={[
              GlobalStyles.centered,
              {width: 94, height: 91, marginTop: -10, marginLeft: -10},
            ]}
            resizeMode="contain"
            source={iconBackground}> */}
        <View style={GlobalStyles.centered}>
          <Image
            source={item?.icon}
            tintColor={
              item.id == selectedId ? AppColor.greenButton : AppColor.darkGray
            }
          />

          <Text
            style={{
              color:
                item.id == selectedId
                  ? AppColor.greenButton
                  : AppColor.darkGray,
              textAlign: 'center',
            }}>
            {item?.title}
          </Text>
        </View>
        {/* </ImageBackground>
        </ImageBackground> */}
      </TouchableHighlight>
    );
  };

  return (
    // <ScrollView>
    <View style={styles.mainView}>
      <View style={styles.userTitle}>
        <View
          onTouchStart={() => {
            console.log('this is sarah crusie profile picture');
            navigation.navigate('moduleAndMore');
          }}
          style={{
            alignSelf: 'center',
            borderWidth: 2,
            width: 90,
            height: 90,
            borderRadius: 45,
            borderColor: AppColor.greenButton,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar.Image size={80} source={require('../Assets/userImage.png')} />
        </View>
        <Text style={styles.userName}>Sarah Cruise</Text>
        <Text style={{color: AppColor.lightGray}}>Artist</Text>
        <View
          style={[
            GlobalStyles.flexRow1,
            {marginTop: 10, justifyContent: 'space-evenly'},
          ]}>
          <View style={[GlobalStyles.centered, {flex: 0.5}]}>
            <Text style={styles.frnds}>45</Text>
            <Text style={styles.frnds}>Friends</Text>
          </View>
          <View
            style={{
              width: 2,
              backgroundColor: AppColor.lightGray,
              height: 25,
            }}
          />
          <View style={[GlobalStyles.centered, {flex: 0.5}]}>
            <Text style={styles.frnds}>45</Text>
            <Text style={styles.frnds}>followers</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 10,
          marginTop: 10,
          // backgroundColor: 'red',
          height: Dimensions.get('window').height / 1.6,
        }}>
        <FlatList
          contentContainerStyle={{padding: 10}}
          data={dawerData}
          numColumns={2}
          renderItem={DrawerItems}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#dfffee',
    // backgroundColor: '#94CCAF',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {color: AppColor.darkGray, fontWeight: '500', marginTop: 5},
  frnds: {color: AppColor.darkGray, fontWeight: '500'},
  userTitle: {
    padding: 10,
    backgroundColor: AppColor.white,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerContent;
