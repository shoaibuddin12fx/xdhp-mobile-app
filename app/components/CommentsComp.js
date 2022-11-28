import {View} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {AppColor} from '../shared/appColors';

const CommentsComp = ({comment}) => {
  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <View style={styles.formIcon}>
          <View style={[styles.imageView]}>
            <Image
              source={require('../Assets/watch2.png')}
              style={[styles.image]}
            />
          </View>
        </View>
        <View style={[styles.formItem]}>
          <View style={[styles.name]}>
            <Text style={[styles.text, {fontWeight: '700'}]}>
              {comment.name}
            </Text>
            <Text style={[{color: 'lightgrey'}]}>3h</Text>
          </View>
          <Text style={[styles.text, {marginTop: 10}]}>{comment.comment}</Text>
          <View style={[styles.like]}>
            <View style={[{flexDirection: 'row'}]}>
              <Text style={[{color: 'lightgrey'}]}>Like</Text>
              <Text style={[{color: 'lightgrey', marginLeft: 10}]}>Reply</Text>
            </View>
            <View>
              <Text
                style={[{color: 'lightgrey', fontSize: 16, fontWeight: '700'}]}>
                ...
              </Text>
            </View>
          </View>
          {/* <Reply comment={comment} /> */}
        </View>
      </View>
    </View>
  );
};

export const Reply = ({comment}) => {
  return (
    <View style={[styles.container, {marginLeft: 100}]}>
      <View style={styles.formRow}>
        <View style={styles.formIcon}>
          <View style={[styles.imageView]}>
            <Image
              source={require('../Assets/watch2.png')}
              style={[styles.image]}
            />
          </View>
        </View>
        <View style={[styles.formItem]}>
          <View style={[styles.name]}>
            <Text style={[styles.text, {fontWeight: '700'}]}>
              {comment.name}
            </Text>
            <Text style={[{color: 'lightgrey'}]}>3h</Text>
          </View>
          <Text style={[styles.text, {marginTop: 10}]}>{comment.comment}</Text>
          <View style={[styles.like]}>
            <View style={[{flexDirection: 'row'}]}>
              <Text style={[{color: 'lightgrey'}]}>Like</Text>
              <Text style={[{color: 'lightgrey', marginLeft: 10}]}>Reply</Text>
            </View>
            <View>
              <Text
                style={[{color: 'lightgrey', fontSize: 16, fontWeight: '700'}]}>
                ...
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  formRow: {
    flexDirection: 'row',
    height: 'auto',
  },
  formItem: {
    width: '75%',
    flex: 0,
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    padding: 15,
  },
  formIcon: {
    width: 50,
    // backgroundColor: 'greenyellow',
  },
  image: {
    borderRadius: 100000,
    width: 40,
    height: 40,
  },
  imageView: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10000,
  },
  text: {
    color: 'black',
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default CommentsComp;
