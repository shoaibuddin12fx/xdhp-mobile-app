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
import {Button} from 'react-native-paper';
import {AppColor} from '../../shared/appColors';
import {GlobalStyles} from '../../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating-widget';
import {Loader} from '../LoaderComponent';
import {ServiceApi} from '../../Api/ServiceApi';

function ProductDetails(props) {
  const {navigation, route, data} = props;
  const [shopDetails, setShopDetails] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  console.log('ProductReview', data);

  useEffect(() => {
    getShop();
  }, []);

  const getShop = async () => {
    showLoader();
    var result = await new ServiceApi().shopId(
      data?.shop_id ?? data?.product_shop_id,
    );

    if (result && result.data) {
      hideLoader();
      setShopDetails(result.data[0]);
    } else {
      hideLoader();
      alert('Something went wrong in getShop');
    }
  };

  return (
    <View style={styles.viewStyle}>
      <View style={{padding: 5}}>
        {/* <Image
          source={require('../Assets/watch.png')}
          style={styles.imageStyle}
        /> */}

        <View style={styles.bottomLine}>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                // justifyContent: 'space-between',
                // alignItems: 'center',
                // paddingHorizontal: 5,
                marginTop: 10,
              },
            ]}>
            <Image
              source={{uri: data?.product_image}}
              style={styles.imageStyle}
            />
            <View
              style={[
                GlobalStyles.flexRow,
                {
                  justifyContent: 'space-between',
                  // backgroundColor: 'red',
                  width: Dimensions.get('window').width / 1.38,
                },
              ]}>
              <View style={{marginTop: 15, marginLeft: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: AppColor.black,
                    marginLeft: 4,
                  }}>
                  {data?.name}
                </Text>
                {/* <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', marginTop: 10},
                  ]}>
                  <StarRating
                    style={{marginTop: 1}}
                    rating={3}
                    color={'#fdd835'}
                    starSize="12"
                    maxStars={5}
                    //   onChange={setRating}
                  />
                  <Text style={{color: AppColor.lightGray, fontSize: 10}}>
                    {'3.5 | 50 Reviews'}
                  </Text>
                </View> */}
              </View>
              {/* <Image
                source={require('../../Assets/Share.png')}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              /> */}
            </View>
          </View>

          <View
            style={[
              GlobalStyles.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 40,
                marginTop: 20,
                // backgroundColor: 'red',
              },
            ]}>
            <Text
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 8,
                backgroundColor: AppColor.darkGray,
                color: AppColor.white,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {`$ ${!data?.product_price ? data?.price : data?.product_price}`}
            </Text>
            {/* <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <Text
                style={{
                  color: AppColor.lightGray,
                  fontSize: 18,
                }}>
                {'$2000 '}
              </Text>
              <Text
                style={{
                  color: AppColor.black,
                  fontSize: 18,
                }}>
                {'| 25%Off'}
              </Text>
            </View> */}
          </View>
        </View>
        <View style={[styles.bottomLine, {marginTop: 10}]}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon name="phone" size={24} color={AppColor.greenButton} />
            <Text style={{color: AppColor.lightGray, marginLeft: 10}}>
              {shopDetails?.contact_no}
            </Text>
          </View>
          <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
            <Icon name="email" size={24} color={AppColor.greenButton} />
            <Text style={{color: AppColor.lightGray, marginLeft: 10}}>
              {shopDetails?.email}
            </Text>
          </View>
        </View>
        <View style={styles.bottomLine}>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 20,
              },
            ]}>
            <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <Text style={[styles.fontStyle, {color: AppColor.black}]}>
                {'Seller: '}
              </Text>
              <Text style={[styles.fontStyle, {color: AppColor.greenButton}]}>
                {shopDetails?.name}
              </Text>
            </View>
            <Image
              source={require('../../Assets/samsungIcon.png')}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={[styles.bottomLine, {marginTop: 10}]}>
          <Text
            style={{
              fontSize: 18,
              color: AppColor.darkGray,
              fontWeight: 'bold',
            }}>
            {'Product Detail'}
          </Text>
          <Text
            numberOfLines={5}
            style={[styles.detail, GlobalStyles.marginTop]}>
            {data?.description}
          </Text>
        </View>

        {/* <View
          style={[
            GlobalStyles.flexRow,
            {alignItems: 'center', alignSelf: 'center', marginTop: 40},
          ]}>
          <Button
            style={[GlobalStyles.greenbutton2]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            // onPress={() => navigation.navigate('home')}
            labelStyle={GlobalStyles.buttonHrLbl}>
            BUY NOW
          </Button>
          <Button
            style={[GlobalStyles.blackbutton2]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            // onPress={() => navigation.navigate('home')}
            labelStyle={GlobalStyles.buttonHrLbl}>
            ADD TO CART
          </Button>
        </View> */}
      </View>
      {loaderVisible && (
        <Loader
          loaderVisible={loaderVisible}
          setLoaderVisible={setLoaderVisible}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    // paddingVertical: 20,
    paddingBottom: 20,
  },
  colorView: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  detail: {
    color: AppColor.lightGray,
    width: '95%',
    // marginTop: 10,
  },
  fontStyle: {
    fontSize: 20,
  },
  imageStyle: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    borderRadius: 10,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  navigationBarStyle: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    // flex: 1,
    height: Dimensions.get('window').height / 1.3,
    backgroundColor: AppColor.white,
    marginLeft: -5,
    marginRight: -5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default ProductDetails;
