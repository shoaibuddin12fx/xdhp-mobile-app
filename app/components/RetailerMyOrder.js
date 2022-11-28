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
import {RaisedButton} from './Button';
import {Button} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSlider from 'react-native-image-slider';
import {ImageCarousel} from 'image-auto-scroll';
import StarRating from 'react-native-star-rating-widget';
import {Loader} from './LoaderComponent';
import {ServiceApi} from '../Api/ServiceApi';
import {getUser, getUserData} from '../helpers/localStorage';

function RetailerMyOrder(props) {
  const {navigation, route} = props;
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [filterOrder, setFilterOrder] = useState([]);
  const [order, setOrder] = useState([]);
  const [btnColor, setBtnColor] = useState(1);
  const buttonText = [
    {
      text: 'All',
      type: 1,
    },
    {
      text: 'Pending',
      type: 'pending',
    },
    {
      text: 'Shipped',
      type: 'In process',
    },
    {
      text: 'Canceled',
      type: 'canceled',
    },
    {
      text: 'Delivered',
      type: 'delivered',
    },
  ];

  const orderList = [
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '1000',
      status: 'Delivered',
      reting: 3,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Shipped',
      reting: 4,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '15000',
      status: 'Canceled',
      reting: 5,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Delivered',
      reting: 2,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Shipped',
      reting: 3,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Canceled',
      reting: 3,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Delivered',
      reting: 3,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Shipped',
      reting: 3,
    },
    {
      image: require('../Assets/mobWithBg.png'),
      productName: 'Samsung Note 10',
      price: '500',
      status: 'Canceled',
      reting: 3,
    },
  ];
  useEffect(() => {
    getOrder();
  }, []);

  // useEffect(() => {
  //   // navigation.addListener('focus', () => {
  //   setFilterOrder(order);
  //   // });
  // }, [order, filterOrder]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      setFilterOrder(order);
    });
  }, [order, filterOrder]);

  const getOrder = async () => {
    let user = await getUser();
    console.log('getUserData', user?.userData[0].id);
    showLoader();
    var result = await new ServiceApi().checkOrder(user?.userData[0].id);
    console.log('getOrder', result);
    if (result && result.data) {
      hideLoader();
      // let filterItem = result.data.filter(x => x.status == 'pending');
      //             console.log('filterItem', filterItem);
      setOrder(result.data);
      setFilterOrder(result.data);
    } else {
      hideLoader();
      alert('Something went wrong in getOrder');
    }
  };

  const AllOrders = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          console.log('AllOrders', item);
          navigation.navigate('trackOrder', {orderItem: item});
        }}>
        <View
          style={[
            GlobalStyles.flexRow,
            {
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderColor: AppColor.lightGray2,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 10,
            },
          ]}>
          <View>
            <Image
              source={{uri: item?.product_image}}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{marginLeft: 10, width: '95%'}}>
            <View
              style={[
                GlobalStyles.flexRow,
                {
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  width: '77%',
                  //   backgroundColor: 'red',s
                },
              ]}>
              <Text
                style={{
                  color: AppColor.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  color: AppColor.lightGray,
                  fontSize: 12,
                  marginRight: -2,
                }}>
                {'Track Order >'}
              </Text>
            </View>

            {/* <StarRating
              style={{width: 10, marginTop: 3, marginLeft: -3}}
              rating={3}
              color={'#fdd835'}
              starSize="13"
              maxStars={5}
              //   onChange={setRating}
            /> */}

            <View
              style={[
                GlobalStyles.flexRow,
                {
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // marginLeft: 10,
                  width: '77%',
                  marginTop: 30,
                  //   backgroundColor: 'red',s
                },
              ]}>
              <Text
                style={{
                  color: AppColor.white,
                  fontSize: 12,
                  fontWeight: '500',
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 2,
                  paddingBottom: 2,

                  //   width: 45,
                  backgroundColor: AppColor.darkGray,
                  borderRadius: 5,
                  //   marginBottom: 10,
                }}>
                {' $ ' + item?.price}
              </Text>
              <Text
                style={{
                  color:
                    item.status == 'Delivered'
                      ? AppColor.greenButton
                      : item.status == 'Canceled'
                      ? 'tomato'
                      : AppColor.black,
                  fontSize: 12,
                  //   marginRight: -2,
                }}>
                {item?.status}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View
      style={[
        GlobalStyles.container,
        {marginTop: 5, marginLeft: -5, marginRight: -5},
      ]}>
      <View
        style={[
          GlobalStyles.flexRow,
          {
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 5,
          },
        ]}>
        {buttonText.map(item => (
          <Pressable
            onPress={() => {
              var btnolor = 1;
              switch (item.type) {
                case 1:
                  console.log('1');
                  setBtnColor(item.type);
                  setFilterOrder(order);
                  break;
                // case 2:
                //   console.log('1');
                //   setBtnColor(item.type);
                //   let filterPendingItem = order.filter(
                //     x => x.status == 'pending',
                //   );
                //   console.log('filterItem', filterPendingItem);
                //   setFilterOrder(filterPendingItem);
                //   break;
                // case 3:
                //   console.log('1');
                //   setBtnColor(item.type);
                //   let filterInProcessItem = order.filter(
                //     x => x.status == 'In process',
                //   );
                //   console.log('filterInProcessItem', filterInProcessItem);
                //   setFilterOrder(filterInProcessItem);
                //   break;
                // case 4:
                //   console.log('1');
                //   setBtnColor(item.type);
                //   setFilterOrder(order);
                //   break;
                // case 5:
                //   console.log('1');
                //   setBtnColor(item.type);
                //   setFilterOrder(order);
                //   break;
                default:
                  setBtnColor(item.type);
                  console.log('item.Type', item.type);
                  let filterItem = order.filter(x => x.status == item.type);
                  console.log('aaaaaaaaaaaaaaaaaaaaaaa', filterItem);
                  setFilterOrder(filterItem);
                  break;
              }
            }}>
            <View
              style={[
                styles.btnStyle,
                {
                  backgroundColor:
                    item.type == btnColor
                      ? AppColor.greenButton
                      : AppColor.white,
                },
              ]}>
              <Text
                style={{
                  color:
                    item.type == btnColor ? AppColor.white : AppColor.black,
                  fontSize: 13,
                }}>
                {item.text}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{marginTop: 30}}>
        <FlatList data={filterOrder} renderItem={AllOrders} />
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
  btnStyle: {
    height: 30,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default RetailerMyOrder;
