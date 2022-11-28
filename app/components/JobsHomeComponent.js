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
import {IconButton, Button} from 'react-native-paper';
import {getUser, getUserData} from '../helpers/localStorage';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';

function JobsHomeComponent(props) {
  const {
    navigation,
    route,
    setGetJobData,
    setJobViewPopupVisible,
    jobsHomeData,
    setGetJobId,
    getJobByID,
  } = props;

  // const [jobsHomeData, setJobsHomeData] = useState([
  //   {
  //     companyLogo: require('../Assets/job-logo-9.png'),
  //     jobtitle: 'Sales & Customer Success Manager',
  //     companyLoction: '4234 Chardonnay Drive, FL, USA',
  //     jobTime: 'PART TIME',
  //     company: 'Maxman',
  //   },
  //   {
  //     companyLogo: require('../Assets/job-logo-5.png'),
  //     jobtitle: 'Sales & Customer Success Manager',
  //     companyLoction: '4234 Chardonnay Drive, FL, USA',
  //     jobTime: 'FULL TIME',
  //     company: 'Nazti Inc',
  //   },
  //   {
  //     companyLogo: require('../Assets/job-logo-4.png'),
  //     jobtitle: 'Sales & Customer Success Manager',
  //     companyLoction: '4234 Chardonnay Drive, FL, USA',
  //     jobTime: 'PART TIME',
  //     company: 'Astray',
  //   },
  //   {
  //     companyLogo: require('../Assets/job-logo-9.png'),
  //     jobtitle: 'Sales & Customer Success Manager',
  //     companyLoction: '4234 Chardonnay Drive, FL, USA',
  //     jobTime: 'FULL TIME',
  //     company: 'Maxman',
  //   },
  // ]);

  const JobsHome = ({item}) => {
    console.log('jobsHomeData', item);
    return (
      <Pressable
        onPress={() => {
          setJobViewPopupVisible(true);
          // setGetJobData(item)
          getJobByID(item.id);
        }}>
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              backgroundColor: AppColor.white,
              padding: 10,
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              elevation: 5,
              marginTop: 5,
              marginBottom: 10,
            },
          ]}>
          <View>
            <Image
              // source={item.company_logo}
              source={
                item.company_logo == '' ||
                item.company_logo == 'test company logo'
                  ? require('../Assets/job-logo-9.png')
                  : {uri: item.company_logo}
              }
              style={{width: 80, height: 80, resizeMode: 'contain'}}
            />
            <View
              style={[
                GlobalStyles.flexRow1,
                {justifyContent: 'space-around', marginTop: 10},
              ]}>
              <Image
                source={require('../Assets/web1.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
              <Image
                source={require('../Assets/linkedin.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </View>
          </View>
          <View style={{marginLeft: 10, width: '75%'}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 15,
                width: '100%',
                color: AppColor.darkGray,
                fontWeight: 'bold',
              }}>
              {item?.description}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 13,
                color: AppColor.lightGray,
                width: '100%',
                marginTop: 5,
                //   fontWeight: 'bold',
              }}>
              {item?.address}
            </Text>
            <View
              style={[
                GlobalStyles.flexRow1,
                {justifyContent: 'space-between', marginTop: 45},
              ]}>
              <Text
                style={{
                  fontSize: 13,
                  color: AppColor.darkGray,
                  //   marginTop: 5,
                  fontWeight: '500',
                }}>
                {item?.company_name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: AppColor.greenButton,

                  //   marginTop: 5,
                  fontWeight: '500',
                }}>
                {item?.type_name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={[GlobalStyles.container, {alignItems: 'center'}]}>
      <View>
        <FlatList
          contentContainerStyle={{width: '100%', padding: 10}}
          // style={{backgroundColor:'red',width:'100%'}}
          data={jobsHomeData}
          renderItem={JobsHome}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default JobsHomeComponent;
