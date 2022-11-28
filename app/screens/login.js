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

function Login(props) {
  const {navigation, route} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPassword, setIsPassword] = useState(true);

  return (
    <View
      style={[
        GlobalStyles.container,
        GlobalStyles.centered,
        {backgroundColor: AppColor.white},
      ]}>
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
          style={[GlobalStyles.textInput]}
          placeholderTextColor={AppColor.lightGray}
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
          style={[GlobalStyles.textInput]}
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
      <Text style={{color: AppColor.lightGray, marginTop: 30}}>
        Forgot Password?
      </Text>

      <Button
        style={[GlobalStyles.greenbutton, {marginTop: 60}]}
        //   icon="arrow-right"
        contentStyle={{flexDirection: 'row-reverse'}}
        onPress={() => navigation.navigate('home')}
        labelStyle={GlobalStyles.buttonHrLbl}>
        Sign in
      </Button>
      <Button
        style={[GlobalStyles.borderButton, {marginTop: 10}]}
        //   icon="arrow-right"
        contentStyle={{flexDirection: 'row-reverse'}}
        onPress={() => {}}
        labelStyle={{color: AppColor.darkGray}}>
        Sign in WITH
      </Button>

      <Pressable onPress={() => navigation.navigate('signin')}>
        <Text style={styles.forgotText}>Sign Up a new account</Text>
      </Pressable>
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

export default Login;
