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

function ManageJobsComponent(props) {
    const {navigation, route} = props;
    const [manageJobsData, setManageJobsData] = useState([
        {
          companyLogo: require('../Assets/job-logo-9.png'),
          jobtitle: 'Sales & Customer Success Manager',
          companyLoction: '4234 Chardonnay Drive, FL, USA',
          jobTime: 'PART TIME',
          company: 'Maxman',
        },
        {
          companyLogo: require('../Assets/job-logo-5.png'),
          jobtitle: 'Sales & Customer Success Manager',
          companyLoction: '4234 Chardonnay Drive, FL, USA',
          jobTime: 'FULL TIME',
          company: 'Nazti Inc',
        },
        {
          companyLogo: require('../Assets/job-logo-4.png'),
          jobtitle: 'Sales & Customer Success Manager',
          companyLoction: '4234 Chardonnay Drive, FL, USA',
          jobTime: 'PART TIME',
          company: 'Astray',
        },
        {
          companyLogo: require('../Assets/job-logo-9.png'),
          jobtitle: 'Sales & Customer Success Manager',
          companyLoction: '4234 Chardonnay Drive, FL, USA',
          jobTime: 'FULL TIME',
          company: 'Maxman',
        },
      ]);
    const friendMenuOption = [
        {
          btn: 'Delete',
          type: 1,
        },
        {
          btn: 'End Job',
          type: 2,
        },
      ];

      const ManageJobs = ({item}) => {
        return (
            <View
            style={[
              {
                backgroundColor: AppColor.white,
                padding: 15,
                width: '100%',
                borderRadius: 12,
                elevation: 5,
                marginTop:5,
                marginBottom:10
              },
            ]}>
                <View style={[GlobalStyles.flexRow1,{justifyContent:'space-between'}]}>
                    <View style={GlobalStyles.flexRow1}>
                        <Text style={{fontSize:15,color:AppColor.darkGray}}>Publish date:</Text>
                        <Text style={{fontSize:15,color:AppColor.greenButton}}>{' Jan 2nd 2022'}</Text>
                    </View>
                    <View>
                        <Menu>
                <MenuTrigger>
                  <MIcon
                    // style={{marginRight: 5}}
                    name="dots-horizontal"
                    size={20}
                    color={AppColor.darkGray}
                  />
                </MenuTrigger>
    
                <MenuOptions
                  customStyles={{
                    // optionWrapper: {marginLeft: 10, marginRight: 10},
                    optionsContainer: {
                      width: 140,
    
                      marginLeft: -5,
                      marginTop: 15,
                      borderRadius: 8,
                      paddingLeft: 10,
                      backgroundColor: 'rgba(255, 255, 255,0.95)',
                      paddingBottom: 25,
                    },
                  }}>
                  {friendMenuOption.map(option => (
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color:
                            option?.type == 2
                              ? AppColor.cancel
                              : AppColor.darkGray,
                          fontSize: 12,
                        },
                      }}
                      style={{
                        padding: 5,
                      }}
                      onSelect={() => {}}
                      text={option?.btn}
                    />
                  ))}
                </MenuOptions>
              </Menu>
                        </View>
                </View>
                <View style={[GlobalStyles.flexRow1,{marginTop:10}]}>
            <View>
              <Image
                source={item.companyLogo}
                style={{width: 80, height: 80, resizeMode: 'contain'}}
              />
            
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
                {item.jobtitle}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 12,
                  color: AppColor.lightGray,
                  width: '100%',
                  marginTop: 5,
                  //   fontWeight: 'bold',
                }}>
                {'4234 Chardonnay Drive, FL, USA'}
              </Text>
    
              <View style={[GlobalStyles.flexRow1,{marginTop:2}]}>
                <View style={GlobalStyles.flexRow1}>
                <IIcon
                    name="briefcase"
                    size={15}
                    color={AppColor.lightGray}
                  />
                  <Text
                style={{
                  fontSize: 12,
                  color: AppColor.lightGray,
                  marginLeft: 5,
                  //   fontWeight: 'bold',
                }}>
                {'Administrative'}
              </Text>
                </View>
                <View style={[GlobalStyles.flexRow1,{marginLeft:10}]}>
                <IIcon
                    name="document-text"
                    size={15}
                    color={AppColor.lightGray}
                  />
                  <Text
                style={{
                  fontSize: 13,
                  color: AppColor.lightGray,
                  marginLeft: 5,
                  //   fontWeight: 'bold',
                }}>
                {'Full-Time'}
              </Text>
                </View>
              </View>
    
             
    
             
            </View>
            </View>
            <View style={[GlobalStyles.flexRow1,{marginTop:10,justifyContent:'space-between'}]}>
            <MIcon
                    // style={{marginTop: -5}}
                    name="share-variant"
                    size={20}
                    color={AppColor.darkGray}
                  />
                  <Text style={{fontSize:15,color:AppColor.cancel}}>ENDED</Text>
            </View>
          </View>
        );
      };
    return (
        <View style={[GlobalStyles.container, {alignItems: 'center',}]}>
        <View>
          <FlatList
                  contentContainerStyle={{width:'100%',padding:10}}
            data={manageJobsData}
            renderItem={ManageJobs}
            showsVerticalScrollIndicator={false}
          />
        </View>


     
      </View>
    );
}
const styles = StyleSheet.create({
    
})

export default ManageJobsComponent;