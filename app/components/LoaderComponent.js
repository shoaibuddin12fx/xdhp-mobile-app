import React, {useState} from 'react';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';

const LOGO = require('../Assets/dhpLogo.png');

export const Loader = ({loaderVisible, setLoaderVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loaderVisible}
      onRequestClose={() => {
        setLoaderVisible(false);
      }}>
      <View style={GlobalStyles.modalTransparent}>
        <View
          style={{
            backgroundColor: AppColor.white,
            margin: 20,
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            // paddingTop: 10,
            paddingBottom: 10,
            // borderColor: AppColor.lightGray,
            // borderWidth: 1,
            // shadowOpacity: 0.4,
            // shadowOffset: {width: 1, height: 5},
            // shadowRadius: 10,
            // elevation: 5,
          }}>
          <Image
            source={LOGO}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: AppColor.darkGray,
              fontSize: 15,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: -10,
            }}>
            Please Wait...
          </Text>
        </View>
      </View>
    </Modal>
  );
};
