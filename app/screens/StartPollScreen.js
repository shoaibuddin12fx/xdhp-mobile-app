import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {TextInput} from 'react-native';
import {Text} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import {Button} from 'react-native';
import {useState} from 'react';
import {ScrollView} from 'native-base';
import {useEffect, useMemo} from 'react';

const StartPoll = props => {
  const {navigation, route} = props;
  let [options, addOption] = useState([1]);
  let a = useMemo(() => options);

  useEffect(() => {}, [options]);

  return (
    <ScrollView>
      <View style={[GlobalStyles.flexRow, startPollStyles.header]}>
        <Icon
          name="arrow-left"
          size={20}
          color={AppColor.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={[startPollStyles.headerText]}>Start a Poll</Text>
      </View>
      <View styles={startPollStyles.container}>
        <View style={PollingFeedStyles.profile}>
          <View style={PollingFeedStyles.imageView}>
            <Image
              source={require('../Assets/alvaro-bernal-RgIKRYhmG2k-unsplash.png')}
              style={PollingFeedStyles.image}></Image>
          </View>
          <View style={PollingFeedStyles.nameView}>
            <Text style={PollingFeedStyles.text}>Sarah Cruise</Text>
          </View>
        </View>
        <View style={startPollStyles.YourThoughts}>
          <TextInput
            placeholder="Your Thoughts"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View>
          <Text style={startPollStyles.label}>Poll Tags</Text>
          <TextInput placeholder="Tags" style={startPollStyles.input} />
        </View>
        <View>
          <Text style={startPollStyles.label}>Polls</Text>
          {options?.map((option, i) => {
            return (
              <TextInput
                placeholder={`Option ${i}`}
                style={startPollStyles.input}
              />
            );
          })}
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingRight: 10,
            // backgroundColor: 'yellow',
          }}>
          <View style={startPollStyles.add}>
            <Text
              style={startPollStyles.text}
              onPress={() => {
                let temp = a;
                console.log('options');

                addOption([temp, ...options]);
              }}>
              +
            </Text>
          </View>
        </View>
        <View style={{height: 120}}></View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
          }}>
          <Button
            placeholder="submit"
            title="submit"
            style={startPollStyles.submit}
            color={AppColor.greenButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const startPollStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: AppColor.white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    height: 50,
    width: 50,
    backgroundColor: AppColor.greenButton,
    borderRadius: 100,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
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
export default StartPoll;
