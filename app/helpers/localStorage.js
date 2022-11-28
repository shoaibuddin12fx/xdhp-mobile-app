import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUser = value => {
  storeData('user', value, true);
};

export const setUserData = value => {
  storeData('user_data', value, true);
};

export const getUser = async () => {
  return new Promise(async (resolve, reject) => {
    var appUser;
    // return getData('user');
    let user = await getData('user');
    if (user && user.length) {
      appUser = JSON.parse(user);
      // console.log('jsonUser', user);
      resolve(appUser);
    } else resolve(null);
  });
  // return appUser;
};

export const getUserData = async () => {
  return new Promise(async (resolve, reject) => {
    var appUser;
    // return getData('user');
    let user = await getData('user_data');
    console.log('getUserData', user);
    if (user) {
      appUser = JSON.parse(user);
      console.log('json user_data', user);
      resolve(appUser);
    } else resolve(null);
  });
  // return appUser;
};

export const getToken = () => {
  return new Promise(async res => {
    let user = await getUser();
    if (user && user.token) res(user.token);
    else res(null);
  });
};

export const IsValidUser = () => {
  return new Promise(async res => {
    let data = await getUserData();
    let isValid =
      data &&
      notIsNullOrEmpty(data.token) &&
      addDays(data.timeStamp, 160) > new Date() &&
      !data._2faRequired;
    res(isValid);
  });
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('user');
};

export const storeData = async (key, value, stringify = false) => {
  try {
    await AsyncStorage.setItem(key, stringify ? JSON.stringify(value) : value);
    console.log('saved', key, value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getData = async (key, parse = false) => {
  try {
    var value = await AsyncStorage.getItem(key);
    if (value) {
      console.log('getData', value);
      if (parse) value = JSON.parse(value);
      console.log('parsedData', value);
      return value;
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
