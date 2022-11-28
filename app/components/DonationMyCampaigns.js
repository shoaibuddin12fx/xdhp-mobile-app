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
import EIcon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';

function DonationMyCampaigns(props) {
  const {navigation, route, setEventViewVisible, setEventItem} = props;
  const [donarWallList, setDonarWallList] = useState([
    {
      image: require('../Assets/notificationImge3.png'),
      name: 'Anika Schustar',
      Donated: '100,000',
      totalDonations: 10,
    },
    {
      image: require('../Assets/postImage.png'),
      name: 'Anika Schustar',
      Donated: '100,000',
      totalDonations: 100,
    },
    {
      image: require('../Assets/notificationImge.png'),
      name: 'Anika Schustar',
      Donated: '150,000',
      totalDonations: 50,
    },
    {
      image: require('../Assets/userImage.png'),
      name: 'Anika Schustar',
      Donated: '50,000',
      totalDonations: 10,
    },
  ]);

  const DonarWall = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: AppColor.white,
          padding: 5,
          borderRadius: 10,
          marginTop: 15,
          //   marginBottom: 15,
        }}>
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              paddingVertical: 10,
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderColor: AppColor.lightGray2,
              position: 'relative',
              //   justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={{
              color: AppColor.lightGray,
              fontSize: 11,
              position: 'absolute',
              right: 0,
              top: 10,
            }}>
            Nov 13 2021
          </Text>

          <Avatar.Image
            style={{backgroundColor: AppColor.white}}
            size={50}
            source={item?.image}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                color: AppColor.darkGray,
                fontWeight: 'bold',
              }}>
              {item?.name}
            </Text>
            <View style={[GlobalStyles.flexRow1]}>
              <Text
                style={{
                  color: AppColor.lightGray,
                  fontSize: 11,
                }}>
                Beneficiary
              </Text>
              <Text
                style={{
                  color: AppColor.greenButton,
                  fontSize: 11,
                }}>
                {' WWF'}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            GlobalStyles.flexRow1,
            {marginTop: 10, marginHorizontal: 10, paddingBottom: 10},
          ]}>
          <View style={[GlobalStyles.flexRow1]}>
            <Text
              style={{
                color: AppColor.lightGray,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Donated:
            </Text>
            <Text
              style={{
                color: AppColor.greenButton,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              {'  $' + item?.Donated}
            </Text>
          </View>
          <View
            style={{
              width: 1,
              height: 10,
              marginHorizontal: 10,
              backgroundColor: AppColor.lightGray,
            }}></View>
          <View style={[GlobalStyles.flexRow1]}>
            <Text
              style={{
                color: AppColor.lightGray,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Donars:
            </Text>
            <Text
              style={{
                color: AppColor.greenButton,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              {'  ' + item?.totalDonations}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[
        GlobalStyles.container,
        {paddingHorizontal: 15, paddingVertical: 15},
      ]}>
      <View
        style={{
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderColor: AppColor.lightGray2,
        }}>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>Campaigns Created</Text>
          <Text style={styles.numFontStyle}>15</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>Total Donars on all Campaigns</Text>
          <Text style={styles.numFontStyle}>10,000</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>Total Amounts Raised</Text>
          <Text style={styles.numFontStyle}>10,000,000</Text>
        </View>
      </View>

      <View>
        <FlatList data={donarWallList} renderItem={DonarWall} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: AppColor.lightGray2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  fontStyle: {color: AppColor.darkGray, fontWeight: 'bold'},
  numFontStyle: {
    color: AppColor.greenButton,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default DonationMyCampaigns;
