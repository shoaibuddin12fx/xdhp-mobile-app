import {Alert} from 'react-native';
import {notIsNullOrEmpty} from '../Utils/Util';
import SweetAlert from 'react-native-sweet-alert';

export const showSuccessAlert = (
  message,
  title = 'Success',
  callback = () => {},
) => {
  SweetAlert.showAlertWithOptions(
    {
      title,
      subTitle: message,
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#000',
      style: 'success',
      cancellable: true,
    },
    callback,
  );
};

export const showFailureAlert = (
  message,
  title = 'Error',
  callback = () => {},
) => {
  SweetAlert.showAlertWithOptions(
    {
      title,
      subTitle: message,
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#18a19e',
      // otherButtonTitle: "Cancel",
      // otherButtonColor: "#dedede",
      style: 'error',
      cancellable: true,
    },
    callback,
  );
};

export const AsyncAlertOptions = (
  title,
  message,
  agree = 'Yes',
  disAgree = 'No',
) => {
  return new Promise(resolve => {
    Alert.alert(
      title,
      message,
      [
        {text: agree, onPress: () => resolve(agree)},
        {text: disAgree, onPress: () => resolve(disAgree)},
      ],
      {cancelable: false},
    );
  });
};

export const AsyncAlert = (message, title = 'Alert') => {
  return new Promise(resolve => {
    Alert.alert(title, message, [{text: 'Ok', onPress: () => resolve('Ok')}], {
      cancelable: false,
    });
  });
};
