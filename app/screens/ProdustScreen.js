import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
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
import {Button, Checkbox, Switch} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {Formik} from 'formik';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {color} from '@rneui/base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';

function ProdustScreen(props) {
  const {navigation, route} = props;
  const obj = route?.params?.obj;
  console.log('ProdustScreen', obj);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [product, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState(obj?.id);
  const [subCategoryId, setSubCategoryId] = useState();
  const [btnColor, setBtnColor] = useState();
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: obj?.text,
    });
  }, [navigation, obj]);

  useEffect(() => {
    getProduct();
    getCategories();
  }, [categoryId]);

  const getProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getProductByCategoriesId(categoryId);
    console.log('856974', result.data);
    if (result && result.data) {
      hideLoader();
      setProduct(result.data);
      setAllProducts(result.data);
      console.log('allProducts1', result.data);
    } else {
      hideLoader();
      // alert('Something went wrong');
      setProduct([]);
    }
  };

  const getCategories = async () => {
    showLoader();
    var result = await new ServiceApi().getAllCategory();
    console.log('c', result.data);
    if (result && result.data) {
      hideLoader();
      let filterCategory = result.data.filter(
        x => x.category_section_id == obj.id,
      );
      console.log('filterCategory', filterCategory);
      setCategory(filterCategory);
      console.log('allCategory', result.data);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getSubCategories = async id => {
    showLoader();
    var result = await new ServiceApi().subCategoriesId(id);
    console.log('getSubCategories', result.data);
    if (result && result.data) {
      hideLoader();
      setSubCategory(result.data);
      console.log('AllSubcategory', result.data);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const AllProduct = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('product', {obj: item});
          console.log('press', item);
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
              marginTop: 5,
              marginBottom: 10,
              // paddingBottom: 10,
              elevation: 5,
              alignSelf: 'center',
              width: Dimensions.get('window').width / 2.2,
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

              // padding: 10,
            }}
            source={{uri: item?.product_image}}
          />
          {/* </View> */}
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginLeft: 5,
            }}>
            <Text
              style={{
                marginTop: 5,

                color: AppColor.lightGray,
                fontWeight: '500',
                fontSize: 12,
              }}>
              {obj?.text}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                //   marginTop: 10,
                //   paddingBottom: 10,
                color: AppColor.darkGray,
                fontWeight: '500',
                fontSize: 15,
                width: '90%',
              }}>
              {item.name}
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
                padding: 5,
                borderRadius: 5,
                backgroundColor: AppColor.darkGray,
                color: AppColor.white,
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 10,
                marginTop: 5,
              }}>
              {'$ ' + item?.price}
            </Text>

            {/* <Text
              style={{
                color: AppColor.white,
                fontSize: 14,
                fontWeight: '500',
                padding: 5,

                width: 60,
                backgroundColor: AppColor.darkGray,
                borderRadius: 7,
                marginBottom: 10,
                textAlign: 'center',
              }}>
              {'$ ' + item?.price}
            </Text> */}
          </View>
        </View>
      </Pressable>
    );
  };

  const CategoryView = () => {
    return (
      <View style={{paddingLeft: 10, paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: AppColor.darkGray,
          }}>
          Categories
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Category.map(item => (
            <Pressable
              onPress={() => {
                switch (item.name) {
                  default:
                    setBtnColor(item.name);
                    console.log('item.Type', item.name);
                    let apiData = {
                      category_id: item.id,
                    };
                    console.log('apidate', apiData);
                    getSubCategories(apiData);

                    // setFilterNotification(filterItem);
                    break;
                }
              }}>
              <View
                style={[
                  styles.subCategoriesBtn,
                  {
                    backgroundColor:
                      item.name == btnColor
                        ? AppColor.greenButton
                        : AppColor.lightGray,
                  },
                ]}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color:
                      item.name == btnColor ? AppColor.white : AppColor.black,
                    textAlign: 'center',
                    // width: '80%',
                  }}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const SubCategoryView = () => {
    return (
      <View style={{paddingLeft: 10, paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: AppColor.darkGray,
          }}>
          Sub Categories
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {subCategory.map(item => (
            <Pressable
              onPress={() => {
                // switch (item.name) {
                //   default:
                setBtnColor(item.name);
                console.log('12345678', item);
                setCategoryId(item.category_id);

                // let filterItems = allProducts.filter(
                //   x => x.product_subcategory_id == item.id,
                // );

                // console.log('filterItems', filterItems);
              }}>
              <View
                style={[
                  styles.subCategoriesBtn,
                  {
                    backgroundColor:
                      item.name == btnColor
                        ? AppColor.greenButton
                        : AppColor.lightGray,
                  },
                ]}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color:
                      item.name == btnColor ? AppColor.white : AppColor.black,
                    textAlign: 'center',
                    // width: '80%',
                  }}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      // <View
      //   style={{
      //     backgroundColor: 'red',
      //     flex: 1,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   }}>
      <Text style={styles.emptyListStyle}>No Data Found</Text>
      // </View>
    );
  };

  return (
    <View
      style={[
        GlobalStyles.container3,
        {paddingHorizontal: 10, paddingVertical: 10, position: 'relative'},
      ]}>
      <CategoryView />
      {subCategory.length > 0 && <SubCategoryView />}

      <View style={[GlobalStyles.marginTop, {alignSelf: 'center', flex: 1}]}>
        {product.length > 0 && (
          <FlatList
            style={{paddingTop: 2}}
            data={product}
            // horizontal={true}
            numColumns={2}
            ListEmptyComponent={EmptyListMessage}
            renderItem={AllProduct}
          />
        )}
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
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    color: AppColor.darkGray,
  },
  subCategoriesBtn: {
    width: 150,
    // height: 45,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 25,
  },
});

export default ProdustScreen;
