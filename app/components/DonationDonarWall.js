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

function DonationDonarWall(props) {
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
          marginBottom: 15,
        }}>
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              paddingVertical: 10,
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderColor: AppColor.lightGray2,
            },
          ]}>
          <Avatar.Image
            style={{backgroundColor: AppColor.white}}
            size={50}
            source={item?.image}
          />
          <Text
            style={{
              color: AppColor.darkGray,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            {item?.name}
          </Text>
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
              Total Donations:
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
      <View>
        <FlatList data={donarWallList} renderItem={DonarWall} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default DonationDonarWall;
