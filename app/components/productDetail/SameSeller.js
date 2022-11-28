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
import {ServiceApi} from '../../Api/ServiceApi';
import {Loader} from '../LoaderComponent';

function SameSeller(props) {
  const {
    navigation,
    route,
    data,
    setProductDetail,
    setViewType,
    setProductId,
    setQuantityView,
  } = props;
  console.log('SameSellerSameSeller', data);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [sameSellerProduct, setSameSellerProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getProductByCategories();
    if (result && result.data) {
      hideLoader();
      console.log('098765', result.data);
      let filterItem = result.data['DHP Fashion'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem1 = result.data['Cell Phone & Devices'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem2 = result.data['Computer & Gaming'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem3 = result.data['Camera'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem4 = result.data['Men Fashion'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem5 = result.data['Women Fashion'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem6 = result.data['Kids Store'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem7 = result.data['Health & Beauty'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem8 = result.data['Home & LifeStyle'].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem9 = result.data['Sports Outdoor '].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem10 = result.data['Grocery '].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem11 = result.data['Gift '].filter(
        x => x.shop_name == data.shop_name,
      );
      let filterItem12 = result.data['On Sale '].filter(
        x => x.shop_name == data.shop_name,
      );
      var sameSellerProducts = [
        ...filterItem,
        ...filterItem1,
        ...filterItem2,
        ...filterItem3,
        ...filterItem4,
        ...filterItem5,
        ...filterItem6,
        ...filterItem7,
        ...filterItem8,
        ...filterItem9,
        ...filterItem10,
        ...filterItem11,
        ...filterItem12,
      ];

      console.log('sameSellerProducts', sameSellerProducts);
      setSameSellerProduct(sameSellerProducts);
    } else {
      hideLoader();
      alert('Something went wrong in getProduct');
    }
  };

  console.log('SameSellerPage', data);
  const Templates = [
    {
      image: require('../../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 3,
    },
    {
      image: require('../../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 4,
    },
    {
      image: require('../../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 5,
    },
    {
      image: require('../../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 2,
    },
    {
      image: require('../../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 4,
    },
  ];

  // const FeaturedStyle = ({item}) => {
  //   return (
  //     <Pressable
  //       onPress={() => {
  //         //   navigation.navigate('product', {obj: item});
  //         console.log('press');
  //       }}>
  //       <View
  //         style={[
  //           GlobalStyles.container,
  //           //   GlobalStyles.centered,
  //           {
  //             // width: 110,
  //             backgroundColor: AppColor.white,
  //             padding: 5,
  //             borderRadius: 10,
  //             marginRight: 15,
  //             elevation: 5,
  //             marginBottom: 5,
  //           },
  //         ]}>
  //         <Image
  //           style={{
  //             alignSelf: 'center',
  //             resizeMode: 'contain',
  //             width: 130,
  //             height: 130,
  //           }}
  //           source={item.image}
  //         />
  //         {/* </View> */}
  //         <View style={{marginLeft: 5}}>
  //           <Text
  //             style={{
  //               marginTop: 5,

  //               color: AppColor.lightGray,
  //               fontWeight: '500',
  //               fontSize: 10,
  //             }}>
  //             {item.title}
  //           </Text>
  //           <Text
  //             style={{
  //               //   marginTop: 10,
  //               //   paddingBottom: 10,
  //               color: AppColor.darkGray,
  //               fontWeight: '500',
  //               fontSize: 13,
  //             }}>
  //             {item.text}
  //           </Text>
  //           <View>
  //             <StarRating
  //               style={{width: 10, paddingBottom: 10, marginLeft: -5}}
  //               rating={item?.rating}
  //               color={'#fdd835'}
  //               starSize="10"
  //               maxStars={5}
  //               //   onChange={setRating}
  //             />
  //           </View>

  //           <Text
  //             style={{
  //               color: AppColor.white,
  //               fontSize: 12,
  //               fontWeight: '500',
  //               padding: 3,
  //               width: 45,
  //               backgroundColor: AppColor.darkGray,
  //               borderRadius: 5,
  //               marginBottom: 10,
  //             }}>
  //             {' $ ' + item.price}
  //           </Text>
  //         </View>
  //       </View>
  //     </Pressable>
  //   );
  // };

  const AllProduct = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setProductDetail(item);
          setProductId(item.id);
          setViewType(1);
          setQuantityView(false);
          // navigation.navigate('product', {obj: item});
          console.log('presspress', item);
        }}>
        <View
          style={[
            GlobalStyles.container,
            //   GlobalStyles.centered,
            {
              // width: 110,
              backgroundColor: AppColor.white,
              padding: 5,
              borderRadius: 10,
              marginRight: 5,
              marginLeft: 5,
              marginBottom: 15,
              // paddingBottom: 10,
              elevation: 5,
              alignSelf: 'center',
              width: Dimensions.get('window').width / 2.3,
              height: 'auto',
            },
          ]}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              borderRadius: 10,
              width: Dimensions.get('window').width / 2.5,
              height: 170,
            }}
            source={{uri: item?.product_image}}
          />
          {/* </View> */}
          <View
            style={{
              marginLeft: 5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                marginTop: 5,

                color: AppColor.lightGray,
                fontWeight: '500',
                fontSize: 12,
              }}>
              {item?.main_category}
            </Text>
            <Text
              style={{
                //   marginTop: 10,
                //   paddingBottom: 10,
                color: AppColor.darkGray,
                fontWeight: '500',
                fontSize: 15,
              }}>
              {item?.name}
            </Text>
            {/* <View>
              <StarRating
                style={{width: 10, paddingBottom: 10, marginLeft: -5}}
                rating={item?.rating}
                color={'#fdd835'}
                starSize="12"
                maxStars={5}
                //   onChange={setRating}
              />
            </View> */}

            <Text
              style={{
                color: AppColor.white,
                fontSize: 12,
                fontWeight: '500',
                paddingVertical: 3,
                marginTop: 5,
                paddingHorizontal: 3,
                // width: 50,
                backgroundColor: AppColor.darkGray,
                borderRadius: 5,
              }}>
              {'  $ ' + item.price + ' '}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.viewStyle]}>
      {/* <View>
        <View
          style={[
            GlobalStyles.flexRow,
            {
              justifyContent: 'space-between',
              alignContent: 'center',
              marginTop: 10,
            },
          ]}>
          <Text style={[styles.studioText, {color: AppColor.darkGray}]}>
            Featured
          </Text>
        </View>

        <View style={[GlobalStyles.marginTop]}>
          <FlatList
            data={Templates}
            horizontal={true}
            renderItem={FeaturedStyle}
          />
        </View>
      </View> */}

      <View>
        {/* <View
          style={[
            GlobalStyles.flexRow,
            {
              justifyContent: 'space-between',
              alignContent: 'center',
              marginTop: 20,
            },
          ]}>
          <Text style={[styles.studioText, {color: AppColor.darkGray}]}>
            ALL Product
          </Text>
        </View> */}

        <View style={[{alignSelf: 'center'}]}>
          <FlatList
            data={sameSellerProduct}
            // horizontal={true}
            numColumns={2}
            renderItem={AllProduct}
          />
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
  studioText: {
    fontSize: 17,
    fontWeight: '500',
    // color:texts.textColor
  },
  viewStyle: {
    flex: 1,
    backgroundColor: AppColor.white,
    marginLeft: -5,
    marginRight: -5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default SameSeller;
