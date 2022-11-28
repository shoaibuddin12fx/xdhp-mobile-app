import React, {useEffect} from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalStyles} from '../shared/GlobalStyles';

function SplashScreen() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('selection');
  //   }, 2000);
  // });
  return (
    <ImageBackground
      source={require('../Assets/Login/splashBg.png')}
      // imageStyle={{
      //   opacity: 0.4,
      // }}
      //   resizeMode="cover"
      style={[
        GlobalStyles.flex,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Image
        source={require('../Assets/Login/logo.png')}
        style={GlobalStyles.logoStyle}
      />
      <Image
        source={require('../Assets/Login/splashText.png')}
        style={{
          width: '85%',
          height: 14,
          resizeMode: 'contain',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 13,
        }}
      />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({});

export default SplashScreen;
