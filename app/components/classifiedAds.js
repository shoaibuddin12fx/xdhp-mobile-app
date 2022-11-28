// import {View} from 'native-base';
import {Hidden, ScrollView} from 'native-base';
import React from 'react';
// import {Image} from 'react-native';
// import {ImageBackground} from 'react-native';
import {StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import {AppColor} from '../shared/appColors';
// import {Text, View} from 'react-native';
import watch2 from '../Assets/watch2.png';

const Images = [
  {
    image1: {
      key: 1,
      src: require('../Assets/watch2.png'),
    },
  },
];

const flatListData = [
  {key: 'A'},
  {key: 'B'},
  {key: 'C'},
  {key: 'D'},
  {key: 'E'},
  {key: 'F'},
  {key: 'G'},
  {key: 'H'},
  {key: 'I'},
  {key: 'J'},
  {key: 'k'},
];

export const Home = props => {
  return (
    <ScrollView
      style={homeCatStyles.scrollView}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {/* <Text style={homeCatStyles.container}>Hello Home Category</Text> */}
      <View style={homeCatStyles.view}>
        <Image
          source={require('../Assets/watch2.png')}
          style={{height: 145, width: 275, borderRadius: 16}}
        />
      </View>
      <View style={homeCatStyles.view}>
        <Image
          source={require('../Assets/watch2.png')}
          style={{height: 145, width: 275, borderRadius: 16}}
        />
      </View>
      <View style={homeCatStyles.view}>
        <Image
          source={require('../Assets/watch2.png')}
          style={{height: 145, width: 275, borderRadius: 16}}
        />
      </View>
      <View style={homeCatStyles.view}>
        <Image
          source={require('../Assets/watch2.png')}
          style={{height: 145, width: 275, borderRadius: 16}}
        />
      </View>
    </ScrollView>
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};
const numColumns = 2;

export const GridView = props => {
  return (
    <FlatList
      //   style={{padding: 10}}
      data={formatData(flatListData, numColumns)}
      renderItem={({item}) => (
        <View style={GridStyles.container}>
          <View style={GridStyles.viewImage}>
            <Image
              source={require('../Assets/alvaro-bernal-RgIKRYhmG2k-unsplash.png')}
              style={GridStyles.image}></Image>
          </View>

          <View style={GridStyles.viewHeading}>
            <Text style={GridStyles.heading}>NJ Watch</Text>
          </View>
          <View style={GridStyles.viewText}>
            <Text style={GridStyles.text}>
              First Approach - Using React Native ImageBackground · The source
              property requires a source to your background image placed in your
              assets' folder in your app.
            </Text>
          </View>
          <View style={GridStyles.viewButton}>
            <Button title="$ 300" color={AppColor.greenButton}></Button>
          </View>
        </View>
      )}
      //   Setting the number of column
      numColumns={numColumns}
      //   keyExtractor={(item, index) => index.toString()}
    />
  );
};

const categories = ['Local Places', 'Service', 'For Rent', 'Recent'];
const localPlaces = [
  'Grocery Stores',
  'Restaurants',
  'Doctors',
  'Islamic Schools',
  'Classes/Workshop',
  'General',
  'Lost & found',
  'Musicians/DJ',
];
export const Categories = () => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={CatStyles.scrollview}>
        {categories.map((cat, i) => {
          return <Text style={CatStyles.select}>{cat}</Text>;
        })}
      </ScrollView>
      <FlatList
        data={localPlaces}
        renderItem={({item}) => {
          return (
            <View>
              <Text style={CatStyles.flatlist}>. {item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export const MyAdverts = () => {
  return (
    <View>
      <Text>this is My Adverts</Text>
    </View>
  );
};

const homeCatStyles = StyleSheet.create({
  scrollView: {
    padding: 15,
    width: 'auto',
    border: 'solid 2px',
    fontSize: 20,
    color: 'black',
  },
  view: {
    backgroundColor: 'blue',
    height: 145,
    width: 275,
    borderRadius: 16,
    marginRight: 15,
  },
});

const GridStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    height: 300,
    width: 200,
    paddingLeft: 30,
    marginBottom: 30,
  },
  viewImage: {},
  image: {
    height: 150,
    width: 150,
    borderRadius: 16,
  },
  viewHeading: {
    height: 40,
    // paddingTop: 5,
  },
  heading: {
    // fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
  },
  viewText: {
    // height: 30,
    width: 150,
  },
  text: {
    fontSize: 10,
    fontFamily: 'bold',
    margin: 5,
    paddingLeft: 5,
    color: AppColor.lightGray,
  },
  viewButton: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 100,
    // height: 20,
  },
  button: {},
});

const CatStyles = StyleSheet.create({
  scrollview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 'auto',
    // backgroundColor: 'black',
  },
  catView: {
    display: 'flex',
    height: 100,
    backgroundColor: 'red',
  },
  select: {
    color: 'black',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 16,
    height: 30,
    width: 100,
    paddingTop: 6,
    margin: 10,
    backgroundColor: AppColor.greenButton,
    fontSize: 12,
    color: 'white',
    // paddingLeft: 10,
  },
  flatlist: {
    backgroundColor: '',
    color: 'black',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    color: AppColor.darkGray,
  },
});
