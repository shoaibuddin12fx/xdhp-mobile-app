import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
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
  Modal,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {IconButton, Button, Checkbox} from 'react-native-paper';
import {getUser, getUserData} from '../helpers/localStorage';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import RNPickerSelect from 'react-native-picker-select';

function FindJobsComponent(props) {
  const {navigation, route} = props;
  const [checked, setChecked] = React.useState(false);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobCategory, setJobCategory] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  const jobCategories = [
    {
      categorie: 'Administrative',
      checked: true,
    },
    {
      categorie: 'Commercial',
      checked: false,
    },
    {
      categorie: 'Engineering',
      checked: false,
    },
    {
      categorie: 'Computing and CIT',
      checked: false,
    },
    {
      categorie: 'Finance',
      checked: false,
    },
    {
      categorie: 'Marketing',
      checked: true,
    },
    {
      categorie: 'Health Care',
      checked: false,
    },
    {
      categorie: 'Education and Training',
      checked: false,
    },
    {
      categorie: 'Design,Arts and Crafts',
      checked: false,
    },
    {
      categorie: 'Performing Arts and Media',
      checked: false,
    },
    {
      categorie: 'Transportation',
      checked: false,
    },
    {
      categorie: 'Distribution and Logistics',
      checked: false,
    },
    {
      categorie: 'Domestic Services',
      checked: false,
    },
    {
      categorie: 'Telecommunication',
      checked: false,
    },
    {
      categorie: 'Sales Associates',
      checked: false,
    },
  ];

  useEffect(() => {
    getJobType();
    getJobCategories();
  }, []);

  const getJobType = async () => {
    showLoader();
    var result = await new ServiceApi().jobType();
    console.log('getJobType', result);
    if (result && result.data) {
      hideLoader();
      var type = [];
      result.data.forEach(x => {
        type.push({label: x.name, value: x.id});
      });
      console.log('typetype', type);
      setJobTypes(type);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getJobCategories = async () => {
    showLoader();
    var result = await new ServiceApi().jobCategories();
    console.log('getJobCategories', result);
    if (result && result.data) {
      hideLoader();
      var category = [];
      result.data.forEach(x => {
        category.push({label: x.name, value: x.id});
      });
      console.log('category', category);
      setJobCategory(category);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center'}]}>
      <View
        style={{backgroundColor: AppColor.white, marginTop: 5, width: '100%'}}>
        <Formik
          //   innerRef={CreatGroupPost}
          initialValues={{
            jobType: '',
            location: '',
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          // validationSchema={reviewSchema}
          onSubmit={(values, action) => {
            console.log('FormikValues', values);
            // setGroupPostDes(values.description);
            // return;
          }}>
          {formikProps => (
            <View style={{paddingHorizontal: 15}}>
              <View style={{marginTop: 15}}>
                <Text style={styles.inputTitle}>Location</Text>
                <TextInput
                  multiline={false}
                  style={styles.whatsNewText}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.location}
                  onChangeText={formikProps.handleChange('location')}
                  onBlur={formikProps.handleBlur('location')}
                  placeholder="City,Country"
                />
              </View>

              <View style={{marginTop: 15}}>
                <View style={styles.whatsNewTextR}>
                  <RNPickerSelect
                    Icon={<View></View>}
                    placeholder={{
                      label: 'Entry Fee',

                      color: AppColor.darkGray,
                    }}
                    onValueChange={value => {
                      console.log('value', value);
                      // if (!value) return;
                      let type = jobTypes.filter(x => x.value === value)[0];
                      console.log('eventType', type);
                      formikProps.setFieldValue('jobType', type);
                    }}
                    items={jobTypes}
                    value={formikProps.values.jobType?.value}>
                    <Text
                      style={
                        formikProps.values.jobType?.value
                          ? styles.content
                          : {
                              ...styles.content,
                              color: AppColor.lightGray,
                            }
                      }>
                      {formikProps.values.jobType?.label ?? 'Job Type'}
                    </Text>
                  </RNPickerSelect>
                </View>
              </View>
            </View>
          )}
        </Formik>
        <View style={[{paddingHorizontal: 15, marginTop: 25}]}>
          <View style={GlobalStyles.flexRow1}>
            <Text
              style={{
                color: AppColor.greenButton,
                fontWeight: '500',
                fontSize: 16,
              }}>
              Job Categories
            </Text>
            <View style={styles.lineStyle2} />
          </View>
          {jobCategory.map(item => (
            <View
              style={[
                GlobalStyles.flexRow1,
                {marginTop: 10, justifyContent: 'space-between'},
              ]}>
              <Text style={{color: AppColor.darkGray, fontSize: 16}}>
                {item.label}
              </Text>
              <Checkbox
                status={item.check ? 'checked' : 'unchecked'}
                onPress={() => {
                  //setChecked(item);
                  console.log('Item', item);
                  setJobCategory(
                    jobCategory.map(_item =>
                      item.value == _item.value
                        ? {
                            ..._item,
                            check:
                              _item.check != undefined ? !_item.check : true,
                          }
                        : _item,
                    ),
                  );
                }}
              />
            </View>
          ))}
          <Button
            style={{
              backgroundColor: AppColor.greenButton,
              width: '100%',
              marginTop: 80,
              marginBottom: 10,
            }}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            search
          </Button>
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
  content: {
    color: AppColor.darkGray,
  },
  camView: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 15,
  },
  inputTitle: {color: AppColor.darkGray, fontWeight: '500'},
  lineStyle2: {
    height: 1,
    backgroundColor: AppColor.lightGray,
    width: Dimensions.get('window').width / 1.62,
    marginLeft: 15,
    marginTop: 5,
  },
  whatsNewText: {
    color: AppColor.darkGray,
    backgroundColor: '#f2f2f2',
    height: 45,
    marginTop: 5,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  whatsNewTextR: {
    backgroundColor: '#f2f2f2',
    height: 45,
    marginTop: 5,
    fontSize: 16,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  whatsNewText2: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    fontSize: 16,
    width: '48%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  whatsNewText3: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    fontSize: 16,
    width: '48%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
});

export default FindJobsComponent;
