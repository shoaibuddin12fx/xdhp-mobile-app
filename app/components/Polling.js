import React from 'react';
import {useState} from 'react';
import {Text, TextInput, StyleSheet, View, Image, CheckBox} from 'react-native';
import {AppColor} from '../shared/appColors';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const optionsData = [100, 50, 70, 90];

export const PollingInput = ({text, onChangeText, props}) => {
  const navigation = useNavigation();
  useEffect(() => {}, [PollingFeed]);
  return (
    <>
      {/* {showPoll == true ? (
        <StartAPoll />
      ) : ( */}
      <>
        <View style={styles.container}>
          <View style={styles.inputview}>
            <Image
              source={require('../Assets/alvaro-bernal-RgIKRYhmG2k-unsplash.png')}
              style={styles.image}></Image>
            <Text
              style={styles.input}
              // onPress={() => setShowPoll(true)}
              onPress={() => {
                navigation.navigate('startPoll');
              }}
              // onChangeText={() => onChangeText()}
              value={text}
              // placeholder=""
            >
              Start a poll
            </Text>
          </View>
        </View>
        <PollingFeed />
      </>
      {/* )} */}
    </>
  );
};

export const PollingFeed = () => {
  return (
    <View style={PollingFeedStyles.container}>
      <View style={PollingFeedStyles.profile}>
        <View style={PollingFeedStyles.imageView}>
          <Image
            source={require('../Assets/alvaro-bernal-RgIKRYhmG2k-unsplash.png')}
            style={PollingFeedStyles.image}></Image>
        </View>
        <View style={PollingFeedStyles.nameView}>
          <Text style={PollingFeedStyles.text}>Sarah Cruise</Text>
        </View>
        <View style={PollingFeedStyles.dotView}>
          <Text style={PollingFeedStyles.dot}>...</Text>
        </View>
      </View>
      {optionsData.map((option, index) => {
        return (
          <>
            <OptionPercent option={option} index={index} />
          </>
        );
      })}
      <ActionIcons />
      <Caption />
    </View>
  );
};
export const OptionPercent = ({option, index}) => {
  const [checkOption, setCheckOption] = useState(option);
  return (
    <View style={optionStyle.container}>
      <View style={optionStyle.percentbar}>
        {/* {console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', typeof option)} */}
        <View
          style={{
            height: '100%',
            width: `${checkOption || 0}%`,
            borderRadius: 100,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: AppColor.greenButton,
          }}>
          <Text style={optionStyle.textOption}>option {index + 1}</Text>
        </View>
        <Text
          style={[optionStyle.textOption1, {transform: [{translateX: 230}]}]}>
          {checkOption}%
        </Text>
      </View>
      <View style={optionStyle.checkBox}>
        <Text
          onPress={() => {
            console.log('set check option', (optionsData[index] += 1));
            if (checkOption < 100) {
              setCheckOption(checkOption + 1);
            } else {
              setCheckOption(100);
            }
          }}></Text>
      </View>
    </View>
  );
};

export const ActionIcons = () => {
  return (
    <View style={actionStyles.contianer}>
      <View style={actionStyles.heartAndComment}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/like.png')}
            style={{height: 20, width: 20}}></Image>
          <Text style={{marginLeft: 5}}>3.4k</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/message2.png')}
            style={{height: 21, width: 25}}></Image>
          <Text style={{marginLeft: 5}}>6.4k</Text>
        </View>
      </View>
      <View>
        <Image
          source={require('../Assets/Share.png')}
          style={{height: 20, width: 20}}></Image>
      </View>
    </View>
  );
};

const Caption = () => {
  return (
    <View style={captionStyles.container}>
      <View style={captionStyles.caption}>
        <Text>
          Try wrapping the image with a linearlayout, and set it's background to
          the border color you want around the text. border-color - CSS:
          Cascading Style Sheets - ...asdasd asd as da sd asd asd as da sd asd
          asd as d asd asd as da sd asd asd as das da sd asd
        </Text>
      </View>
      <View style={captionStyles.days}>
        <Text>5d</Text>
      </View>
    </View>
  );
};

const StartAPoll = () => {
  return (
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
      <View>
        <TextInput placeholder="Your Thoughts" style={startPollStyles.input} />
      </View>
      <View>
        <Text style={startPollStyles.label}>Poll Tags</Text>
        <TextInput placeholder="Tags" style={startPollStyles.input} />
      </View>
      <View>
        <Text style={startPollStyles.label}>Polls</Text>
        <TextInput placeholder="Option 1" style={startPollStyles.input} />
      </View>
      <View style={startPollStyles.add}>
        <Text style={startPollStyles.text}>+</Text>
      </View>
    </View>
  );
};

const startPollStyles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  input: {
    marginLeft: 20,
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
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
  },
});

const captionStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  caption: {
    // backgroundColor: 'magenta',
    height: 100,
    width: '80%',
    paddingLeft: 20,
    paddingBottom: 10,
    color: AppColor.darkGray,
    fontWeight: '500',
  },
  days: {
    height: 100,
    width: 40,
    color: AppColor.lightGray,
    fontSize: 100,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    // backgroundColor: 'black',
  },
});

const actionStyles = StyleSheet.create({
  contianer: {
    height: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingLeft: 20,
    paddingRight: 20,
  },
  heartAndComment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 130,
    // backgroundColor: 'white',
  },
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // height: 'auto',
    width: '100%',

    // display: 'flex',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 20,
  },
  inputview: {
    width: '90%',
    height: 50,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 25,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 100,
    paddingLeft: 20,
    marginRight: 20,
    color: AppColor.lightGray,
    fontSize: 15,
    fontWeight: 'bold',
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

const optionStyle = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  percentbar: {
    height: 40,
    width: 280,
    borderRadius: 100,
    backgroundColor: '#CFFFFF',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percent: {
    height: '100%',
    width: '50%',
    borderRadius: 100,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: AppColor.greenButton,
  },
  textOption: {
    position: 'absolute',
    width: 100,
    color: AppColor.darkGray,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
    marginBottom: 1,
    marginRight: 1,
    marginLeft: 20,
  },
  textOption1: {
    position: 'absolute',
    width: 100,
    color: AppColor.darkGray,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
    // marginBottom: 1,
    // marginRight: 1,
    // marginLeft: 20,
  },
  checkBox: {
    height: 30,
    width: 30,
    backgroundColor: 'none',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#17A09F',
  },
});
