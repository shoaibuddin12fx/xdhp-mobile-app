import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
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
import {Button, Checkbox, IconButton, Switch} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {getData, getUser} from '../helpers/localStorage';

function MyCart(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');
  const [checked, setChecked] = useState(false);
  const [add, setAdd] = useState(1);
  const [apply, setApply] = useState();
  const [deleteItem, setDeleteItem] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [total, setTotal] = useState();
  const [colors, setColors] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="delete-forever-outline"
          size={24}
          color={AppColor.darkGray}
          onPress={() => {
            // console.log('asdsadsasa', cartProducts);
            if (cartProducts.length == 0) return;
            if (deleteItem) {
              var selectedItems = cartProducts.filter(x => x.check);
              selectedItems.forEach(item => {
                let deleteApi = {
                  product_id: item?.product_id,
                  cart_id: item?.user_cart_id,
                };
                deleteItems(deleteApi);
              });

              setCartProducts(cartProducts.filter(x => !x.check));
            }
            setDeleteItem(!deleteItem);
          }}
        />
      ),
    });
  }, [navigation, deleteItem, cartProducts]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // alert('Agaya me');
      cartProduct();
    });
  }, []);

  // useEffect(() => {
  //   var totalAmount = cartProducts
  //     .map(x => x.price * x.product_qty)
  //     .reduce((a, b) => a + b, 0);
  //   console.log('Total Amount', totalAmount);
  //   setTotal(totalAmount);
  // }, [cartProducts]);

  // useEffect(() => {
  //   get();
  // }, []);

  const cartProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getCartProducts();
    console.log('cartProduct', result);
    if (result && result.data) {
      hideLoader();

      setCartProducts(result.data);
    } else {
      hideLoader();
      alert('Something went wrong in cartProduct');
    }
  };

  const deleteItems = async data => {
    return new Promise(async resolve => {
      showLoader();
      var result = await new ServiceApi().deteleCart(data);
      // console.log('deleteItems', result);
      if (result && result.message) {
        hideLoader();
        alert(result.message);
        console.log('cartProducts', cartProducts);
        setCartProducts(cartProducts.filter(x => !x.check));
        resolve(true);
      } else {
        hideLoader();
        alert('Something went wrong in deleteItems');
        resolve(false);
      }
    });
  };

  const postCrateCart = async data => {
    showLoader();
    var result = await new ServiceApi().creatCart(data);
    // console.log('postCrateCart', result);
    if (result && result.data) {
      hideLoader();

      navigation.navigate('myCart');
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const cartOption = [
    {
      btn: 'Retail',
      type: 1,
    },
    // {
    //   btn: 'Wholesale',
    //   type: 2,
    // },
  ];

  const cartData = [
    {
      itemName: 'Samsung Note 10',
      itemImage: require('../Assets/mobWithBg.png'),
      rating: 3,
      price: 760,
      off: '25%Off',
      check: true,
    },
    {
      itemName: 'Samsung Note 10',
      itemImage: require('../Assets/mobWithBg.png'),
      rating: 3,
      price: 760,
      off: '25%Off',
      check: true,
    },
  ];

  // const get = async () => {
  //   let user = await getUser();
  //   console.log('25893', user);
  // };

  const allCartProdust = ({item}) => {
    // console.log('item.price', item);
    let price = cartProducts.map(item => item.price * item.product_qty);
    // console.log('123456', price);
    let sum = price.reduce((a, b) => a + b, 0);
    setTotal(sum);
    // setAdd(item?.product_qty);
    // console.log('dataaaaa', item?.product_qty);
    return (
      <View
        style={[
          GlobalStyles.flexRow1,
          {
            paddingVertical: 20,
            //   borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: AppColor.lightGray2,
          },
        ]}>
        {deleteItem && (
          <Checkbox
            status={item.check ? 'checked' : 'unchecked'}
            onPress={() => {
              setCartProducts(
                cartProducts.map(_item =>
                  item.product_id == _item.product_id
                    ? {..._item, check: !_item.check}
                    : _item,
                ),
              );
            }}
          />
        )}

        <Image
          source={{uri: item?.product_image}}
          style={{width: 60, height: 60, borderRadius: 10}}
        />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: AppColor.darkGray,
              fontSize: 16,
              fontWeight: '500',
            }}>
            {item.name}
          </Text>
          {/* <StarRating
                  style={{marginLeft: -5, marginTop: 2, width: 10}}
                  rating={item.rating}
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
                marginTop: 10,
                // backgroundColor: 'red',
                width: deleteItem
                  ? Dimensions.get('window').width / 1.5
                  : Dimensions.get('window').width / 1.32,
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
              {'$ ' + item.price}
            </Text>
            <View style={[GlobalStyles.flexRow1]}>
              <Icon
                name={'minus'}
                size={20}
                color={AppColor.darkGray}
                onPress={async () => {
                  setCartProducts(
                    cartProducts.map(_item =>
                      item.product_id == _item.product_id
                        ? {..._item, product_qty: item?.product_qty - 1}
                        : _item,
                    ),
                  );
                  // let filter = cartProducts.filter(
                  //   x => x.product_id == item.product_id,
                  // )[0];
                  // console.log('filterItem123', filter);
                  let prouctQty = item.product_qty - 1;
                  if (prouctQty == 0) {
                    let deleteApi = {
                      product_id: item?.product_id,
                      cart_id: item?.user_cart_id,
                    };
                    console.log('deleteApi', deleteApi);
                    var isSuccess = await deleteItems(deleteApi);
                    if (isSuccess)
                      setCartProducts(
                        cartProducts.filter(
                          x => x.product_id != deleteApi.product_id,
                        ),
                      );
                  } else {
                    let apiData = {
                      product_id: item?.product_id,
                      sku_id: item?.sku_id,
                      quantity: item?.product_qty,
                    };
                    postCrateCart(apiData);
                  }

                  // setAdd(add - 1)
                }}
              />
              <View
                style={[
                  GlobalStyles.centered,
                  {
                    backgroundColor: AppColor.lightGray2,
                    paddingHorizontal: 20,
                    paddingVertical: 1,
                    borderRadius: 5,
                  },
                ]}>
                <Text style={{color: AppColor.darkGray}}>
                  {item?.product_qty}
                </Text>
              </View>
              <Icon
                name={'plus'}
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  console.log('add');
                  setCartProducts(
                    cartProducts.map(_item =>
                      item.product_id == _item.product_id
                        ? {..._item, product_qty: item?.product_qty + 1}
                        : _item,
                    ),
                  );
                  let filter = cartProducts.filter(
                    x => x.product_id == item.product_id,
                  )[0];
                  console.log('filterItem123', filter);
                  let apiData = {
                    product_id: filter?.product_id,
                    sku_id: filter?.sku_id,
                    quantity: filter?.product_qty,
                  };
                  postCrateCart(apiData);
                }}
              />
            </View>
          </View>
          {/* <View style={[GlobalStyles.flexRow1, {marginTop: 3}]}>
                  <Text style={{color: AppColor.lightGray, fontSize: 12}}>
                    {'$760'}
                  </Text>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    {'| ' + item.off}
                  </Text>
                </View> */}
        </View>
      </View>
    );
  };

  // const getColor = async () => {
  //   let color = await getData('produstData', true);
  //   console.log('145647', color.colors);
  //   // console.log('productDetail.skus', productDetail?.skus);
  //   // let filterColors = cartProducts?.filter(x=>x.)
  //   // let filterColors = cartProducts?.skus
  //   //   .filter(sku => color?.colors?.some(color => sku.color_id == color.id))
  //   //   .map((item, index) =>
  //   //     index == 0
  //   //       ? {
  //   //           ...item,
  //   //           selected: true,
  //   //           name: color?.colors?.filter(color => color.id == item.color_id)[0]
  //   //             .name,
  //   //         }
  //   //       : {
  //   //           ...item,
  //   //           selected: false,
  //   //           name: color?.colors?.filter(color => color.id == item.color_id)[0]
  //   //             .name,
  //   //         },
  //   //   );
  //   // let filterColors = color?.colors
  //   //   .filter(x => productDetail?.skus.some(y => y.color_id == x.id))
  //   //   .map((item, index) =>
  //   //     index == 0 ? {...item, selected: true} : {...item, selected: false},
  //   //   );
  //   console.log('asdsadsadsad', filterColors);
  //   // setColors(filterColors);
  // };

  return (
    <View style={[GlobalStyles.container3, {position: 'relative'}]}>
      <View
        style={{
          width: '100%',
          backgroundColor: AppColor.white,
          paddingVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 10,
        }}>
        {cartOption?.map(item => (
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
                {item.btn}
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
        <View style={{marginTop: 10, paddingHorizontal: 10}}>
          {/* {cartData.map(item => (
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  paddingVertical: 20,
                  //   borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: AppColor.lightGray2,
                },
              ]}>
              {deleteItem && (
                <Checkbox
                  status={item.check ? 'checked' : 'unchecked'}
                  // onPress={() => {
                  //   setChecked(!checked);
                  // }}
                />
              )}

              <Image
                source={item.itemImage}
                style={{width: 60, height: 60, borderRadius: 10}}
              />
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: AppColor.darkGray,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {item.itemName}
                </Text>
                <StarRating
                  style={{marginLeft: -5, marginTop: 2, width: 10}}
                  rating={item.rating}
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
                      marginTop: 10,
                      width: deleteItem
                        ? Dimensions.get('window').width / 1.5
                        : Dimensions.get('window').width / 1.3,
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
                    {'$ ' + item.price}
                  </Text>
                  <View style={[GlobalStyles.flexRow1]}>
                    <Icon
                      name={'minus'}
                      size={20}
                      color={AppColor.darkGray}
                      onPress={() => {
                        setAdd(add - 1);
                      }}
                    />
                    <View
                      style={[
                        GlobalStyles.centered,
                        {
                          backgroundColor: AppColor.lightGray2,
                          paddingHorizontal: 20,
                          paddingVertical: 1,
                          borderRadius: 5,
                        },
                      ]}>
                      <Text style={{color: AppColor.darkGray}}>{add}</Text>
                    </View>
                    <Icon
                      name={'plus'}
                      size={20}
                      color={AppColor.darkGray}
                      onPress={() => {
                        setAdd(add + 1);
                        // setAdd(add++);
                      }}
                    />
                  </View>
                </View>
                <View style={[GlobalStyles.flexRow1, {marginTop: 3}]}>
                  <Text style={{color: AppColor.lightGray, fontSize: 12}}>
                    {'$760'}
                  </Text>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    {'| ' + item.off}
                  </Text>
                </View>
              </View>
            </View>
          ))} */}

          <FlatList data={cartProducts} renderItem={allCartProdust} />
        </View>
      )}

      {viewType == 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: AppColor.white,
            zIndex: 1,
            elevation: 10,
            height: 150,
            paddingVertical: 10,
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
                // backgroundColor: 'red',
                // alignSelf: 'flex-end',
              },
            ]}>
            <View style={[GlobalStyles.flexRow1]}>
              {deleteItem && (
                <View style={[GlobalStyles.flexRow1]}>
                  <View>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                        setCartProducts(
                          cartProducts.map(x => ({...x, check: !checked})),
                        );
                      }}
                    />
                  </View>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Select All
                  </Text>
                </View>
              )}
            </View>

            <View style={[GlobalStyles.flexRow1]}>
              <View>
                {/* <View style={[GlobalStyles.flexRow1]}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    {'Shipping: '}
                  </Text>
                  <Text style={{color: AppColor.greenButton, fontSize: 12}}>
                    $60
                  </Text>
                </View> */}
                <View style={[GlobalStyles.flexRow1]}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    {'Total: '}
                  </Text>
                  <Text style={{color: AppColor.greenButton, fontSize: 12}}>
                    {'$' + total}
                  </Text>
                </View>
              </View>

              <Button
                style={[styles.checkOut]}
                //   icon="arrow-right"
                contentStyle={{flexDirection: 'row-reverse'}}
                onPress={() => {
                  if (cartProducts.length > 0) navigation.navigate('CheckOut');
                  else {
                    alert('Cart is empty');
                  }
                }}
                labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 11}]}>
                CHECK OUT
              </Button>
            </View>
          </View>
        </View>
      )}
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
  navigationBarStyle: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
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
  checkOut: {
    backgroundColor: AppColor.greenButton,
    height: 40,
    borderRadius: 0,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});

export default MyCart;
