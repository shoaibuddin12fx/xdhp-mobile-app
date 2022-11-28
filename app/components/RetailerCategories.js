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
} from 'react-native';
import {RaisedButton} from '../components/Button';
import {Button} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSlider from 'react-native-image-slider';
import {ImageCarousel} from 'image-auto-scroll';

function RetailerCategories(props) {
  const {navigation, route} = props;
  const categoriesItems = [
    {
      bgColor: '#e5faff',
      text: 'DHP Fashion',
      image: require('../Assets/DHP03/Shop/Retail/fashion.png'),
      id: 1,
    },
    {
      bgColor: '#e7ecff',
      text: 'Cell Phone & \n Devices',
      image: require('../Assets/DHP03/Shop/Retail/mob.png'),
      id: 2,
    },
    {
      bgColor: '#ffe7e7',
      text: 'Computer &\n Gaming',
      image: require('../Assets/DHP03/Shop/Retail/lap.png'),
      id: 3,
    },
    {
      bgColor: '#ebfee8',
      text: 'Camera',
      image: require('../Assets/DHP03/Shop/Retail/cam.png'),
      id: 4,
    },
    {
      bgColor: '#e5faff',
      text: 'Men Fashion',
      image: require('../Assets/DHP03/Shop/Retail/men.png'),
      id: 5,
    },
    {
      bgColor: '#ffe7e7',
      text: 'Women Fashion',
      image: require('../Assets/DHP03/Shop/Retail/women.png'),
      id: 6,
    },
    {
      bgColor: '#e7ecff',
      text: 'Kids Store',
      image: require('../Assets/DHP03/Shop/Retail/kids.png'),
      id: 7,
    },
    {
      bgColor: '#ffe7e7',
      text: 'Health &\n Beauty',
      image: require('../Assets/DHP03/Shop/Retail/beauty.png'),
      id: 8,
    },
    {
      bgColor: '#e5faff',
      text: 'Home &\n LifeStyle',
      image: require('../Assets/DHP03/Shop/Retail/lifeStyle.png'),
      id: 9,
    },
    {
      bgColor: '#e5faff',
      text: 'Sports \n Outdoor',
      image: require('../Assets/DHP03/Shop/Retail/sport.png'),
      id: 10,
    },
    {
      bgColor: '#ffe7e7',
      text: 'Grocery',
      image: require('../Assets/DHP03/Shop/Retail/Cookies.png'),
      id: 11,
    },
    // {
    //   bgColor: '#ebfee8',
    //   text: 'Gift',
    //   image: require('../Assets/DHP03/Shop/Retail/gift.png'),
    //   id: 12,
    // },
    {
      bgColor: '#e5faff',
      text: 'On Sale',
      image: require('../Assets/DHP03/Shop/Retail/sale.png'),
      id: 13,
    },
  ];

  const CategoriesStyle = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('productScreen', {obj: item});
          // navigation.navigate('productScreen',{id:item.id})
        }}>
        <View
          style={[
            GlobalStyles.container,
            GlobalStyles.centered,
            {
              width: Dimensions.get('window').width / 3.4,
              height: 130,
              backgroundColor: AppColor.white,
              padding: 5,
              borderRadius: 10,
              marginTop: 15,
              marginRight: 10,
              // alignSelf: 'center',
              justifyContent: 'center',
            },
          ]}>
          {(item.text == 'Cell Phone & \n Devices' ||
            item.text == 'Computer &\n Gaming' ||
            item.text == 'Health &\n Beauty' ||
            item.text == 'Home &\n LifeStyle' ||
            item.text == 'Sports \n Outdoor') && (
            <View style={{height: 12, backgroundColor: AppColor.white}}></View>
          )}
          <View
            style={[
              {
                height: 70,
                width: 100,
                //   marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                //   marginRight: 15,
                borderRadius: 10,
                backgroundColor: item.bgColor,
              },
            ]}>
            <Image
              style={{
                alignSelf: 'center',
                resizeMode: 'contain',
                width: 80,
                height: 80,
                marginTop: -20,
              }}
              source={item.image}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              paddingBottom: 10,
              color: AppColor.darkGray,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 13,
            }}>
            {item.text}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      <View
        style={[
          GlobalStyles.marginTop,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <FlatList
          // contentContainerStyle={{
          //   alignContent: 'center',

          // }}
          style={{marginHorizontal: 5}}
          data={categoriesItems}
          numColumns={3}
          //   horizontal={true}
          renderItem={CategoriesStyle}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default RetailerCategories;
