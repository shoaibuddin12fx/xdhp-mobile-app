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
  Modal,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Switch} from 'react-native-paper';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {getUser} from '../helpers/localStorage';
import StarRating from 'react-native-star-rating-widget';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const reviewSchema = yup.object({
  rating: yup.string().required(),
  description: yup.string().required(),
});

const cancelOrderSchema = yup.object({
  reason: yup.string().required(),
});

function TrackOrder(props) {
  const {navigation, route} = props;
  const trackOrder = route?.params?.orderItem;
  console.log('trackOrder', trackOrder);
  const [trackId, setTrackId] = useState();
  const [user, setUser] = useState();
  const [orderShippingAddress, setOrderShippingAddress] = useState([]);
  const [orderBillingAddress, setOrderBillingAddress] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [cancelOrderpopupVisible, setCancelOrderpopupVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  useEffect(() => {
    shippingAdress();
    billingAdress();
  }, []);

  const shippingAdress = async () => {
    let _user = await getUser();
    console.log('user.userData', _user.userData[0]);
    setUser(_user.userData[0]);
    // showLoader();
    var result = await new ServiceApi().getorderAdress();
    console.log('getorderAdress', result.data[0]);
    if (result && result.data) {
      hideLoader();
      setOrderShippingAddress(result.data[0]);
    } else {
      hideLoader();
      alert(result.message ?? 'some thing went Wrong shippingAdress');
    }
  };

  const billingAdress = async () => {
    // showLoader();
    var result = await new ServiceApi().getBillingAdress();
    console.log('getBillingAdress', result.data[0]);
    if (result && result.data) {
      hideLoader();
      setOrderBillingAddress(result.data[0]);
    } else {
      hideLoader();
      alert(result.message ?? 'some thing went Wrong billingAdress');
    }
  };

  const postProductReview = async data => {
    showLoader();
    var result = await new ServiceApi().productReviews(data);
    console.log('postProductReview', result.data);
    if (result && result.data) {
      hideLoader();
      alert(result.message);
      setPopupVisible(false);
    }
  };
  const deleteitem = async data => {
    // showLoader();
    var result = await new ServiceApi().deleteOrder(data);
    console.log('deleteitem', result.data);
    if (result && result.data) {
      hideLoader();
      alert(result.message);
      // setPopupVisible(false);
    }
  };

  // const dateTime = () => {
  //   let time = moment(trackOrder?.created_at).add(3, 'hours').format('hh:mm');
  //   console.log('checktime', time);
  //   // let kchbe = time * 60 * 60 * 1000;
  //   // console.log('kchbe', kchbe);
  // };

  const Popup = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={popupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <View style={styles.modalInnerView1}>
          <Icon
            name="close"
            size={24}
            color={AppColor.greenButton}
            style={{position: 'absolute', top: 5, right: 5}}
            onPress={() => {
              setPopupVisible(false);
            }}
          />
          <Image
            source={{uri: trackOrder?.product_image}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'contain',
              borderWidth: 3,
              borderColor: AppColor.greenButton,
              marginTop: -60,
            }}
          />

          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: AppColor.darkGray,
              // alignSelf:'center',
              // textAlign:'center'
            }}>
            {trackOrder?.name}
          </Text>

          <Formik
            initialValues={{
              rating: '',
              description: '',
            }}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={reviewSchema}
            onSubmit={(values, action) => {
              console.log('FormikValues', values);
              let reviewApi = {
                rating: values.rating,
                description: values.description,
                product_id: trackOrder?.product_id,
              };
              console.log('reviewApi', reviewApi);
              postProductReview(reviewApi);
            }}>
            {formikProps => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: AppColor.darkGray,
                    alignSelf: 'center',
                  }}>
                  {'How was your experience'}
                </Text>

                <StarRating
                  style={{marginTop: 15, alignSelf: 'center'}}
                  rating={formikProps.values.rating}
                  color={AppColor.greenButton}
                  starSize="30"
                  maxStars={5}
                  onChange={rating => {
                    formikProps.setFieldValue('rating', rating);
                  }}
                />

                {formikProps.errors.rating && (
                  <Text style={styles.error}>{formikProps.errors.rating}</Text>
                )}

                <View
                  style={[
                    {
                      marginTop: 15,
                      width: Dimensions.get('window').width / 1.5,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // justifyContent: '',
                      // paddingLeft: 10,
                      // backgroundColor: AppColor.greenButton,
                      borderRadius: 10,
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderColor: AppColor.greenButton,
                    },
                  ]}>
                  <TextInput
                    style={[
                      GlobalStyles.textInput,
                      {textAlign: 'center', paddingHorizontal: 80},
                    ]}
                    placeholderTextColor={AppColor.greenButton}
                    value={formikProps.values.description}
                    onChangeText={formikProps.handleChange('description')}
                    onBlur={formikProps.handleBlur('description')}
                    placeholder="Description"
                  />
                </View>
                {formikProps.errors.description && (
                  <Text style={styles.error}>
                    {formikProps.errors.description}
                  </Text>
                )}

                <Button
                  style={[
                    {
                      backgroundColor: AppColor.greenButton,
                      borderRadius: 0,
                      width: Dimensions.get('window').width / 1.5,
                      height: 45,
                      marginLeft: 5,
                      alignSelf: 'center',
                      borderRadius: 10,
                      marginTop: 20,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  //   icon="arrow-right"
                  mode="contained"
                  contentStyle={{flexDirection: 'row-reverse'}}
                  onPress={formikProps.handleSubmit}
                  labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 14}]}>
                  PLACE A REVIEW
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );

  const CancelOrderPopup = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={cancelOrderpopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <View style={styles.modalInnerView2}>
          <Icon
            name="close"
            size={24}
            color={AppColor.cancel}
            style={{position: 'absolute', top: 5, right: 5}}
            onPress={() => {
              setCancelOrderpopupVisible(false);
            }}
          />
          <Image
            source={{uri: trackOrder?.product_image}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'contain',
              borderWidth: 3,
              borderColor: AppColor.cancel,
              marginTop: -60,
            }}
          />

          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: AppColor.cancel,
              // alignSelf:'center',
              // textAlign:'center'
            }}>
            {trackOrder?.name}
          </Text>

          <Formik
            initialValues={{
              reason: '',
            }}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={cancelOrderSchema}
            onSubmit={(values, action) => {
              console.log('FormikValues', values);
              let deltApi = {
                order_id: trackOrder?.id,
                reason: values.reason,
                product_id: trackOrder?.product_id,
              };
              console.log('deltApi', deltApi);
              deleteitem(deltApi);
            }}>
            {formikProps => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={[
                    {
                      marginTop: 15,
                      width: Dimensions.get('window').width / 1.5,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // justifyContent: '',
                      // paddingLeft: 10,
                      // backgroundColor: AppColor.greenButton,
                      borderRadius: 10,
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderColor: AppColor.lightGray,
                    },
                  ]}>
                  <TextInput
                    style={[
                      GlobalStyles.textInput,
                      {textAlign: 'center', paddingHorizontal: 80},
                    ]}
                    placeholderTextColor={AppColor.cancel}
                    value={formikProps.values.reason}
                    onChangeText={formikProps.handleChange('reason')}
                    onBlur={formikProps.handleBlur('reason')}
                    placeholder="Reason"
                  />
                </View>
                {formikProps.errors.reason && (
                  <Text style={styles.error}>{formikProps.errors.reason}</Text>
                )}

                <Button
                  style={[
                    {
                      backgroundColor: AppColor.cancel,
                      borderRadius: 0,
                      width: Dimensions.get('window').width / 1.5,
                      height: 45,
                      marginLeft: 5,
                      alignSelf: 'center',
                      borderRadius: 10,
                      marginTop: 20,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  //   icon="arrow-right"
                  mode="contained"
                  contentStyle={{flexDirection: 'row-reverse'}}
                  onPress={formikProps.handleSubmit}
                  labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 14}]}>
                  Cancel Order
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <View
        style={[
          GlobalStyles.container3,
          {paddingHorizontal: 10, paddingVertical: 10},
        ]}>
        {/* <View style={[GlobalStyles.flexRow1]}>
          <TextInput
            style={[styles.textInputStyle]}
            placeholderTextColor={AppColor.darkGray}
            onChangeText={value => {
              setTrackId(value);
            }}
            value={trackId}
            placeholder="Order ID | 000000000"
          />
          <Button
            style={[styles.trackBtn]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {}}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 13}]}>
            Track
          </Button>
        </View> */}

        <View style={[GlobalStyles.flexRow, {marginTop: 10}]}>
          <Image
            source={{uri: trackOrder?.product_image}}
            style={styles.imageStyle}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: AppColor.darkGray,
              }}>
              {trackOrder?.name}
            </Text>
            <View
              style={[
                GlobalStyles.flexRow,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 30,
                  width: Dimensions.get('window').width / 1.4,
                },
              ]}>
              <Text style={styles.price}> {'$ ' + trackOrder?.price}</Text>
              <Text style={{color: AppColor.darkGray}}>
                {'Qty: ' + trackOrder?.quantity}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <View
            style={[GlobalStyles.flexRow1, {justifyContent: 'space-between'}]}>
            <Text style={{color: AppColor.darkGray}}>Order Placed on:</Text>
            <Text style={{color: AppColor.greenButton}}>
              {moment(trackOrder?.created_at).format('DD-MM-yy')}
            </Text>
          </View>
          {/* <View
            style={[
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <Text style={{color: AppColor.darkGray}}>Order Type:</Text>
            <Text style={{color: AppColor.greenButton}}>Retail</Text>
          </View> */}
          <View style={styles.line} />
          <View
            style={[
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <Text style={{color: AppColor.darkGray}}>Order Status:</Text>
            <Text style={{color: AppColor.greenButton}}>
              {trackOrder?.status}
            </Text>
          </View>
          <View style={[GlobalStyles.centered]}>
            <Image
              source={require('../Assets/sync.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 15,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{color: AppColor.darkGray, marginTop: 10, fontSize: 15}}>
              {'Order is being ' + trackOrder?.status}
            </Text>
            <Button
              style={[styles.cancelOrder]}
              //   icon="arrow-right"
              contentStyle={{flexDirection: 'row-reverse'}}
              onPress={() => {
                setCancelOrderpopupVisible(true);
              }}
              mode="contained"
              labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 12}]}>
              Cancel Order
            </Button>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon name="account" size={24} color={AppColor.greenButton} />
            <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
              {orderShippingAddress?.name}
            </Text>
          </View>

          <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
            <Icon name="phone" size={24} color={AppColor.greenButton} />
            <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
              {orderShippingAddress?.phone_number}
            </Text>
          </View>
          <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
            <Icon name="email" size={24} color={AppColor.greenButton} />

            <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
              {orderShippingAddress?.email}
            </Text>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon name="map-marker" size={24} color={AppColor.greenButton} />
            <Text
              style={{
                color: AppColor.darkGray,
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Shipping Address
            </Text>
          </View>
          <View style={{marginLeft: 40}}>
            <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
              <Icon
                name="checkbox-blank-circle"
                size={5}
                color={AppColor.darkGray}
              />
              <Text style={{color: AppColor.darkGray}}>
                {' ' + orderShippingAddress?.name}
              </Text>
            </View>
            <View style={[GlobalStyles.flexRow1, {marginTop: 5}]}>
              <Icon
                name="checkbox-blank-circle"
                size={5}
                color={AppColor.darkGray}
              />
              <Text style={{color: AppColor.darkGray}}>
                {' ' + orderShippingAddress?.phone_number}
              </Text>
            </View>
            <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
              <Icon
                name="checkbox-blank-circle"
                size={5}
                color={AppColor.darkGray}
              />
              <Text style={{color: AppColor.greenButton}}>{' Address '}</Text>
              <Text style={{color: AppColor.darkGray}}>
                {orderShippingAddress?.address}
              </Text>
            </View>
            {/* <Text style={{color: AppColor.darkGray}}>
              {'consectetur adipiscing elit, sed do eiusmod'}
            </Text>
            <Text style={{color: AppColor.darkGray}}>
              {'tempor incididunt ut labore.'}
            </Text> */}
          </View>
        </View>
        {Object.keys(orderBillingAddress).length != 0 && (
          <View style={styles.viewStyle2}>
            <View style={[GlobalStyles.flexRow1]}>
              <Icon name="map-marker" size={24} color={AppColor.greenButton} />
              <Text
                style={{
                  color: AppColor.darkGray,
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Shipping Address
              </Text>
            </View>
            <View style={{marginLeft: 40}}>
              <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                <Icon
                  name="checkbox-blank-circle"
                  size={5}
                  color={AppColor.darkGray}
                />
                <Text style={{color: AppColor.darkGray}}>
                  {' ' + orderBillingAddress?.name}
                </Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginTop: 5}]}>
                <Icon
                  name="checkbox-blank-circle"
                  size={5}
                  color={AppColor.darkGray}
                />
                <Text style={{color: AppColor.darkGray}}>
                  {' ' + orderBillingAddress?.phone_number}
                </Text>
              </View>
              <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                <Icon
                  name="checkbox-blank-circle"
                  size={5}
                  color={AppColor.darkGray}
                />
                <Text style={{color: AppColor.greenButton}}>{' Address '}</Text>
                <Text style={{color: AppColor.darkGray}}>
                  {orderBillingAddress?.address}
                </Text>
              </View>
              {/* <Text style={{color: AppColor.darkGray}}>
              {'consectetur adipiscing elit, sed do eiusmod'}
            </Text>
            <Text style={{color: AppColor.darkGray}}>
              {'tempor incididunt ut labore.'}
            </Text> */}
            </View>
          </View>
        )}

        <View style={styles.viewStyle}>
          <View style={[GlobalStyles.flexRow1]}>
            <Icon name="map-marker" size={24} color={AppColor.greenButton} />
            <Text
              style={{
                color: AppColor.darkGray,
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Total Summary
            </Text>
          </View>
          <View
            style={[
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between', marginTop: 10, marginLeft: 40},
            ]}>
            <Text style={{color: AppColor.darkGray}}>Shipping</Text>
            <Text style={{color: AppColor.greenButton}}>
              {'$ ' + trackOrder?.shipping_charges}
            </Text>
          </View>
          <View
            style={[
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between', marginTop: 5, marginLeft: 40},
            ]}>
            <Text style={{color: AppColor.darkGray}}>Subtotal</Text>
            <Text style={{color: AppColor.greenButton}}>
              {'$ ' + trackOrder?.price}
            </Text>
          </View>
          <View style={styles.line} />
          <View
            style={[
              GlobalStyles.flexRow1,
              {justifyContent: 'space-between', marginTop: 10, marginLeft: 40},
            ]}>
            <Text style={{color: AppColor.darkGray}}>Total</Text>
            <Text style={{color: AppColor.greenButton}}>
              {' '}
              {`$ ${trackOrder?.price + trackOrder?.shipping_charges}`}
            </Text>
          </View>
        </View>

        {/* <View
          style={[
            GlobalStyles.flexRow1,
            {backgroundColor: AppColor.white, marginTop: 15},
          ]}>
          <Button
            style={[
              {
                backgroundColor: AppColor.darkGray,
                borderRadius: 0,
                width: '49%',
                height: 45,
                marginRight: 5,
                // alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => navigation.navigate('home')}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 12}]}>
            CHAT WITH SELLER
          </Button>
          <Button
            style={[
              {
                backgroundColor: AppColor.greenButton,
                borderRadius: 0,
                width: '49%',
                height: 45,
                marginLeft: 5,
                // alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            //   icon="arrow-right"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {
              setPopupVisible(true)
            }}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 12}]}>
            PLACE A REVIEW
          </Button>
        </View> */}
        <Button
          style={[
            {
              backgroundColor: AppColor.greenButton,
              borderRadius: 0,
              width: '100%',
              alignSelf: 'center',
              height: 45,
              marginTop: 15,

              // marginLeft: 5,
              // alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            },
          ]}
          //   icon="arrow-right"
          mode="contained"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => {
            setPopupVisible(true);
          }}
          labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 15}]}>
          PLACE A REVIEW
        </Button>
        {loaderVisible && (
          <Loader
            loaderVisible={loaderVisible}
            setLoaderVisible={setLoaderVisible}
          />
        )}

        <Popup />
        <CancelOrderPopup />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cancelOrder: {
    backgroundColor: AppColor.cancel,
    borderRadius: 0,
    width: Dimensions.get('window').width / 3,
    height: 45,
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  error: {
    // backgroundColor: 'red',
    width: 300,
    color: 'tomato',
    textAlign: 'center',
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
  line: {
    backgroundColor: AppColor.lightGray,
    height: 1,
    // width: '100%',
    marginTop: 15,
    marginLeft: -15,
    marginRight: -15,
  },
  modalView: {
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(7, 8, 8,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalInnerView1: {
    // margin: 100,
    // height: '20%',
    width: '80%',
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.white,
    padding: 10,
    borderRadius: 8,
    paddingVertical: 20,
    elevation: 5,
    position: 'relative',
    borderWidth: 2,
    borderColor: AppColor.greenButton,
  },
  modalInnerView2: {
    // margin: 100,
    // height: '20%',
    width: '80%',
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.white,
    padding: 10,
    borderRadius: 8,
    paddingVertical: 20,
    elevation: 5,
    position: 'relative',
    borderWidth: 2,
    borderColor: AppColor.cancel,
  },
  price: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: AppColor.darkGray,
    color: AppColor.white,
    fontSize: 15,
    fontWeight: 'bold',
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
  viewStyle: {
    padding: 15,
    backgroundColor: AppColor.lightGray2,
    marginTop: 10,
    width: '100%',
  },
  viewStyle2: {
    borderTopWidth: 1,
    borderColor: AppColor.lightGray,
    padding: 15,
    backgroundColor: AppColor.lightGray2,
    // marginTop: 10,
    width: '100%',
  },
});

export default TrackOrder;
