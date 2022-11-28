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
import {IconButton, Button, Avatar} from 'react-native-paper';
import {getUser, getUserData} from '../helpers/localStorage';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-player';
import * as Progress from 'react-native-progress';

function VolunteerHome(props) {
  const {navigation, route} = props;
  const [volunteerList, setVolunteerList] = useState([
    {
      image: require('../Assets/postImage.png'),
      name: 'Olivia Walter',
      skills: 'Engineering, Education',
    },
    {
      image: require('../Assets/notificationImge3.png'),
      name: 'Olivia Walter',
      skills: 'Engineering, Education',
    },
    {
      image: require('../Assets/postImage.png'),
      name: 'Olivia Walter',
      skills: 'Engineering, Education',
    },
    {
      image: require('../Assets/notificationImge3.png'),
      name: 'Olivia Walter',
      skills: 'Engineering, Education',
    },
  ]);

  const TopBtnLayout = () => {
    return (
      <View style={{position: 'relative'}}>
        <Button
          style={styles.videoLink}
          labelStyle={{fontSize: 13}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          FIND A VOLUNTEER
        </Button>
        <Icon
          style={{
            position: 'absolute',
            top: 7,
            right: 10,
          }}
          name="filter"
          size={22}
          color={AppColor.white}
        />
      </View>
    );
  };

  const VolunteersList = ({item}) => {
    return (
      <View
        style={[
          GlobalStyles.flexRow1,
          {
            paddingVertical: 20,
            backgroundColor: AppColor.white,
            width: '100%',
            borderBottomWidth: 1,
            borderColor: AppColor.lightGray2,
          },
        ]}>
        <Avatar.Image
          style={{backgroundColor: AppColor.white}}
          size={60}
          source={item.image}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              color: AppColor.darkGray,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            {item.name}
          </Text>
          <Text style={{color: AppColor.lightGray, fontSize: 11}}>
            {'Volunteer For'}
          </Text>
          <Text style={{color: AppColor.greenButton, fontSize: 12}}>
            {item.skills}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[
        GlobalStyles.container3,
        {paddingVertical: 10, paddingHorizontal: 15},
      ]}>
      <View>
        <FlatList
          data={volunteerList}
          renderItem={VolunteersList}
          ListHeaderComponent={TopBtnLayout}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  videoLink: {
    width: Dimensions.get('window').width / 1.08,
    backgroundColor: AppColor.greenButton,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'relative',
  },
});

export default VolunteerHome;
