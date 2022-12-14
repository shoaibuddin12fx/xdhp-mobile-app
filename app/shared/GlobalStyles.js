import {StyleSheet} from 'react-native';
import {AppColor} from '../shared/appColors';
import {Dimensions} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  appBackground: {
    // paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    // flex: 1,
    // backgroundColor: '#f6f6f6',
  },
  borderedView: {
    // borderBottomColor: AppColor.lightGray,
    borderBottomWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    paddingHorizontal: 7,
    marginTop: 10,
  },
  blackbutton2: {
    width: '47%',
    height: 50,
    backgroundColor: AppColor.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 0,
  },
  greenbutton2: {
    width: '47%',
    height: 50,
    backgroundColor: AppColor.greenButton,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 0,
  },
  greenbutton: {
    backgroundColor: AppColor.greenButton,
    // borderColor: AppColor.white,
    width: Dimensions.get('window').width / 1.6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 25,
  },
  borderButton: {
    backgroundColor: AppColor.white,
    borderColor: AppColor.darkGray,
    width: Dimensions.get('window').width / 1.6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 25,
  },
  grayButton: {
    backgroundColor: AppColor.darkGray,
    // borderColor: AppColor.white,
    width: Dimensions.get('window').width / 1.6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 25,
  },
  buttonHrLbl: {
    color: AppColor.white,
    fontSize: 14,
    // backgroundColor: 'red',
    // paddingHorizontal: 100,
  },
  buttonHrLbl: {
    color: AppColor.white,
    fontSize: 16,
  },
  button: {
    width: 275,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnFont: {
    fontSize: 15,
    color: AppColor.white,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredWithFlex: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centered2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  centeredText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColor.appBg,
  },
  container3: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  flex: {
    flex: 1,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRow1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconeStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  textInput: {
    // backgroundColor: 'red',
    // marginLeft: 10,
    fontSize: 15,
    color: AppColor.black,
    textAlign: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 40,
    // fontWeight: 'bold',
    // width: '80%',
    // textAlign: 'center',
    // marginLeft: 10,
  },
  textInput2: {
    marginLeft: 10,
    fontSize: 15,
    color: AppColor.black,
    fontWeight: 'bold',
    width: '80%',
  },
  TextFieldBg: {
    width: Dimensions.get('window').width / 1.3,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    // justifyContent: '',
    // paddingLeft: 10,
    // backgroundColor: AppColor.greenButton,
    borderRadius: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray,
  },
  logoStyle: {resizeMode: 'contain', width: 100, height: 100},
  modalTransparent: {
    height: '100%',
    // flex: 1,
    width: '100%',
    backgroundColor: 'rgba(5, 5, 5,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBorderView: {
    // width: 320,
    alignSelf: 'center',
    height: 55,
    // borderWidth: 1,
    // borderColor: AppColor.lightGrey,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20,
  },

  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    width: '95%',
    borderRadius: 10,
    // borderColor: AppColor.lightGray,
    borderWidth: 1,
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 5},
    shadowRadius: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop5: {
    marginTop: 5,
  },
  pagetitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: AppColor.title,
    marginTop: 10,
  },
  primaryBtnView: {
    width: 300,
    height: 45,
    backgroundColor: AppColor.primary,
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowBtn: {
    width: 300,
    height: 45,
    backgroundColor: AppColor.white,
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  shadowBtnFont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColor.primary,
    marginLeft: 10,
  },
  primaryBorderBtnView: {
    width: 220,
    height: 40,
    backgroundColor: AppColor.white,
    borderWidth: 2,
    borderColor: AppColor.primary,
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnView: {
    width: 220,
    height: 40,
    backgroundColor: AppColor.secondary,
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  separator: {
    borderBottomWidth: 1,
    // borderBottomColor: AppColor.lightGray,
  },
  // TextFieldBg: {
  //   // width: 280,
  //   width: '100%',
  //   height: 50,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   paddingLeft: 10,
  //   // backgroundColor: AppColor.textInput,
  //   borderRadius: 25,
  //   flexDirection: 'row',
  //   marginTop: 10,
  // },
  // textInput: {
  //   marginLeft: 10,
  //   fontSize: 15,
  //   color: AppColor.black,
  //   width: '80%',
  // },
  width: {
    width: '100%',
  },
});
