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
import {Rating, AirbnbRating} from 'react-native-ratings';

function ProductReview(props) {
  const {navigation, route, data} = props;

  console.log('ProductReviewPage', data);

  const stars = [
    {
      maxStar: 1,
      review: 10,
      rating: 1,
    },
    {
      maxStar: 2,
      review: 5,
      rating: 2,
    },
    {
      maxStar: 3,
      review: 155,
      rating: 3,
    },
    {
      maxStar: 4,
      review: 70,
      rating: 4,
    },
    {
      maxStar: 5,
      review: 60,
      rating: 5,
    },
  ];

  const commments = [
    {
      rating: 3.5,
      weeks: 3,
      commment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
      by: 'Liam',
    },
    {
      rating: 3,
      weeks: 4,
      commment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
      by: 'Elijah',
    },
  ];

  return (
    <View style={styles.viewStyle}>
      <View style={styles.reviewRating}>
        <Text style={styles.numStyle}>{`${data[0]?.rating ?? 0}/5`}</Text>
        {/* <StarRating
          style={{marginTop: 5, alignSelf: 'center'}}
          rating={data[0]?.rating}
          color={'#fdd835'}
          starSize="20"
          maxStars={5}
          onChange={value => {
            console.log(value);
          }}
        /> */}
        <Rating
          type="custom"
          //  ratingImage={star}
          ratingColor={'#fdd835'}
          ratingBackgroundColor="#DFDFDF"
          ratingCount={5}
          readonly
          startingValue={data[0]?.rating}
          tintColor={'#fff'}
          imageSize={20}
          //   onFinishRating={this.ratingCompleted}
          // style={{paddingVertical: 10,}}
        />
        {/* <Text style={styles.reviewText}>300 Reviews</Text> */}
      </View>
      {/* <View style={styles.rowStyle}>
        {stars.map(item => (
          <View style={styles.starsView}>
            <View
              style={{
                alignSelf: 'center',
                width: 40,
                marginLeft:
                  item.maxStar == 1
                    ? 17
                    : item.maxStar == 2
                    ? 8
                    : item.maxStar == 4
                    ? -12
                    : item.maxStar == 5
                    ? -24
                    : 0,
              }}>
              <StarRating
                style={{width: 10}}
                rating={item.rating}
                color={'#fdd835'}
                starSize="12"
                maxStars={item.maxStar}
                //   onChange={setRating}
              />
            </View>
            <Text style={styles.reviewNum}>{item.review}</Text>
          </View>
        ))}
      </View> */}
      {data.map(item => (
        <View style={styles.commmentView}>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                //   alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <Rating
              style={{marginLeft: -8}}
              type="custom"
              //  ratingImage={star}
              ratingColor={'#fdd835'}
              ratingBackgroundColor="#DFDFDF"
              ratingCount={5}
              readonly
              startingValue={item?.rating}
              tintColor={'#fff'}
              imageSize={16}
              //   onFinishRating={this.ratingCompleted}
              // style={{paddingVertical: 10,}}
            />
            {/* <StarRating
              style={{marginLeft: -8}}
              rating={item?.rating}
              color={'#fdd835'}
              starSize="16"
              maxStars={5}
              //   onChange={setRating}
            /> */}
            {/* <Text style={styles.weekText}>{item.weeks + ' weeks'}</Text> */}
          </View>
          {/* <View style={[GlobalStyles.flexRow, {marginTop: 5}]}>
            <Text style={[styles.byText, {color: AppColor.lightGray}]}>By</Text>
            <Text
              style={[
                styles.byText,
                {color: AppColor.darkGray, marginLeft: 2},
              ]}>
              {item?.first_name}
            </Text>
          </View> */}
          <Text style={styles.commmentText}>{item?.description}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  byText: {
    fontSize: 14,
  },
  commmentText: {
    marginTop: 5,
    width: '90%',
    color: AppColor.lightGray,
  },
  commmentView: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
  },
  numStyle: {
    fontSize: 25,
    color: AppColor.darkGray,
    fontWeight: 'bold',
  },
  reviewNum: {
    width: 40,
    textAlign: 'center',
    color: AppColor.black,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
  },
  reviewText: {
    marginTop: 5,
    fontSize: 16,
    color: AppColor.black,
  },
  reviewRating: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    paddingBottom: 20,
  },
  starsView: {
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    width: 70,
    height: 50,
    backgroundColor: '#f6f6f6',
  },
  viewStyle: {
    // flex: 1,
    height: Dimensions.get('window').height / 1.1,
    backgroundColor: AppColor.white,
    marginLeft: -5,
    marginRight: -5,
    paddingHorizontal: 10,
  },
  weekText: {
    fontSize: 12,
    color: AppColor.lightGray,
  },
});

export default ProductReview;
