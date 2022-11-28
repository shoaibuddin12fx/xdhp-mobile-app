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

function DonationDonatefor(props) {
  const {navigation, route, setEventViewVisible, setEventItem} = props;
  const [donateForOptions, setDonateForOptions] = useState([
    {
      option: 'Accident and Emergencies',
    },
    {
      option: 'Animals & Pets',
    },
    {
      option: 'Celebrations & Events',
    },
    {
      option: 'Celebrations & Events',
    },
    {
      option: 'Dreams, Hopes & Wishes',
    },
    {
      option: 'Education',
    },
    {
      option: 'Environment',
    },
    {
      option: 'Funerals',
    },
    {
      option: 'Medical',
    },
    {
      option: 'Mosques',
    },
    {
      option: 'Rent, Food & Monthly Expense',
    },
    {
      option: 'Sports',
    },
    {
      option: 'Volunteer Service',
    },
    {
      option: 'Other',
    },
  ]);
  const DonateOptionList = ({item}) => {
    return (
      <View
        style={[
          GlobalStyles.flexRow1,
          {
            justifyContent: 'space-between',
            paddingVertical: 10,
          },
        ]}>
        <View style={[GlobalStyles.flexRow1]}>
          <EIcon name="dot-single" size={20} color={AppColor.greenButton} />
          <Text style={{color: AppColor.darkGray, fontSize: 16, marginLeft: 5}}>
            {item?.option}
          </Text>
        </View>
        <MIcon name="chevron-right" size={20} color={AppColor.lightGray} />
      </View>
    );
  };
  return (
    <View style={[GlobalStyles.container, {padding: 10}]}>
      <View>
        <FlatList data={donateForOptions} renderItem={DonateOptionList} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default DonationDonatefor;
