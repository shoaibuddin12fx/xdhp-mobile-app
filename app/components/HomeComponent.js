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
import {Button, Badge} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSlider from 'react-native-image-slider';
import {ImageCarousel} from 'image-auto-scroll';
import RetailerCategories from '../components/RetailerCategories';
import StarRating from 'react-native-star-rating-widget';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from './LoaderComponent';
import Carousel from 'react-native-banner-carousel';

// import {SliderBox} from 'react-native-image-slider-box';

function HomeComponent(props) {
  const {navigation, route} = props;
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [categories, setCategories] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const Templates = [
    {
      image: require('../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 3,
    },
    {
      image: require('../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 4,
    },
    {
      image: require('../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 5,
    },
    {
      image: require('../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 2,
    },
    {
      image: require('../Assets/watch.png'),
      title: 'NJ WEARS',
      text: 'NJ Watch',
      price: '100',
      rating: 4,
    },
  ];

  const DATA = [
    {
      bgColor: '#e5faff',
      bg: AppColor.greenButton,
      text: 'DHP Fashion',
      image: require('../Assets/mobile.png'),
    },
    {
      bgColor: '#e7ecff',
      bg: AppColor.greenButton,
      text: 'DHP Fashion',
      image: require('../Assets/laptop.png'),
    },
    {
      bgColor: '#ffe7e7',
      bg: AppColor.greenButton,
      text: 'DHP Fashion',
      image: require('../Assets/mobile.png'),
    },
    {
      bgColor: '#ebfee8',
      bg: AppColor.greenButton,
      text: 'DHP Fashion',
      image: require('../Assets/laptop.png'),
    },
    {
      bgColor: '#e5faff',
      bg: AppColor.greenButton,
      text: 'DHP Fashion',
      image: require('../Assets/mobile.png'),
    },
  ];
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
      id: 12,
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

  const SliderImages = [
    {
      banner: require('../Assets/new.jpg'),
      type: 1,
    },
    {
      banner: require('../Assets/new.jpg'),
      type: 2,
    },
    {
      banner: require('../Assets/new.jpg'),
      type: 3,
    },
    {
      banner: require('../Assets/new.jpg'),
      type: 4,
    },
  ];

  useEffect(() => {
    getImages();
    allCategories();
    getProduct();
  }, []);

  const getImages = async () => {
    console.log('1234');
    // showLoader();
    var result = await new ServiceApi().getBanners();
    // console.log('result', result);
    if (result && result.data) {
      hideLoader();
      var allBenner = [];
      result.data.forEach(x => {
        allBenner.push({banner: x.banner_image});
      });
      console.log('allBenner', allBenner[0]);
      setSliderImages(allBenner);
    } else {
      hideLoader();
      alert('Something went wrong in getImages');
    }
  };

  const allCategories = async () => {
    showLoader();
    var result = await new ServiceApi().getCategorie();
    // console.log('147852', result);
    if (result && result.data) {
      hideLoader();
      setCategories(result.data);
    } else {
      hideLoader();
      alert('Something went wrong in allCategories');
    }
  };

  const getProduct = async () => {
    showLoader();
    var result = await new ServiceApi().getProductByCategories();
    console.log('abcd ====>', result.data);
    if (result && result.data) {
      hideLoader();
      // let DHPdata = result.data['DHP Fashion'].filter(x => x.id > 159);
      // // && x.id < 165,
      // console.log('filter213', DHPdata);
      setFeatured(result.data['DHP Fashion']);
      // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb', result.data['DHP Fashion']);

      let saleData = result.data['On Sale '];
      // console.log('123456', saleData);
      setOnSale(saleData);
    } else {
      hideLoader();
      alert('Something went wrong in getProduct');
    }
  };

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
              // width: Dimensions.get('window').width / 1,
              height: 130,
              backgroundColor: AppColor.white,
              padding: 5,
              borderRadius: 10,
              marginTop: 15,
              marginRight: 15,
              //
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
                // marginTop: item.id == 2 && item.id == 3 ? 10 : 0,
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
              // marginBottom: item.id == 2 && item.id == 3 ? -15 : -5,
              marginTop: 10,
              // marginBottom: -10,
              paddingBottom: 10,
              color: AppColor.darkGray,
              fontWeight: '500',
            }}>
            {item.text}
          </Text>
        </View>
      </Pressable>
    );
  };

  const FeaturedStyle = ({item}) => {
    // console.log('itemitem', item);
    // let data = item.filter(x => x.id > 152);
    // console.log('filterData', data);

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('product', {obj: item});
          console.log('press');
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
              marginRight: 15,
            },
          ]}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'cover',
              width: 130,
              height: 130,
              borderRadius: 10,
            }}
            source={{uri: item.product_image}}
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
                fontSize: 10,
              }}>
              {item.main_category}
            </Text>
            <Text
              style={{
                //   marginTop: 10,
                //   paddingBottom: 10,
                color: AppColor.darkGray,
                fontWeight: '500',
                fontSize: 13,
              }}>
              {item.name}
            </Text>
            {/* <View>
              <StarRating
                style={{width: 10, paddingBottom: 10, marginLeft: -5}}
                rating={item?.rating}
                color={'#fdd835'}
                starSize="10"
                maxStars={5}
                //   onChange={setRating}
              />
            </View> */}

            {/* <View
              style={{
                padding: 3,
                backgroundColor: AppColor.darkGray,
                borderRadius: 5,
                marginBottom: 10,
              }}> */}

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

            {/* </View> */}
          </View>
        </View>
      </Pressable>
    );
  };

  const OnSaleStyle = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('product', {obj: item});
          console.log('press');
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
              marginRight: 15,
            },
          ]}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'cover',
              width: 130,
              height: 130,
              borderRadius: 10,
            }}
            source={{uri: item.product_image}}
          />
          {/* </View> */}
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                marginTop: 5,

                color: AppColor.lightGray,
                fontWeight: '500',
                fontSize: 10,
              }}>
              {item.main_category}
            </Text>
            <Text
              style={{
                //   marginTop: 10,
                // paddingBottom: 10,
                color: AppColor.darkGray,
                fontWeight: '500',
                fontSize: 13,
              }}>
              {item.name}
            </Text>
            {/* <View>
              <StarRating
                style={{width: 10, paddingBottom: 10, marginLeft: -5}}
                rating={item?.rating}
                color={'#fdd835'}
                starSize="10"
                maxStars={5}
                //   onChange={setRating}
              />
            </View> */}

            <Text
              style={{
                color: AppColor.white,
                fontSize: 12,
                fontWeight: '500',
                padding: 3,
                width: 45,
                backgroundColor: AppColor.darkGray,
                borderRadius: 5,
                marginBottom: 10,
              }}>
              {' $ ' + item.price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  // console.log('sliderImages', sliderImages);

  const renderImageSlider = (image, index) => {
    console.log('imageimageimage', image);
    return (
      <View key={index}>
        <Image
          source={{uri: image}}
          style={{
            alignSelf: 'center',
            // resizeMode: 'contain',
            width: Dimensions.get('window').width / 1.05,
            // width: 300,
            // backgroundColor: 'red',
            height: 150,
            borderRadius: 10,
            // backgroundColor: 'red',
            marginRight: 15,
          }}
        />
      </View>
    );
  };
  return (
    <View style={GlobalStyles.appBackground}>
      <View style={{marginTop: 15}}>
        {/* <ImageSlider
          loopBothSides
          autoPlayWithInterval={4000}
          images={SliderImages}
          customSlide={({index, item, style, width}) => {
            return (
              // It's important to put style here because it's got offset inside
              <View style={{backgroundColor: '#f6f6f6'}}>
                <Image
                  source={item.banner}
                  style={{
                    alignSelf: 'center',
                    // resizeMode: 'contain',
                    width: Dimensions.get('window').width / 1.2,
                    // width: 300,
                    // backgroundColor: 'red',
                    height: 150,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                />
              </View>
            );
          }}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {SliderImages.map((image, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}>
                    <View></View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          )}
        /> */}

        {/* <Carousel
          autoplay
          autoplayTimeout={4000}
          loop
          index={0}
          pageSize={Dimensions.get('window').width}>
          {sliderImages.map((image, index) =>
            renderImageSlider(image.banner, index),
          )}
        </Carousel> */}
      </View>
      {/* <SliderBox images={sliderImages} /> */}

      {/* </View> */}

      <View>
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
            Categories
          </Text>
        </View>

        <View style={[GlobalStyles.marginTop]}>
          <FlatList
            data={categoriesItems}
            horizontal={true}
            renderItem={CategoriesStyle}
          />
        </View>
      </View>

      <View>
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
            DHP Fashion
          </Text>
        </View>

        <View style={[GlobalStyles.marginTop]}>
          <FlatList
            data={featured}
            horizontal={true}
            renderItem={FeaturedStyle}
          />
        </View>
      </View>

      <View>
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
            On Sale
          </Text>
        </View>

        <View style={[GlobalStyles.marginTop]}>
          <FlatList
            data={onSale}
            horizontal={true}
            renderItem={OnSaleStyle}
            //   renderItem={({item}) => {
            //     return (
            //       <View>
            //         {/* <Text>Professional</Text> */}
            //         <View
            //           style={[
            //             styles.listViewStyle,
            //             {backgroundColor: item.bgColor},
            //           ]}>
            //           <Image
            //             style={styles.imageStyle}
            //             source={require('../Assets/watch.png')}
            //           />
            //         </View>
            //       </View>
            //     );
            //   }}
            // keyExtractor={item => item.id}
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
    paddingRight: 10,
    paddingLeft: 10,
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

export default HomeComponent;
