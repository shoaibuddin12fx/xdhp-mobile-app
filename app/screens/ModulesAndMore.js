import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const list = [
  {
    title: 'Social Media',
    name: 'Ionicons',
    image: 'newspaper',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Events',
    name: 'Entypo',
    image: 'calendar',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Classified Ads',
    name: 'Ionicons',
    image: 'megaphone',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Shop',
    name: 'Fontisto',
    image: 'shopping-store',
    sub: [
      {
        title: 'RETAILER',
        image: require('../'),
        onPress: () => {},
      },
      {
        title: 'WHOLERSALER',
        image: require('../'),
        onPress: () => {},
      },
      {
        title: 'BECOME A SELLER',
        image: require('../'),
        onPress: () => {},
      },
    ],
    onPress: () => {},
  },
  {
    title: 'Jobs',
    name: 'Ionicons',
    image: 'briefcase',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Polling',
    name: 'Entypo',
    image: 'bar-graph',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Donation',
    name: 'Icon',
    image: 'gift',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Matrimonial',
    name: 'Ionicons',
    image: 'heart-half-sharp',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Volunteer',
    name: 'Ionicons',
    image: 'hand-right-sharp',
    subs: [],
    onPress: () => {},
  },
  {
    title: 'Logout',
    name: 'Ionicons',
    image: 'exit',
    subs: [],
    onPress: () => {},
  },
];

const ModulesAndMore = props => {
  const {navigation, route} = props;
  return (
    <>
      <ScrollView style={{paddingBottom: 10, height: 'auto'}}>
        <View style={[GlobalStyles.flexRow, styles.header]}>
          <Icon
            name="arrow-left"
            size={20}
            color={AppColor.black}
            onPress={() => navigation.goBack()}
          />
          <Text style={[styles.headerText]}></Text>
        </View>
        <View style={styles.container1}>
          <View style={styles.center}>
            <Ionicons name="settings" size={50} color={AppColor.greenButton} />
            <Text style={styles.text}>settings</Text>
          </View>

          <View
            style={[
              styles.center,
              ,
              {
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: AppColor.lightGray,
                borderRightColor: AppColor.lightGray,
                paddingLeft: 50,
                paddingRight: 50,
              },
            ]}>
            <Image
              source={require('../Assets/DHP03/Profile/My Profile/pexels-cesar-gale¦o-3289711.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={[styles.text]}>User</Text>
          </View>

          <View style={styles.center}>
            <FontAwesome5
              name="shopping-cart"
              size={45}
              color={AppColor.greenButton}
            />
            <Text style={styles.text}>Cart</Text>
          </View>
        </View>
        {list.map((each, i) => {
          return (
            <View key={i} style={[styles.list]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: 20,
                }}>
                {each.name == 'Ionicons' && (
                  <Ionicons
                    name={each.image}
                    size={30}
                    color={AppColor.greenButton}
                  />
                )}
                {each.name == 'Entypo' && (
                  <Entypo
                    name={each.image}
                    size={30}
                    color={AppColor.greenButton}
                  />
                )}
                {each.name == 'Fontisto' && (
                  <Fontisto
                    name={each.image}
                    size={30}
                    color={AppColor.greenButton}
                  />
                )}
                {each.name == 'Icon' && (
                  <Icon
                    name={each.image}
                    size={30}
                    color={AppColor.greenButton}
                  />
                )}

                <Text style={[styles.text, {marginLeft: 20}]}>
                  {each.title}
                </Text>
              </View>
              <Icon />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 25,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,

    elevation: 2,
  },
  container: {
    backgroundColor: 'white',
  },
  container1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: AppColor.white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    // alignItems: 'center',
    // height: 60,
    // paddingHorizontal: 15,
    // width: '100%',
    // backgroundColor: AppColor.white,
  },

  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ModulesAndMore;
