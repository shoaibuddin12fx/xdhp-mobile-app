import React, {useEffect, useState, useRef, useCallback} from 'react';
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
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Switch} from 'react-native-paper';

function Categories(props) {
  const {navigation, route} = props;
  const [btnColor, setBtnColor] = useState(1);
  const [itemView, setItemView] = useState(true);
  const [itemView2, setItemView2] = useState(true);
  const categoriesItems = [
    {
      text: 'DHP Fashion',
      type: 1,
    },
    {
      text: 'Cell Phone & Devices',
      type: 2,
    },
    {
      text: 'Computer & Gaming',
      type: 3,
    },
    {
      text: 'Camera',
      type: 4,
    },
    {
      text: 'Men Fashion',
      type: 5,
    },
    {
      text: 'Women Fashion',
      type: 6,
    },
    {
      text: 'Kids Store',
      type: 7,
    },
    {
      text: 'Health & Beauty',
      type: 8,
    },
    {
      text: 'Home & LifeStyle',
      type: 9,
    },
    {
      text: 'Sports & Outdoor',
      type: 10,
    },
    {
      text: 'Grocery',
      type: 11,
    },
    {
      text: 'Gift',
      type: 12,
    },
    // {
    //   bgColor: '#e5faff',
    //   text: 'On Sale',
    //   image: require('../Assets/DHP03/Shop/Retail/sale.png'),
    // },
  ];
  return (
    <View
      style={[
        GlobalStyles.container3,
        {paddingHorizontal: 10, paddingVertical: 10},
      ]}>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categoriesItems.map(item => (
            <Pressable
              onPress={() => {
                switch (item.type) {
                  case 1:
                    setBtnColor(item.type);
                    // setFilterNotification(notifications);
                    break;
                  default:
                    setBtnColor(item.type);
                    // console.log('item.Type', item.type);
                    // let filterItem = notifications.filter(
                    //   x => x.type == item.type,
                    // );
                    // console.log('filterItem', filterItem);
                    // setFilterNotification(filterItem);
                    break;
                }
              }}>
              <View
                style={[
                  styles.notificationBtn,
                  {
                    backgroundColor:
                      item.type == btnColor
                        ? AppColor.greenButton
                        : AppColor.lightGray,
                  },
                ]}>
                <Text
                  style={{
                    color:
                      item.type == btnColor ? AppColor.white : AppColor.black,
                  }}>
                  {item.text}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={{marginTop: 15}}>
        <View
          style={{
            borderTopWidth: 1,
            // borderBottomWidth: itemView ? 0 : 1,
            borderColor: AppColor.lightGray,
            paddingVertical: 10,
          }}>
          <View
            style={[GlobalStyles.flexRow1, {justifyContent: 'space-between'}]}>
            <Text style={{fontSize: 19, color: AppColor.darkGray}}>
              Call Phones
            </Text>
            <Icon
              name={itemView ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={AppColor.greenButton}
              onPress={() => {
                setItemView(!itemView);
              }}
            />
          </View>

          {itemView && (
            <View style={{marginTop: 15, paddingHorizontal: 10}}>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>
                  {'  Samsung Phone'}
                </Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  LG Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  Sony Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  ASUS Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  IPhone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  Other'}</Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: itemView ? 0 : 1,
            borderColor: AppColor.lightGray,
            paddingVertical: 10,
          }}>
          <View
            style={[GlobalStyles.flexRow1, {justifyContent: 'space-between'}]}>
            <Text style={{fontSize: 19, color: AppColor.darkGray}}>
              Call Phones
            </Text>
            <Icon
              name={itemView2 ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={AppColor.greenButton}
              onPress={() => {
                setItemView2(!itemView2);
              }}
            />
          </View>

          {itemView2 && (
            <View style={{marginTop: 15, paddingHorizontal: 10}}>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>
                  {'  Samsung Phone'}
                </Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  LG Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  Sony Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  ASUS Phone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  IPhone'}</Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginBottom: 10}]}>
                <Icon name="circle" size={5} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray}}>{'  Other'}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  deleteORSelect: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 10,
  },
  lineView: {
    width: '100%',
    height: 3,
    backgroundColor: AppColor.appBg,
    marginTop: 20,
  },
  notificationBtn: {
    width: 170,
    height: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: AppColor.white,
    fontSize: 13,
  },
  rowFront: {
    alignItems: 'center',
    // backgroundColor: AppColor.white,
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    height: 60,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: AppColor.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: AppColor.darkGray,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'tomato',
    right: 0,
  },
});

export default Categories;
