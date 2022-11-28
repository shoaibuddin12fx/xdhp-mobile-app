import React from 'react';
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
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import {Button} from 'react-native-paper';

function LoginSelections(props) {
  const {navigation, route} = props;
  return (
    <ImageBackground
      source={require('../Assets/Login/loginSelectionBg.png')}
      // imageStyle={{
      //   opacity: 0.4,
      // }}
      //   resizeMode="cover"
      style={[
        GlobalStyles.flex,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <View style={[GlobalStyles.centered, {flex: 0.2, padding: 20}]}>
        <Image
          source={require('../Assets/Login/logo2.png')}
          style={{width: 250, height: 150}}
        />
      </View>
      <View style={{flex: 0.4, paddingTop: 20, zIndex: 0}}>
        <Image
          source={require('../Assets/Login/hand.png')}
          style={{width: 420, height: 300, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.whiteView}>
        <Button
          style={GlobalStyles.greenbutton}
          //   icon="arrow-right"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => navigation.navigate('loginScreen')}
          labelStyle={GlobalStyles.buttonHrLbl}>
          Sign in
        </Button>
        {/* <Button
          style={[GlobalStyles.borderButton, {marginTop: 10}]}
          //   icon="arrow-right"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => {}}
          labelStyle={{color: AppColor.darkGray}}>
          Sign in WITH
        </Button> */}
        <Button
          style={[GlobalStyles.grayButton, {marginTop: 10}]}
          //   icon="arrow-right"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => navigation.navigate('signin')}
          labelStyle={GlobalStyles.buttonHrLbl}>
          NEW ACCOUNT
        </Button>
        {/* <Text style={styles.forgotText}>Forgot Password?</Text> */}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  forgotText: {
    color: AppColor.greenButton,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  whiteView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColor.white,
    zIndex: 1,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default LoginSelections;
