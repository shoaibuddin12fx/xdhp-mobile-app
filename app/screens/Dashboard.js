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
import RetailerCategories from '../components/RetailerCategories';
import HomeComponent from '../components/HomeComponent';
// import RetailerOnSale from '../components/RetailerMyOrder';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {getUser, removeUser, storeData} from '../helpers/localStorage';
import {resetRoute} from '../helpers/navigationHelper';
import RetailerMyOrder from '../components/RetailerMyOrder';

// const onpressNavigate = {
//   home: 1,
//   categories: 2,
//   myOrder: 3,
//   customer: 4,
// };

function Dashboard(props) {
  const {navigation, route} = props;
  const onpressNavigate = {
    home: 1,
    categories: 2,
    myOrder: 3,
    customer: 4,
  };
  const [navigationEnum, setNavigationEnum] = useState(onpressNavigate.home);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [cartCount, setCartCount] = useState([]);
  const [orderCount, setOrderCount] = useState([]);
  const [carCountView, setCartCountView] = useState(false);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    showLoader();
    var result = await new ServiceApi().getProductData();
    // console.log('getProductData', result);
    if (result && result.data) {
      hideLoader();
      storeData('produstData', result.data, true);
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      // alert('Agaya me');
      cartProduct();
    });
  }, []);

  const cartProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getCartProducts();
    console.log('cartProduct', result);
    if (result) {
      hideLoader();
      setCartCount(result.data?.length ?? 0);

      // setCartCountView(false);
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      // alert('Agaya me');
      getOrder();
    });
  }, []);

  const getOrder = async () => {
    let user = await getUser();
    console.log('getUserData', user?.userData[0].id);
    showLoader();
    var result = await new ServiceApi().checkOrder(user?.userData[0].id);
    console.log('setOrderCount', result);
    if (result && result.data) {
      hideLoader();
      setOrderCount(result.data?.length ?? 0);
    } else {
      hideLoader();
      // alert('Something went wrong in getOrder');
    }
  };

  const icons = [
    // {
    //   icon: require('../Assets/message.png'),
    //   // onPress: () => {
    //   //   navigation.navigate('myCart');
    //   // },
    // },
    // {
    //   icon: require('../Assets/bell.png'),
    // },
    {
      icon: require('../Assets/cart-outline.png'),
      // onPress: () => {
      //   navigation.navigate('myCart');
      // },
    },
    // {
    //   icon: require('../Assets/search.png'),
    // },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            // justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 10,
          }}>
          {icons.map(item => (
            <Pressable
              onPress={() => {
                if (cartCount > 0) {
                  navigation.navigate('myCart');
                } else {
                  alert('Cart is empty');
                }
              }}>
              <View style={{position: 'relative'}}>
                {cartCount > 0 && (
                  <View
                    style={{
                      // padding: 1,
                      backgroundColor: AppColor.cancel,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 18,
                      height: 18,
                      borderRadius: 10,
                      position: 'absolute',
                      zIndex: 1,
                      top: -10,
                      right: 0,
                    }}>
                    <Text style={{color: AppColor.white, fontSize: 12}}>
                      {cartCount}
                    </Text>
                  </View>
                )}
                <Image
                  source={item.icon}
                  style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                />
              </View>
            </Pressable>
          ))}
          <Icon
            name="logout"
            size={20}
            color={AppColor.darkGray}
            onPress={() => {
              removeUser();
              resetRoute('selection');
            }}
          />
        </View>
      ),
    });
  }, [navigation, cartCount]);

  // const Templates = [
  //   {
  //     image: require('../Assets/watch.png'),
  //     title: 'NJ WEARS',
  //     text: 'NJ Watch',
  //     price: '100',
  //   },
  //   {
  //     image: require('../Assets/watch.png'),
  //     title: 'NJ WEARS',
  //     text: 'NJ Watch',
  //     price: '100',
  //   },
  //   {
  //     image: require('../Assets/watch.png'),
  //     title: 'NJ WEARS',
  //     text: 'NJ Watch',
  //     price: '100',
  //   },
  //   {
  //     image: require('../Assets/watch.png'),
  //     title: 'NJ WEARS',
  //     text: 'NJ Watch',
  //     price: '100',
  //   },
  //   {
  //     image: require('../Assets/watch.png'),
  //     title: 'NJ WEARS',
  //     text: 'NJ Watch',
  //     price: '100',
  //   },
  // ];

  // const DATA = [
  //   {
  //     bgColor: '#e5faff',
  //     bg: AppColor.greenButton,
  //     text: 'DHP Fashion',
  //     image: require('../Assets/mobile.png'),
  //   },
  //   {
  //     bgColor: '#e7ecff',
  //     bg: AppColor.greenButton,
  //     text: 'DHP Fashion',
  //     image: require('../Assets/laptop.png'),
  //   },
  //   {
  //     bgColor: '#ffe7e7',
  //     bg: AppColor.greenButton,
  //     text: 'DHP Fashion',
  //     image: require('../Assets/mobile.png'),
  //   },
  //   {
  //     bgColor: '#ebfee8',
  //     bg: AppColor.greenButton,
  //     text: 'DHP Fashion',
  //     image: require('../Assets/laptop.png'),
  //   },
  //   {
  //     bgColor: '#e5faff',
  //     bg: AppColor.greenButton,
  //     text: 'DHP Fashion',
  //     image: require('../Assets/mobile.png'),
  //   },
  // ];

  // const SliderImages = [
  //   {
  //     banner: require('../Assets/watch.png'),
  //     type: 1,
  //   },
  //   {
  //     banner: require('../Assets/shoes.png'),
  //     type: 2,
  //   },
  //   {
  //     banner: require('../Assets/watch2.png'),
  //     type: 3,
  //   },
  //   {
  //     banner: require('../Assets/laptop2.png'),
  //     type: 4,
  //   },
  // ];

  // const CategoriesStyle = ({item}) => {
  //   return (
  //     <View
  //       style={[
  //         GlobalStyles.container,
  //         GlobalStyles.centered,
  //         {
  //           width: 110,
  //           backgroundColor: AppColor.white,
  //           padding: 5,
  //           borderRadius: 10,
  //           marginTop: 10,
  //           marginRight: 15,
  //         },
  //       ]}>
  //       <View
  //         style={[
  //           {
  //             height: 70,
  //             width: 100,
  //             //   marginTop: 20,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             //   marginRight: 15,
  //             borderRadius: 10,
  //             backgroundColor: item.bgColor,
  //           },
  //         ]}>
  //         <Image
  //           style={{
  //             alignSelf: 'center',
  //             resizeMode: 'contain',
  //             width: 80,
  //             height: 80,
  //             marginTop: -20,
  //           }}
  //           source={item.image}
  //         />
  //       </View>
  //       <Text
  //         style={{
  //           marginTop: 10,
  //           paddingBottom: 10,
  //           color: AppColor.darkGray,
  //           fontWeight: '500',
  //         }}>
  //         {item.text}
  //       </Text>
  //     </View>
  //   );
  // };

  // const FeaturedStyle = ({item}) => {
  //   return (
  //     <View
  //       style={[
  //         GlobalStyles.container,
  //         //   GlobalStyles.centered,
  //         {
  //           // width: 110,
  //           backgroundColor: AppColor.white,
  //           padding: 5,
  //           borderRadius: 10,
  //           marginRight: 15,
  //         },
  //       ]}>
  //       <Image
  //         style={{
  //           alignSelf: 'center',
  //           resizeMode: 'contain',
  //           width: 130,
  //           height: 130,
  //         }}
  //         source={item.image}
  //       />
  //       {/* </View> */}
  //       <View style={{marginLeft: 5}}>
  //         <Text
  //           style={{
  //             marginTop: 5,

  //             color: AppColor.lightGray,
  //             fontWeight: '500',
  //             fontSize: 10,
  //           }}>
  //           {item.title}
  //         </Text>
  //         <Text
  //           style={{
  //             //   marginTop: 10,
  //             paddingBottom: 10,
  //             color: AppColor.darkGray,
  //             fontWeight: '500',
  //             fontSize: 13,
  //           }}>
  //           {item.text}
  //         </Text>

  //         <Text
  //           style={{
  //             color: AppColor.white,
  //             fontSize: 12,
  //             fontWeight: '500',
  //             padding: 3,
  //             width: 45,
  //             backgroundColor: AppColor.darkGray,
  //             borderRadius: 5,
  //             marginBottom: 10,
  //           }}>
  //           {' $ ' + item.price}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  // const OnSaleStyle = ({item}) => {
  //   return (
  //     <View
  //       style={[
  //         GlobalStyles.container,
  //         //   GlobalStyles.centered,
  //         {
  //           // width: 110,
  //           backgroundColor: AppColor.white,
  //           padding: 5,
  //           borderRadius: 10,
  //           marginRight: 15,
  //         },
  //       ]}>
  //       <Image
  //         style={{
  //           alignSelf: 'center',
  //           resizeMode: 'contain',
  //           width: 130,
  //           height: 130,
  //         }}
  //         source={require('../Assets/mob.png')}
  //       />
  //       {/* </View> */}
  //       <View style={{marginLeft: 5}}>
  //         <Text
  //           style={{
  //             marginTop: 5,

  //             color: AppColor.lightGray,
  //             fontWeight: '500',
  //             fontSize: 10,
  //           }}>
  //           {item.title}
  //         </Text>
  //         <Text
  //           style={{
  //             //   marginTop: 10,
  //             paddingBottom: 10,
  //             color: AppColor.darkGray,
  //             fontWeight: '500',
  //             fontSize: 13,
  //           }}>
  //           {item.text}
  //         </Text>

  //         <Text
  //           style={{
  //             color: AppColor.white,
  //             fontSize: 12,
  //             fontWeight: '500',
  //             padding: 3,
  //             width: 45,
  //             backgroundColor: AppColor.darkGray,
  //             borderRadius: 5,
  //             marginBottom: 10,
  //           }}>
  //           {' $ ' + item.price}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <ScrollView>
      <View style={[styles.container]}>
        {/* <View> */}
        <View
          style={[
            GlobalStyles.flexRow,
            {
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: AppColor.white,
              height: 50,
              marginLeft: -5,
              marginRight: -5,
              paddingHorizontal: 10,
            },
          ]}>
          <Pressable
            onPress={() => {
              setNavigationEnum(onpressNavigate.home);
            }}>
            <View style={[styles.navigationBarStyle]}>
              <Text
                style={{
                  color:
                    navigationEnum == 1 ? AppColor.greenButton : AppColor.black,
                  fontSize: 14,
                }}>
                Homes
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      navigationEnum == 1
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setNavigationEnum(onpressNavigate.categories);
            }}>
            <View style={[styles.navigationBarStyle, {marginLeft: 20}]}>
              <Text
                style={{
                  color:
                    navigationEnum == 2 ? AppColor.greenButton : AppColor.black,
                  fontSize: 14,
                }}>
                Categories
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      navigationEnum == 2
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              if (orderCount > 0) {
                setNavigationEnum(onpressNavigate.myOrder);
              } else {
                alert('My Order is empty');
              }
            }}>
            <View style={[styles.navigationBarStyle, {marginRight: -10}]}>
              <Text
                style={{
                  color:
                    navigationEnum == 3 ? AppColor.greenButton : AppColor.black,
                  fontSize: 14,
                }}>
                My Orders
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      navigationEnum == 3
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable>
          {/* <Pressable
            onPress={() => {
              setNavigationEnum(onpressNavigate.customer);
            }}>
            <View style={[styles.navigationBarStyle]}>
              <Text
                style={{
                  color:
                    navigationEnum == navigationEnum.customer
                      ? AppColor.greenButton
                      : AppColor.black,
                  fontSize: 14,
                }}>
                Customer Care
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      navigationEnum == 4
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable> */}
        </View>
        {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={value => {
              console.log('Scrollvalue', value);
            }}>
            {SliderImages.map(banner => {
              return (
                <View>
                  <Image
                    style={{
                      alignSelf: 'center',
                      // resizeMode: 'contain',
                      width: Dimensions.get('window').width / 1.2,
                      height: 200,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                    source={banner.banner}
                  />
                </View>
              );
            })}
          </ScrollView> */}
        {navigationEnum == 1 && <HomeComponent navigation={navigation} />}

        {navigationEnum == 2 && <RetailerCategories navigation={navigation} />}

        {navigationEnum == 3 && <RetailerMyOrder navigation={navigation} />}

        {loaderVisible && (
          <Loader
            loaderVisible={loaderVisible}
            setLoaderVisible={setLoaderVisible}
          />
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    // paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  imageStyle2: {
    height: 30,
    width: '100%',
    // resizeMode: 'contain',
  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 90,
    height: 90,
  },
  imageStyle1: {
    // ...StyleSheet.absoluteFill,
    // top: -10,

    alignSelf: 'center',
    resizeMode: 'contain',
    width: 80,
    height: 80,
    alignContent: 'center',
    // zIndex: 1,
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
  footerStyle: {
    height: 60,
  },
  footerText: {
    color: AppColor.lightGray,
    // fontWeight: 'bold',
  },
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  listViewStyle: {
    height: 80,
    width: 100,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 10,
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  templateImageStyle: {
    // alignSelf: 'center',
    // resizeMode: 'contain',
    width: 130,
    height: 170,
    borderRadius: 10,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  navigationBarStyle: {
    // paddingRight: 10,
    // paddingLeft: 10,
    // paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 2,
    // borderColor: 'blue',
  },
  templatesStyle: {
    height: 170,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  studioText: {
    fontSize: 17,
    fontWeight: '500',
    // color:texts.textColor
  },
  viewStyle: {
    marginTop: 10,
    height: 100,
    // width: 340,
    borderRadius: 20,
    // backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Dashboard;
