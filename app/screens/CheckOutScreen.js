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
import {Button, IconButton, Switch} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {resetRoute} from '../helpers/navigationHelper';
import {object} from 'yup';

function CheckOutScreen(props) {
  const {navigation, route} = props;
  const shippingDetails = route?.params?.shippingDetails ?? {
    shipping: {},
    isBillingSame: true,
    billing: {},
  };
  console.log('shippingDetails', shippingDetails);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [shippingAddress, setShippingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [apply, setApply] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // alert('Agaya me');
      cartProduct();
    });
  }, []);

  useEffect(() => {
    console.log('PARAMS...', route.params?.shippingDetails);
  }, [route.params?.shippingDetails]);

  const cartProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getCartProducts();
    console.log('456456', result);
    if (result && result.data) {
      hideLoader();

      setCartProducts(result.data);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const orderDone = async data => {
    showLoader();
    var result = await new ServiceApi().orderCheckOut(data);
    console.log('newOrderDone', result);
    if (result && result.data) {
      hideLoader();

      resetRoute('home');
    } else {
      hideLoader();
      alert(result?.message ?? 'Something went wrong');
      // result?.message ??
    }
  };

  const allCartProdust = ({item}) => {
    console.log('itemitem', item);
    let price = cartProducts.map(item => item.price * item.product_qty);
    // console.log('123456', price);
    let sum = price.reduce((a, b) => a + b, 0);
    setTotal(sum);
    // setAdd(item?.product_qty);
    // console.log('dataaaaa', item?.product_qty);
    return (
      <View
        style={[
          GlobalStyles.flexRow,
          {
            width: '98%',
            alignSelf: 'center',
            // backgroundColor:"red",
            marginTop: 15,
            paddingVertical: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: AppColor.lightGray2,
          },
        ]}>
        <Image
          source={{uri: item?.product_image}}
          style={{width: 60, height: 60, borderRadius: 10}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{color: AppColor.darkGray, fontSize: 16, fontWeight: '500'}}>
            {item?.name}
          </Text>
          {/* <StarRating
          style={{marginLeft: -5, marginTop: 2, width: 10}}
          rating={4}
          color={'#fdd835'}
          starSize="14"
          maxStars={5}  
          //   onChange={setRating}
        /> */}
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                justifyContent: 'space-between',
                marginTop: 5,
                width: Dimensions.get('window').width / 1.32,
              },
            ]}>
            <Text
              style={{
                backgroundColor: AppColor.darkGray,
                paddingHorizontal: 8,
                paddingVertical: 1,
                borderRadius: 5,
                color: AppColor.white,
              }}>
              {'$ ' + item?.price}
            </Text>
            <Text style={{color: AppColor.darkGray, fontSize: 12}}>
              {'Qty: ' + item?.product_qty}
            </Text>
          </View>
          {/* <View style={[GlobalStyles.flexRow1, {marginTop: 3}]}>
          <Text style={{color: AppColor.lightGray, fontSize: 12}}>
            {'$760'}
          </Text>
          <Text style={{color: AppColor.darkGray, fontSize: 12}}>
            {'| 25%Off'}
          </Text>
        </View> */}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        GlobalStyles.container3,
        {paddingHorizontal: 10, paddingVertical: 10, position: 'relative'},
      ]}>
      <View style={[GlobalStyles.flexRow1, {width: '100%', marginTop: 10}]}>
        <Image
          source={require('../Assets/file.png')}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              justifyContent: 'space-between',
              width: Dimensions.get('window').width / 1.1,
            },
          ]}>
          <Text
            style={{color: AppColor.darkGray, marginLeft: 10, fontSize: 16}}>
            Shipping Address
          </Text>

          <IconButton
            style={{marginRight: -2}}
            icon={
              Object.keys(shippingDetails.shipping).length != 0
                ? 'square-edit-outline'
                : 'plus-circle-outline'
            }
            size={24}
            color={AppColor.greenButton}
            onPress={() => {
              navigation.navigate('shippingAddress', {shippingDetails});
            }}
          />
          {/* <Pressable
            onPress={() => {
             
              // setShippingAddress(!shippingAddress);
            }}>
            <Image
              source={require('../Assets/pencil.png')}
              tintColor={AppColor.greenButton}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </Pressable> */}
        </View>
      </View>

      {Object.keys(shippingDetails.billing).length != 0 && (
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              width: '100%',
              marginTop: 15,
              borderTopWidth: 1,
              borderColor: AppColor.lightGray2,
            },
          ]}>
          <Image
            source={require('../Assets/file.png')}
            style={{width: 20, height: 20, resizeMode: 'contain'}}
          />
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                justifyContent: 'space-between',
                width: Dimensions.get('window').width / 1.1,
              },
            ]}>
            <Text
              style={{color: AppColor.darkGray, marginLeft: 10, fontSize: 16}}>
              Billing Address
            </Text>

            <IconButton
              style={{marginRight: -2}}
              icon={
                Object.keys(shippingDetails.billing).length != 0
                  ? 'square-edit-outline'
                  : 'plus-circle-outline'
              }
              size={24}
              color={AppColor.greenButton}
              onPress={() => {
                navigation.navigate('shippingAddress', {shippingDetails});
              }}
            />
            {/* <Pressable
            onPress={() => {
             
              // setShippingAddress(!shippingAddress);
            }}>
            <Image
              source={require('../Assets/pencil.png')}
              tintColor={AppColor.greenButton}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </Pressable> */}
          </View>
        </View>
      )}

      {/* {shippingAddress && (
        <View style={[GlobalStyles.marginTop20]}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon
              name="phone"
              size={24}
              color={AppColor.greenButton}
              onPress={() => {}}
            />

            <TextInput
              style={[styles.phoneInput]}
              placeholderTextColor={AppColor.lightGray}
              keyboardType="email-address"
              onChangeText={value => {
                setPhone(value);
              }}
              value={phone}
              placeholder="Phone"
            />
          
          </View>

          <View style={[GlobalStyles.flexRow1, GlobalStyles.marginTop]}>
            <Icon
              name="email"
              size={24}
              color={AppColor.greenButton}
              onPress={() => {}}
            />

            <TextInput
              style={[styles.phoneInput]}
              placeholderTextColor={AppColor.lightGray}
              keyboardType="email-address"
              onChangeText={value => {
                setEmail(value);
              }}
              value={email}
              placeholder="Email"
            />
        
          </View>
        </View>
      )} */}

      {/* <View style={[GlobalStyles.flexRow1, {width: '100%', marginTop: 20}]}>
        <Image
          source={require('../Assets/file.png')}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              justifyContent: 'space-between',
              width: Dimensions.get('window').width / 1.1,
            },
          ]}>
          <Text
            style={{color: AppColor.darkGray, marginLeft: 10, fontSize: 16}}>
            Billing address
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('shippingAddress');
              // setBillingAddress(!billingAddress);
            }}>
            <Image
              source={require('../Assets/pencil.png')}
              tintColor={AppColor.greenButton}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </Pressable>
        </View>
      </View> */}

      {/* {billingAddress && (
        <View style={[GlobalStyles.marginTop20]}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon
              name="phone"
              size={24}
              color={AppColor.greenButton}
              onPress={() => {}}
            />

            <TextInput
              style={[styles.phoneInput]}
              placeholderTextColor={AppColor.lightGray}
              keyboardType="email-address"
              onChangeText={value => {
                setPhone(value);
              }}
              value={phone}
              placeholder="Phone"
            />
           
          </View>

          <View style={[GlobalStyles.flexRow1, GlobalStyles.marginTop]}>
            <Icon
              name="email"
              size={24}
              color={AppColor.greenButton}
              onPress={() => {}}
            />

            <TextInput
              style={[styles.phoneInput]}
              placeholderTextColor={AppColor.lightGray}
              keyboardType="email-address"
              onChangeText={value => {
                setEmail(value);
              }}
              value={email}
              placeholder="Email"
            />
           
          </View>
        </View>
      )} */}

      <View style={{flex: 1, paddingBottom: 10}}>
        <FlatList data={cartProducts} renderItem={allCartProdust} />
      </View>

      {/* <View
        style={[
          GlobalStyles.flexRow,
          {
            marginTop: 15,
            paddingVertical: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: AppColor.lightGray2,
          },
        ]}>
        <Image
          source={require('../Assets/mobWithBg.png')}
          style={{width: 60, height: 60, borderRadius: 10}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{color: AppColor.darkGray, fontSize: 16, fontWeight: '500'}}>
            Samsung Note 10
          </Text>
          <StarRating
            style={{marginLeft: -5, marginTop: 2, width: 10}}
            rating={4}
            color={'#fdd835'}
            starSize="14"
            maxStars={5}
            //   onChange={setRating}
          />
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                justifyContent: 'space-between',
                marginTop: 5,
                width: Dimensions.get('window').width / 1.32,
              },
            ]}>
            <Text
              style={{
                backgroundColor: AppColor.darkGray,
                paddingHorizontal: 8,
                paddingVertical: 1,
                borderRadius: 5,
                color: AppColor.white,
              }}>
              {'$ 760'}
            </Text>
            <Text style={{color: AppColor.darkGray, fontSize: 12}}>
              {'Qty: 1'}
            </Text>
          </View>
          <View style={[GlobalStyles.flexRow1, {marginTop: 3}]}>
            <Text style={{color: AppColor.lightGray, fontSize: 12}}>
              {'$760'}
            </Text>
            <Text style={{color: AppColor.darkGray, fontSize: 12}}>
              {'| 25%Off'}
            </Text>
          </View>
        </View>
      </View> */}

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: AppColor.white,
          zIndex: 1,
          elevation: 10,
          height: 150,
          paddingVertical: 10,
          // width: '100%',
          // paddingHorizontal: 10,
          // justifyContent: 'center',
        }}>
        <View style={[GlobalStyles.flexRow1, {paddingHorizontal: 10}]}>
          <TextInput
            style={[styles.textInputStyle]}
            placeholderTextColor={AppColor.darkGray}
            onChangeText={value => {
              setApply(value);
            }}
            value={apply}
            placeholder="Enter Voucher Code ( if any)"
          />
          <Button
            style={[styles.trackBtn]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {}}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 13}]}>
            Apply
          </Button>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: AppColor.lightGray2,
            marginTop: 15,
            marginBottom: 15,
            width: Dimensions.get('window').width / 1,
          }}
        />
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingBottom: 10,
            },
          ]}>
          <View>
            {/* <View style={[GlobalStyles.flexRow1]}>
              <Text style={{color: AppColor.darkGray}}>{'Shipping: '}</Text>
              <Text style={{color: AppColor.greenButton}}>$60</Text>
            </View> */}
            <View style={[GlobalStyles.flexRow1, {marginTop: 5}]}>
              <Text style={{color: AppColor.darkGray}}>{'Total: '}</Text>
              <Text style={{color: AppColor.greenButton}}>{'$' + total}</Text>
            </View>
          </View>
          <Button
            style={[styles.PROCEED]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {
              if (Object.keys(shippingDetails?.shipping).length != 0) {
                var cartId = cartProducts[0].user_cart_id;
                console.log('cartId', cartId);
                let apiDate = {
                  cart_id: cartId,
                  shipping_charges: 50,
                  user_coupon_id: 0,
                  gross_amount: total,
                  payment_method_id: 1,
                  name: shippingDetails?.shipping?.name,
                  email: shippingDetails?.shipping?.email,
                  phone_number: shippingDetails?.shipping?.phone_number,
                  address: shippingDetails?.shipping?.address,
                  city_id: shippingDetails?.shipping?.city_id,
                  country_id: shippingDetails?.shipping?.country_id,
                  status_id: 2,
                };
                console.log('newOrder', apiDate);
                orderDone(apiDate);
              } else {
                alert('Please Add Address');
              }
            }}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 11}]}>
            PROCEED TO PAY
          </Button>
        </View>
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
  phoneInput: {
    // textAlign: 'center',
    backgroundColor: AppColor.lightGray2,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width / 1.15,
    height: 40,
    fontSize: 15,
    color: AppColor.darkGray,
    marginLeft: 10,
  },
  textInputStyle: {
    backgroundColor: AppColor.lightGray2,
    width: '68%',
    color: AppColor.lightGray,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 5,
  },
  trackBtn: {
    backgroundColor: AppColor.darkGray,
    height: 40,
    borderRadius: 0,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  PROCEED: {
    backgroundColor: AppColor.greenButton,
    height: 40,
    borderRadius: 0,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});

export default CheckOutScreen;
