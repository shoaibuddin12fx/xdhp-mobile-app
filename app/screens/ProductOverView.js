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
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating-widget';
import ProductDetails from '../components/productDetail/ProductDetails';
import ProductReview from '../components/productDetail/ProductReview';
import SameSeller from '../components/productDetail/SameSeller';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {storeData, getData} from '../helpers/localStorage';

function ProductOverView(props) {
  const {navigation, route} = props;
  const [quantity, setQuantity] = useState(1);
  const {obj} = route?.params;
  console.log('123456985', obj);
  const [viewType, setViewType] = useState('1');
  const [delivery, setDelivery] = useState(true);
  const [warrenty, setWarrenty] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [productDetail, setProductDetail] = useState();
  const [quantityView, setQuantityView] = useState(false);
  const [colors, setColors] = useState([]);
  const [skuPrice, setSkuPrice] = useState();
  const [skusData, setSkusData] = useState();
  const [shopDetails, setShopDetails] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [productId, setProductId] = useState(obj?.id);

  useEffect(() => {
    getProduct(obj?.id);
    ProductReviews();
  }, []);

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  useEffect(() => {
    if (productDetail) {
      getColor();
    }
  }, [productDetail, productId]);

  const getProduct = async id => {
    showLoader();
    // alert(id.toString());

    var result = await new ServiceApi().getProductById(id);
    console.log('125978334', result);
    if (result && result.data) {
      hideLoader();

      console.log('result.data.shop_id', result.data.skus);

      setProductDetail(result.data);
      setSkuPrice(result.data?.product_price);
    } else {
      hideLoader();
      alert('Something went wrong in getProduct');
    }
  };

  const ProductReviews = async () => {
    showLoader();
    var result = await new ServiceApi().getReviews(obj?.id);
    console.log('ProductReviewReview', result);
    if (result && result.data) {
      hideLoader();
      setProductReviews(result.data);
    }
  };

  const postCrateCart = async (data, navigate) => {
    showLoader();
    var result = await new ServiceApi().creatCart(data);
    console.log('postCrateCartresult.data', result.data);
    if (result && result.data) {
      hideLoader();
      console.log('myCart');
      // if (quantityView) {
      //   console.log('not');
      // } else {
      //   navigation.navigate('myCart');
      // }
      if (navigate) navigation.navigate('myCart');
    } else {
      hideLoader();
      alert('Something went wrong in postCrateCart');
    }
  };

  const getColor = async () => {
    let color = await getData('produstData', true);
    console.log('145647', color.colors);
    // console.log('productDetail.skus', productDetail?.skus);
    let filterColors = productDetail?.skus
      ?.filter(sku => color?.colors?.some(color => sku.color_id == color.id))
      .map((item, index) =>
        index == 0
          ? {
              ...item,
              selected: true,
              name: color?.colors?.filter(color => color.id == item.color_id)[0]
                .name,
            }
          : {
              ...item,
              selected: false,
              name: color?.colors?.filter(color => color.id == item.color_id)[0]
                .name,
            },
      );
    // let filterColors = color?.colors
    //   .filter(x => productDetail?.skus.some(y => y.color_id == x.id))
    //   .map((item, index) =>
    //     index == 0 ? {...item, selected: true} : {...item, selected: false},
    //   );
    console.log('258963', filterColors);
    setColors(filterColors);
  };

  const buttonText = [
    {
      text: 'Overview',
      type: 1,
    },
    {
      text: 'Product Detail',
      type: 2,
    },
    {
      text: 'Reviews',
      type: 3,
    },
    {
      text: 'Same Seller',
      type: 4,
    },
  ];

  const productColor = [
    {
      color: '#dc969e',
    },
    {
      color: '#87afe3',
    },
    {
      color: '#e4aff5',
    },
  ];

  return (
    <View style={[GlobalStyles.appBackground, {flex: 1}]}>
      <ScrollView>
        <View>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: AppColor.white,
                // width: '100%',
                height: 45,
                marginLeft: -5,
                marginRight: -5,
              },
            ]}>
            {buttonText?.map(item => (
              <Pressable
                onPress={() => {
                  var btnolor = 1;
                  switch (item.type) {
                    case 1:
                      console.log('1');
                      setViewType(item.type);
                      break;
                    case 2:
                      console.log('2');
                      setViewType(item.type);
                      break;
                    case 3:
                      console.log('3');
                      setViewType(item.type);
                      break;
                    case 4:
                      console.log('4');
                      setViewType(item.type);
                      break;
                  }
                }}>
                <View style={[styles.navigationBarStyle]}>
                  <Text
                    style={{
                      color:
                        item.type == viewType
                          ? AppColor.greenButton
                          : AppColor.black,
                      fontSize: 14,
                    }}>
                    {item.text}
                  </Text>
                  <View
                    style={[
                      styles.lineStyle,
                      {
                        backgroundColor:
                          item.type == viewType
                            ? AppColor.greenButton
                            : 'transparent',
                      },
                    ]}
                  />
                </View>
              </Pressable>
            ))}
          </View>

          {viewType == 1 && (
            <View style={{paddingBottom: 55}}>
              <View style={{padding: 5}}>
                <Image
                  source={{uri: productDetail?.product_image}}
                  style={styles.imageStyle}
                />
                <View style={styles.viewStyle}>
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      {
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        // backgroundColor: 'red',
                        marginTop: 10,
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColor.black,
                      }}>
                      {productDetail?.name}
                    </Text>
                    {/* <Image
                  source={require('../Assets/Share.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                  }}
                /> */}
                  </View>
                  {/* <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
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
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 40,
                        marginTop: 10,
                        // backgroundColor: 'red',
                      },
                    ]}>
                    <Text
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 5,
                        backgroundColor: AppColor.black,
                        color: AppColor.white,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 5,
                      }}>
                      {`$ ${
                        isNaN(skuPrice * quantity) == true
                          ? 0
                          : skuPrice * quantity
                      }`}
                    </Text>
                    {/* <Text
                  style={{
                    color: AppColor.lightGray,
                    fontSize: 18,
                  }}>
                  {'$2000 | 25%Off'}
                </Text> */}
                  </View>
                </View>
              </View>
              <View style={[styles.viewStyle, {marginHorizontal: 5}]}>
                <Text style={{fontSize: 18, color: AppColor.black}}>Color</Text>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', paddingLeft: 5, marginTop: 10},
                  ]}>
                  {colors?.map(item => {
                    // console.log('14789', item.name.toLowerCase());
                    return (
                      <Pressable
                        onPress={() => {
                          console.log('skuItem', item);

                          let filter = productDetail.skus?.filter(
                            x => x.color_id == item.color_id,
                          )[0];
                          console.log('filter', filter);
                          setColors(
                            colors.map((_Item, index) =>
                              _Item.id == item.id
                                ? {..._Item, selected: true}
                                : {..._Item, selected: false},
                            ),
                          );
                          setSkuPrice(filter.price);
                          // setSkusData(filter.id);
                        }}>
                        <View
                          style={[
                            styles.colorView,
                            {
                              backgroundColor: item.name.toLowerCase(),
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                          ]}>
                          {item.selected && (
                            <Icon
                              name="check"
                              size={20}
                              color={AppColor.white}
                            />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                  {/* {colors.map(item => (
                  
                ))} */}
                </View>

                {quantityView && (
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 40,
                        marginTop: 10,
                      },
                    ]}>
                    <Text style={{fontSize: 18, color: AppColor.black}}>
                      Quantity
                    </Text>
                    <View
                      style={{
                        backgroundColor: AppColor.lightGray2,
                        paddingTop: 5,
                        paddingLeft: 10,
                        paddingBottom: 5,
                        paddingRight: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 15,
                        width: '30%',
                      }}>
                      <Icon
                        name="minus"
                        size={20}
                        color={AppColor.greenButton}
                        onPress={() => {
                          if (quantity > 1) {
                            setQuantity(quantity - 1);
                            if (quantity > 0) {
                              let skusId = colors.filter(x => x.selected)[0];
                              console.log('skusId', skusId);
                              let apiData = {
                                product_id: productDetail?.id,
                                sku_id: skusId.id,
                                quantity: quantity - 1,
                              };
                              console.log('minus', apiData);
                              postCrateCart(apiData, false);
                            }
                          }
                        }}
                      />
                      <Text style={{color: AppColor.black}}>{quantity}</Text>
                      <Icon
                        name="plus"
                        size={20}
                        color={AppColor.greenButton}
                        onPress={() => {
                          setQuantity(quantity + 1);
                          if (quantity > 0) {
                            let skusId = colors.filter(x => x.selected)[0];
                            console.log('skusId', skusId);
                            let apiData = {
                              product_id: productDetail?.id,
                              sku_id: skusId.id,
                              quantity: quantity + 1,
                            };
                            console.log('plus', apiData);
                            postCrateCart(apiData, false);
                          }
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={[styles.viewStyle, {marginHorizontal: 5}]}>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: AppColor.black,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    Delivery Details
                  </Text>
                  <Icon
                    style={{marginRight: 5, marginTop: 10}}
                    name="chevron-down"
                    size={20}
                    color={AppColor.lightGray}
                    onPress={() => {
                      setDelivery(!delivery);
                    }}
                  />
                </View>

                {delivery && (
                  <View>
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        {alignItems: 'center', marginTop: 10},
                      ]}>
                      <Icon
                        name="map-marker-outline"
                        size={17}
                        color={AppColor.black}
                        onPress={() => {}}
                      />
                      <Text
                        style={{
                          color: AppColor.greenButton,
                          fontSize: 12,
                          marginLeft: 2,
                        }}>
                        {'Available '}
                      </Text>
                      <Text style={{color: AppColor.lightGray, fontSize: 12}}>
                        {'in Pakistan'}
                      </Text>
                    </View>
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        {alignItems: 'center', marginTop: 10},
                      ]}>
                      <Icon
                        name="credit-card-outline"
                        size={17}
                        color={AppColor.black}
                        onPress={() => {}}
                      />
                      <View
                        style={[
                          GlobalStyles.flexRow,
                          {
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '95%',
                          },
                        ]}>
                        <Text
                          style={{
                            color: AppColor.lightGray,
                            fontSize: 12,
                            marginLeft: 3,
                          }}>
                          {'Payment Methods'}
                        </Text>
                        <Image
                          source={require('../Assets/creditCards.png')}
                          style={{
                            height: 20,
                            width: 180,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <View style={[{marginHorizontal: 5}]}>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: AppColor.black,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    {'Return & Warrenty'}
                  </Text>
                  <Icon
                    style={{marginRight: 5, marginTop: 10}}
                    name="chevron-down"
                    size={20}
                    color={AppColor.lightGray}
                    onPress={() => {
                      setWarrenty(!warrenty);
                    }}
                  />
                </View>

                {warrenty && (
                  <View>
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        {alignItems: 'center', marginTop: 15},
                      ]}>
                      <Image
                        source={require('../Assets/document-lock-outline.png')}
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          color: AppColor.lightGray,
                          fontSize: 12,
                          marginLeft: 5,
                        }}>
                        {'No return policy '}
                      </Text>
                    </View>
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        {alignItems: 'center', marginTop: 15},
                      ]}>
                      <Image
                        source={require('../Assets/shield.png')}
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          color: AppColor.lightGray,
                          fontSize: 12,
                          marginLeft: 5,
                        }}>
                        {'1 Year exchange warrenty '}
                      </Text>
                    </View>
                  </View>
                )}
                {/* <View
                style={[
                  GlobalStyles.flexRow,
                  {alignItems: 'center', alignSelf: 'center', marginTop: 20},
                ]}>
                <Button
                  style={[GlobalStyles.greenbutton2]}
                  //   icon="arrow-right"
                  contentStyle={{flexDirection: 'row-reverse'}}
                  onPress={() => {
                    if (quantity > 0 && colors.filter(x => x.selected)[0]) {
                      let skusId = colors.filter(x => x.selected)[0];
                      console.log('skusId', skusId);
                      let apiData = {
                        product_id: obj?.id,
                        sku_id: skusId.id,
                        quantity: quantity,
                      };
                      console.log('orrrrrrr', apiData);
                      postCrateCart(apiData);
                    } else {
                      alert('Please add Quantity');
                      setQuantityView(true);
                    }
                    // navigation.navigate('myCart');
                  }}
                  labelStyle={GlobalStyles.buttonHrLbl}>
                  BUY NOW
                </Button>
                <Button
                  disabled={quantityView ? true : false}
                  style={[
                    GlobalStyles.blackbutton2,
                    {
                      backgroundColor: quantityView
                        ? 'rgba(34, 34, 34,0.7)'
                        : AppColor.darkGray,
                    },
                  ]}
                  //   icon="arrow-right"
                  contentStyle={{flexDirection: 'row-reverse'}}
                  onPress={() => setQuantityView(!quantityView)}
                  labelStyle={GlobalStyles.buttonHrLbl}>
                  ADD TO CART
                </Button>
              </View> */}
              </View>
            </View>
          )}
          {viewType == 2 && (
            // <View
            //   style={{
            //     flex: 1,
            //     backgroundColor: AppColor.greenButton,
            //     marginTop: 5,
            //   }}>
            <ProductDetails data={productDetail} />
            // </View>
          )}
          {viewType == 3 && <ProductReview data={productReviews} />}
          {viewType == 4 && (
            <SameSeller
              data={obj}
              setProductDetail={setProductDetail}
              setViewType={setViewType}
              setProductId={setProductId}
              setQuantityView={setQuantityView}
            />
          )}

          {loaderVisible && (
            <Loader
              loaderVisible={loaderVisible}
              setLoaderVisible={setLoaderVisible}
            />
          )}
          {/* <View
            style={[
              GlobalStyles.flexRow,
              {
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 0,
              },
            ]}>
            <Button
              style={[GlobalStyles.greenbutton2]}
              //   icon="arrow-right"
              contentStyle={{flexDirection: 'row-reverse'}}
              onPress={() => {
                if (quantity > 0 && colors.filter(x => x.selected)[0]) {
                  let skusId = colors.filter(x => x.selected)[0];
                  console.log('skusId', skusId);
                  let apiData = {
                    product_id: obj?.id,
                    sku_id: skusId.id,
                    quantity: quantity,
                  };
                  console.log('orrrrrrr', apiData);
                  postCrateCart(apiData);
                } else {
                  alert('Please add Quantity');
                  setQuantityView(true);
                }
                // navigation.navigate('myCart');
              }}
              labelStyle={GlobalStyles.buttonHrLbl}>
              BUY NOW
            </Button>
            <Button
              disabled={quantityView ? true : false}
              style={[
                GlobalStyles.blackbutton2,
                {
                  backgroundColor: quantityView
                    ? 'rgba(34, 34, 34,0.7)'
                    : AppColor.darkGray,
                },
              ]}
              //   icon="arrow-right"
              contentStyle={{flexDirection: 'row-reverse'}}
              onPress={() => setQuantityView(!quantityView)}
              labelStyle={GlobalStyles.buttonHrLbl}>
              ADD TO CART
            </Button>
          </View> */}
        </View>
      </ScrollView>
      {(viewType == 1 || viewType == 2) && (
        <View
          style={[
            GlobalStyles.flexRow,
            {
              // height: 55,
              // backgroundColor: AppColor.white,
              // alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              position: 'absolute',
              // paddingHorizontal: 5,
              // paddingHorizontal: 5,
              width: '100%',
              bottom: 5,
            },
          ]}>
          <Button
            style={[GlobalStyles.greenbutton2]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {
              if (quantityView) {
                navigation.navigate('myCart');
              } else {
                if (quantity > 0 && colors.filter(x => x.selected)[0]) {
                  let skusId = colors.filter(x => x.selected)[0];
                  console.log('skusId', skusId.id);
                  console.log('productId', productDetail);
                  let apiData = {
                    product_id: productDetail?.id,
                    sku_id: skusId.id,
                    quantity: quantity,
                  };
                  console.log('bhbhbh', apiData);
                  postCrateCart(apiData, true);
                }
              }

              // navigation.navigate('myCart');
            }}
            labelStyle={GlobalStyles.buttonHrLbl}>
            BUY NOW
          </Button>
          <Button
            disabled={quantityView ? true : false}
            style={[
              GlobalStyles.blackbutton2,
              {
                backgroundColor: quantityView ? '#4E4E4E' : AppColor.darkGray,
              },
            ]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {
              if (quantity) {
                setQuantityView(!quantityView);
                let skusId = colors.filter(x => x.selected)[0];
                console.log('skusId', skusId);
                let apiData = {
                  product_id: productDetail?.id,
                  sku_id: skusId.id,
                  quantity: quantity,
                };
                console.log('aaaaaaaaaaaaaaaa', apiData);
                postCrateCart(apiData, false);
              }
            }}
            labelStyle={GlobalStyles.buttonHrLbl}>
            ADD TO CART
          </Button>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  colorView: {width: 30, height: 30, borderRadius: 50, marginRight: 10},
  imageStyle: {
    width: '99%',
    height: 350,
    borderRadius: 20,
    alignSelf: 'center',
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray,
  },
});

export default ProductOverView;
