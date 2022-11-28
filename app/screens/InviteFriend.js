// import {avatarSizes} from '@rneui/base/dist/Avatar/Avatar';
import React from 'react';
import {useState} from 'react';
import {Image} from 'react-native';
import {
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  CheckBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import {RadioButton} from 'react-native-paper';

const people = [
  {
    name: 'John.J',
    avatar: require('../Assets/DHP03/Profile/My Profile/ayo-ogunseinde-Erstoy-MuVA-unsplash.png'),
  },
  {
    name: 'Lelah',
    avatar: require('../Assets/DHP03/Profile/My Profile/ayo-ogunseinde-Erstoy-MuVA-unsplash.png'),
  },
  {
    name: 'Emmaneul',
    avatar: require('../Assets/DHP03/Profile/My Profile/ayo-ogunseinde-Erstoy-MuVA-unsplash.png'),
  },
];

const InviteFriend = props => {
  const {navigation, route} = props;
  const [search, setSearch] = useState('');
  const [checked, setChecked] = React.useState('first');
  const [isSelected, setSelection] = useState(false);
  return (
    <>
      <View style={[startPollStyles.header, GlobalStyles.flexColumn]}>
        <View style={[GlobalStyles.flexRow]}>
          <Icon
            name="arrow-left"
            size={20}
            color={AppColor.black}
            onPress={() => navigation.goBack()}
          />
          <Text style={[startPollStyles.headerText]}>Invite friends</Text>
        </View>
        <View style={[styles.searchView]}>
          <Image
            source={require('../Assets/search.png')}
            style={[{width: 15, height: 15}]}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'black'}
            style={{color: 'black', marginLeft: 10}}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        {people.map((person, i) => {
          return (
            <View style={[styles.listView]}>
              <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                <Image source={person.avatar} style={{height: 50, width: 50}} />
                <Text style={{color: 'black'}}>
                  {person.name}
                  {/* {person.avatar} */}
                </Text>
              </View>
              <RadioButton
                value=""
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              {/* <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              /> */}
            </View>
          );
        })}
      </ScrollView>
      <View styles={styles.buttonView} onPress={() => setSearch('')}>
        <Button
          title="invite"
          color={AppColor.greenButton}
          onPress={() => setSearch('')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    height: 100,
    width: 100,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  listView: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    // sh,
  },
  searchView: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingLeft: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});

const startPollStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: 'auto',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: AppColor.white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    // alignItems: 'center',
    // height: 60,
    // paddingHorizontal: 15,
    // width: '100%',
    // backgroundColor: AppColor.white,
  },
  submit: {
    backgroundColor: AppColor.greenButton,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 10,
  },
  YourThoughts: {
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'white',
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  add: {
    width: '100%',
    paddingLeft: 20,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
  },
});
const PollingFeedStyles = StyleSheet.create({
  container: {
    width: '90%',
    height: 418,
    backgroundColor: 'white',
    // paddingLeft: 20,
    // paddingRight: 20,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 16,
  },
  profile: {
    position: 'relative',
    width: '100%',
    height: 71,
    // backgroundColor: 'lightgreen',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // paddingLeft: 30,
    // paddingRight: 40,
  },
  imageView: {
    // backgroundColor: 'red',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  nameView: {
    // backgroundColor: 'lightblue',
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    color: AppColor.darkGray,
  },
  text: {
    color: AppColor.darkGray,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dotView: {
    width: '20%',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    color: AppColor.lightGray,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default InviteFriend;
