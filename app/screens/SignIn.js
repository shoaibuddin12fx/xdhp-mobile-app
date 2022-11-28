import React, {useState, useEffect} from 'react';
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
import {Button} from 'react-native-paper';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import {ServiceApi} from '../Api/ServiceApi';
import {notIsNullOrEmpty} from '../Utils/util';
import {resetRoute} from '../helpers/navigationHelper';
import {Loader} from '../components/LoaderComponent';
import SweetAlert from 'react-native-sweet-alert';
import {showFailureAlert, showSuccessAlert} from '../helpers/AlertHelper';
import {Button as SimpleButton} from 'react-native';
// import SelectList from 'react-native-dropdown-select-list';

const signupSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  // city: yup.string().required(),
  country: yup.object().required(),
  password: yup.string().required().min(9),
  confirmPassword: yup.string().required().min(9),
  dob: yup.string().required(),
  // phoneNumber: yup.string().required(),
  gender: yup.object().required(),
});

function SignIn(props) {
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [alertIcon, setAlertIcon] = useState(false);
  const {navigation, route} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelected, setDateSelected] = useState('Select date');
  const [genders, setGender] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(false);
  const hideLoader = () => setLoaderVisible(false);

  useEffect(() => {
    getGender();
    getCountries();
    getCities();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const signup = async data => {
    showLoader();
    let res = await new ServiceApi().signup(data);

    console.log('234678', res);
    if (res && res.message == 'User created') {
      hideLoader();
      // showSuccessAlert(res.message);
      // await AsyncAlert(MESSAGE.confirmation_email_sent, MESSAGE.success);
      resetRoute('loginScreen');
    } else if (result) {
      hideLoader();
      // alert(result.message);
      showFailureAlert(result.message);
    } else {
      // setShowSpinner(false)
      hideLoader();
      alert('Something went wrong');
      // showFailureAlert('Something went wrong');
    }
    // else {
    //   // hideLoader();
    //   let err = !isNullOrEmptyArray(res?.result?.errors)
    //     ? res?.result?.errors[0]
    //     : null;
    //   AsyncAlert(
    //     err?.description ?? MESSAGE.something_went_wrong,
    //     MESSAGE.error,
    //   );
    // }
  };

  const getGender = async () => {
    showLoader();
    var result = await new ServiceApi().getGender();
    if (result && result.data) {
      hideLoader();
      var gender = [];
      result.data.forEach(x => {
        gender.push({label: x.name, value: x.id});
      });
      setGender(gender);
    } else {
      hideLoader();
      alert('Something went wrong: gender');
    }
  };

  const getCountries = async () => {
    showLoader();
    var result = await new ServiceApi().allCountry();
    if (result && result.data) {
      hideLoader();
      var country = [];
      result.data.forEach(x => {
        country.push({label: x.name, value: x.id});
      });
      setCountries(country);
    } else {
      hideLoader();
      alert('Something went wrong: countries');
    }
  };
  const getCities = async () => {
    showLoader();
    var result = await new ServiceApi().allCountry();
    if (result && result.data) {
      hideLoader();
      var city = [];
      result.data.forEach(x => {
        city.push({label: x.name, value: x.id});
      });
      setCities(city);
    } else {
      hideLoader();
      alert('Something went wrong: cities');
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          GlobalStyles.container,
          GlobalStyles.centered,
          {paddingBottom: 30, backgroundColor: AppColor.white},
        ]}>
        {/* <Text>This is Login</Text>
      <Button onPress={() => navigation.navigate('home')}>Go to Home</Button> */}
        <Image
          source={require('../Assets/Login/logo3.png')}
          style={[GlobalStyles.logoStyle, {marginTop: 10}]}
        />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            country: '',
            password: '',
            confirmPassword: '',
            dob: '',
            // phoneNumber: '',
            gender: '',
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signupSchema}
          onSubmit={(values, action) => {
            console.log('values', values);
            if (values.password !== values.confirmPassword) {
              alert('Password do no match');

              setAlertIcon(true);
              setIsPassword(true);
              setIsConfirmPassword(true);
            } else {
              setAlertIcon(false);
              setIsPassword(true);
              setIsConfirmPassword(true);
              let apiData = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                city: values.city.value,
                country: values.country.value,
                password: values.password,
                date_of_birth: values.dob,
                gender_id: values.gender.value,
              };
              // console.log('\n\n\n\n\n\n\n\n apiData', apiData);
              signup(apiData);
            }
          }}>
          {formikProps => (
            <View style={GlobalStyles.centered}>
              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 80,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Person.png')}
                  style={[GlobalStyles.iconeStyle]}
                />
                <TextInput
                  style={[GlobalStyles.textInput, {alignSelf: 'center'}]}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.firstName}
                  onChangeText={formikProps.handleChange('firstName')}
                  onBlur={formikProps.handleBlur('firstName')}
                  placeholder="First Name"
                />
                <Image
                  source={require('../Assets/Login/Eye.png')}
                  tintColor={AppColor.white}
                  style={[GlobalStyles.iconeStyle]}
                />
              </View>
              {formikProps.errors.firstName && (
                <Text style={styles.error}>{formikProps.errors.firstName}</Text>
              )}

              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Person.png')}
                  style={[GlobalStyles.iconeStyle]}
                />
                <TextInput
                  style={[GlobalStyles.textInput, {alignSelf: 'center'}]}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.lastName}
                  onChangeText={formikProps.handleChange('lastName')}
                  onBlur={formikProps.handleBlur('lastName')}
                  placeholder="Last Name"
                />
                <Image
                  source={require('../Assets/Login/Eye.png')}
                  tintColor={AppColor.white}
                  style={[GlobalStyles.iconeStyle]}
                />
              </View>
              {formikProps.errors.lastName && (
                <Text style={styles.error}>{formikProps.errors.lastName}</Text>
              )}

              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/Login/Mail.png')}
                  style={[GlobalStyles.iconeStyle]}
                />
                <TextInput
                  style={[GlobalStyles.textInput]}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
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
                  source={require('../Assets/SignUp/Gender.png')}
                  style={[GlobalStyles.iconeStyle]}
                />

                <RNPickerSelect
                  placeholder={{
                    label: 'City',
                    color: AppColor.darkGray,
                  }}
                  onValueChange={value => {
                    // console.log('value', value);
                    // if (!value) return;
                    let city = cities.filter(x => x.value === value)[0];
                    console.log('city', city);
                    formikProps.setFieldValue('city', city);
                  }}
                  items={cities}
                  value={formikProps.values.city?.value}>
                  <Text
                    style={
                      formikProps.values.city?.value
                        ? styles.content
                        : {
                            ...styles.content,
                            color: AppColor.lightGray,
                          }
                    }>
                    {formikProps.values.city?.label ?? 'city'}
                    {console.log(
                      '\n\n\n\n\n\n\n\n\n\n\nformikProps.values.city?.label= ',
                      formikProps.values.city?.label,
                    )}
                  </Text>
                </RNPickerSelect>

                <Icon
                  name="chevron-down"
                  size={20}
                  color={AppColor.lightGray}
                />
              </View>
              {formikProps.errors.city && (
                <Text style={styles.error}>{formikProps.errors.city}</Text>
              )}

              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Gender.png')}
                  style={[GlobalStyles.iconeStyle]}
                />

                <RNPickerSelect
                  placeholder={{
                    label: 'Country',
                    color: AppColor.darkGray,
                  }}
                  onValueChange={value => {
                    // console.log('value', value);
                    // if (!value) return;
                    let country = countries.filter(x => x.value === value)[0];
                    console.log('country', country);
                    formikProps.setFieldValue('country', country);
                  }}
                  items={countries}
                  value={formikProps.values.countr?.value}>
                  <Text
                    style={
                      formikProps.values.country?.value
                        ? styles.content
                        : {
                            ...styles.content,
                            color: AppColor.lightGray,
                          }
                    }>
                    {formikProps.values.country?.label ?? 'country'}
                    {/* {console.log(formikProps.values.country?.label)} */}
                  </Text>
                </RNPickerSelect>

                <Icon
                  name="chevron-down"
                  size={20}
                  color={AppColor.lightGray}
                />
              </View>
              {formikProps.errors.country && (
                <Text style={styles.error}>{formikProps.errors.country}</Text>
              )}

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
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  secureTextEntry={!alertIcon ? isPassword : false}
                  placeholder="Password"
                />

                {alertIcon && (
                  <Image
                    source={require('../Assets/SignUp/Alert-logo.png')}
                    style={[GlobalStyles.iconeStyle]}
                  />
                )}
                {!alertIcon && (
                  <Pressable
                    onPress={() => {
                      setIsPassword(!isPassword);
                    }}>
                    <Image
                      source={require('../Assets/Login/Eye.png')}
                      style={[GlobalStyles.iconeStyle]}
                    />
                  </Pressable>
                )}
              </View>
              {formikProps.errors.password && (
                <Text style={styles.error}>{formikProps.errors.password}</Text>
              )}

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
                  value={formikProps.values.confirmPassword}
                  onChangeText={formikProps.handleChange('confirmPassword')}
                  onBlur={formikProps.handleBlur('confirmPassword')}
                  secureTextEntry={isConfirmPassword}
                  placeholder="Confirm Password"
                />
                <Pressable
                  onPress={() => {
                    setIsConfirmPassword(!isConfirmPassword);
                  }}>
                  <Image
                    source={require('../Assets/Login/Eye.png')}
                    style={[GlobalStyles.iconeStyle]}
                  />
                </Pressable>
              </View>
              {formikProps.errors.confirmPassword && (
                <Text style={styles.error}>
                  {formikProps.errors.confirmPassword}
                </Text>
              )}

              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Calender.png')}
                  style={[GlobalStyles.iconeStyle]}
                />

                <TouchableWithoutFeedback onPress={showDatePicker}>
                  <View style={GlobalStyles.inputBorderView}>
                    <Text
                      style={[
                        GlobalStyles.textInput,
                        {
                          color:
                            dateSelected == 'Select date'
                              ? AppColor.lightGray
                              : AppColor.black,
                        },
                      ]}>
                      {dateSelected}
                    </Text>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={date => {
                        var newDate = moment(date).format('DD-MM-YYYY');
                        console.log('date', newDate);
                        formikProps.setFieldValue('dob', newDate);

                        setDateSelected(newDate);

                        hideDatePicker();
                      }}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </TouchableWithoutFeedback>

                <Icon name="chevron-right" size={20} color={AppColor.white} />
              </View>
              {formikProps.errors.dob && (
                <Text style={styles.error}>{formikProps.errors.dob}</Text>
              )}

              {/* <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Phone.png')}
                  style={[GlobalStyles.iconeStyle]}
                />
                <TextInput
                  style={[GlobalStyles.textInput]}
                  placeholderTextColor={AppColor.lightGray}
                  onChangeText={formikProps.handleChange('phoneNumber')}
                  onBlur={formikProps.handleBlur('phoneNumber')}
                  placeholder="Phone Number"
                  keyboardType={'numeric'}
                />
                <Image
                  source={require('../Assets/Login/Eye.png')}
                  tintColor={AppColor.white}
                  style={[GlobalStyles.iconeStyle]}
                />
              </View> */}

              <View
                style={[
                  GlobalStyles.TextFieldBg,
                  {
                    marginTop: 20,
                  },
                ]}>
                <Image
                  source={require('../Assets/SignUp/Gender.png')}
                  style={[GlobalStyles.iconeStyle]}
                />

                {/* <RNPickerSelect
                  placeholder={{
                    label: 'Gender',
                    color: AppColor.darkGray,
                  }}
                  // fixAndroidTouchableBug
                  onValueChange={value => {
                    // console.log('value', value);
                    // if (!value) return;
                    let pay = genders.filter(x => x.value === value)[0];
                    formikProps.setFieldValue('gender', pay);
                  }}
                  items={genders}
                  value={formikProps.values.gender?.value}>
                  <Text
                    style={
                      formikProps.values.gender?.value
                        ? styles.content
                        : {
                            ...styles.content,
                            color: AppColor.Grey,
                          }
                    }>
                    {formikProps.values.gender?.label ?? 'Gender'}
                  </Text>
                </RNPickerSelect> */}
                <RNPickerSelect
                  placeholder={{
                    label: 'Gender',
                    color: AppColor.darkGray,
                  }}
                  onValueChange={value => {
                    // console.log('value', value);
                    // if (!value) return;
                    let pay = genders.filter(x => x.value === value)[0];
                    console.log('pay', pay);
                    formikProps.setFieldValue('gender', pay);
                  }}
                  items={genders}
                  value={formikProps.values.gender?.value}>
                  <Text
                    style={
                      formikProps.values.gender?.value
                        ? styles.content
                        : {
                            ...styles.content,
                            color: AppColor.lightGray,
                          }
                    }>
                    {formikProps.values.gender?.label ?? 'Gender'}
                  </Text>
                </RNPickerSelect>

                <Icon
                  name="chevron-down"
                  size={20}
                  color={AppColor.lightGray}
                />
              </View>
              {formikProps.errors.gender && (
                <Text style={styles.error}>{formikProps.errors.gender}</Text>
              )}

              {/* <View style={[styles.selectingView, {justifyContent: 'center'}]}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Gender',
                    color: AppColor.darkGray,
                  }}
                  onValueChange={value => {
                    // console.log('value', value);
                    // if (!value) return;
                    let pay = genders.filter(x => x.value === value)[0];
                    console.log('pay', pay);
                    formikProps.setFieldValue('gender', pay);
                  }}
                  items={genders}
                  value={formikProps.values.gender?.value}>
                  <Text
                    style={
                      formikProps.values.gender?.value
                        ? styles.content
                        : {
                            ...styles.content,
                            color: AppColor.lightGray,
                          }
                    }>
                    {formikProps.values.gender?.label ?? 'Gender'}
                  </Text>
                </RNPickerSelect>
              </View> */}

              <View style={[GlobalStyles.flexRow, {marginTop: 30}]}>
                <Image
                  source={require('../Assets/SignUp/Check.png')}
                  style={[GlobalStyles.iconeStyle, {marginRight: 5}]}
                />
                <Text style={{color: AppColor.lightGray}}>
                  {'Terms & Conditions'}
                </Text>
              </View>

              <Button
                style={[GlobalStyles.greenbutton, {marginTop: 60}]}
                //   icon="arrow-right"
                contentStyle={{flexDirection: 'row-reverse'}}
                onPress={formikProps.handleSubmit}
                labelStyle={GlobalStyles.buttonHrLbl}>
                Sign in
              </Button>
            </View>
          )}
        </Formik>
        {/* <Button
          style={[GlobalStyles.borderButton, {marginTop: 10}]}
          //   icon="arrow-right"
          contentStyle={{flexDirection: 'row-reverse'}}
          onPress={() => {}}
          labelStyle={{color: AppColor.darkGray}}>
          Sign in WITH
        </Button> */}

        <Pressable onPress={() => navigation.navigate('loginScreen')}>
          <Text style={styles.forgotText}>Back to Login</Text>
        </Pressable>
        {loaderVisible && (
          <Loader
            loaderVisible={loaderVisible}
            setLoaderVisible={setLoaderVisible}
          />
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: {
    fontSize: 15,
    // marginLeft: 15,
    color: AppColor.black,
    // backgroundColor: 'red',
    paddingHorizontal: 80,
    paddingVertical: 5,
    backgroundColor: AppColor.white,
    // fontWeight: 'bold',
    // backgroundColor: 'red',
    // width: 220,
  },
  error: {
    // backgroundColor: 'red',
    width: 300,
    color: 'tomato',
  },
  forgotText: {
    color: AppColor.greenButton,
    fontSize: 16,
    // fontWeight: 'bold',
    marginTop: 30,
  },
  selectCountry: {
    backgroundColor: 'white',
  },
});

export default SignIn;
