import React, {useState} from 'react';
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
  Pressable,
} from 'react-native';
import {RaisedButton} from '../components/Button';
import {Button} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {isNullOrEmpty} from '../Utils/util';
import {ServiceApi} from '../Api/ServiceApi';
import {setUser} from '../helpers/localStorage';
import {resetRoute} from '../helpers/navigationHelper';
import {Loader} from '../components/LoaderComponent';
import {showFailureAlert} from '../helpers/AlertHelper';
import SweetAlert from 'react-native-sweet-alert';

function LoginScreen(props) {
  const {navigation, route} = props;
  const [email, setEmail] = useState(); //'user3@gmail.com'
  const [password, setPassword] = useState(); //'User1234@'
  const [isPassword, setIsPassword] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  const loginApi = async data => {
    // resetRoute('home');
    var api = new ServiceApi();
    showLoader();

    var result = await api.login(data);
    // console.log('loginApi', result);
    if (result && result.data) {
      // console.log('loginResult', result.data);
      setUser(result.data);
      resetRoute('home');
      // resetRoute('socialHome');
    } else if (result) {
      hideLoader();
      alert(result.message);
      // showFailureAlert(result.message);
    } else {
      // setShowSpinner(false)
      hideLoader();
      alert('Something went wrong');
      // showFailureAlert('Something went wrong');
    }
  };

  const login = () => {
    if (isNullOrEmpty(email) || isNullOrEmpty(password))
      // AsyncAlert(MESSAGE.EMPTY_EMAIL_PASSWORD);
      console.log('EMPTY');
    else {
      let apiData = {
        email,
        password,
      };
      console.log('apiData', apiData);
      loginApi(apiData);
    }
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.centered]}>
      {/* <Text>This is Login</Text>
        <Button onPress={() => navigation.navigate('home')}>Go to Home</Button> */}
      <Image
        source={require('../Assets/Login/logo3.png')}
        style={GlobalStyles.logoStyle}
      />

      <View
        style={[
          GlobalStyles.TextFieldBg,
          {
            marginTop: 80,
          },
        ]}>
        <Image
          source={require('../Assets/Login/Mail.png')}
          style={[GlobalStyles.iconeStyle]}
        />
        <TextInput
          style={[GlobalStyles.textInput, {textAlign: 'center'}]}
          placeholderTextColor={AppColor.lightGray}
          keyboardType="email-address"
          onChangeText={value => {
            setEmail(value);
          }}
          value={email}
          placeholder="Email"
        />
        <Image
          source={require('../Assets/Login/Eye.png')}
          tintColor={AppColor.white}
          style={[GlobalStyles.iconeStyle]}
        />
      </View>
      <View
        style={[
          GlobalStyles.TextFieldBg,
          {
            marginTop: 20,
          },
        ]}>
        <Image
          source={require('../Assets/Login/lock-closed.png')}
          style={[GlobalStyles.iconeStyle]}
        />

        <TextInput
          style={[GlobalStyles.textInput, {textAlign: 'center'}]}
          placeholderTextColor={AppColor.lightGray}
          onChangeText={value => {
            setPassword(value);
          }}
          secureTextEntry={isPassword}
          value={password}
          placeholder="Password"
        />
        <Pressable
          onPress={() => {
            setIsPassword(!isPassword);
          }}>
          <Image
            source={require('../Assets/Login/Eye.png')}
            style={[GlobalStyles.iconeStyle]}
          />
        </Pressable>
      </View>
      {/* <Text style={{color: AppColor.lightGray, marginTop: 30}}>
        Forgot Password?
      </Text> */}

      <Button
        style={[GlobalStyles.greenbutton, {marginTop: 60}]}
        //   icon="arrow-right"
        contentStyle={{flexDirection: 'row-reverse'}}
        // onPress={() => navigation.navigate('home')}
        onPress={login}
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

      <Pressable onPress={() => navigation.navigate('signin')}>
        <Text style={styles.forgotText}>Sign Up a new account</Text>
      </Pressable>
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
  forgotText: {
    color: AppColor.greenButton,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default LoginScreen;
