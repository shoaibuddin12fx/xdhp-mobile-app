import {getToken} from '../helpers/localStorage';
import {notIsNullOrEmpty} from '../Utils/util';
import axios from 'axios';

export class ServiceApi {
  static BASE_URL = 'https://xdhp.space/'; // DEVELOPMENT
  // static BASE_URL = 'http://34.219.98.167:3000/'; // DEVELOPMENT
  // static BASE_URL = 'https://ngcprepaid.co.za/'; // PRODUCTION
  static BASE_API_URL = `${ServiceApi.BASE_URL}api/v1`;

  constructor() {}

  getOrgnaizations() {
    return this.httpPost('GetOrgApi', null, 'GET');
  }

  addFireBaseToken(data) {
    return this.httpPost(
      `addFireBaseToken`,
      data,
      'POST',
      'MobileService',
      true,
      'multipart/form-data',
    );
  }

  // Shop API start

  login(data) {
    return this.httpPost('auth/login', data);
  }

  signup(data) {
    return this.httpPost('auth/signup', data);
  }

  getGender() {
    return this.httpPost('auth/user-genders', null, 'GET');
  }
  getCategorie() {
    return this.httpPost('categories/all', null, 'GET');
  }
  getProductByCategories() {
    return this.httpPost('product/by-categories', null, 'GET');
  }
  getProductById(id) {
    return this.httpPost(`product/id/${id}`, null, 'GET');
  }
  getProductByCategoriesId(id) {
    return this.httpPost(`product/category-id/${id}`, null, 'GET');
  }

  getBanners() {
    return this.httpPost('banners/get-banners', null, 'GET');
  }

  getProductData() {
    return this.httpPost('product/get-products-data', null, 'GET');
  }

  creatCart(data) {
    return this.httpPost('cart/create', data);
  }
  creatCart(data) {
    return this.httpPost('cart/create', data);
  }

  getCartProducts() {
    return this.httpPost('cart/products', null, 'GET');
  }

  deteleCart(data) {
    return this.httpPost('cart/delete-product', data);
  }

  allCountry() {
    return this.httpPost('country/all', null, 'GET');
  }

  allCity(id) {
    return this.httpPost(`city/all`, id);
  }

  orderCheckOut(data) {
    return this.httpPost('order/create', data);
  }

  shopId(id) {
    return this.httpPost(`shop/get-shop-by-id/${id}`, null, 'GET');
  }
  getReviews(id) {
    return this.httpPost(`product/product-review/${id}`, null, 'GET');
  }

  checkOrder(id) {
    return this.httpPost(`order/order-by-userId/${id}`, null, 'GET');
  }
  deleteOrder(data) {
    return this.httpPost('order/delete', data);
  }

  billingAddress(data) {
    return this.httpPost('order/create-billing-address', data);
  }

  getorderAdress() {
    return this.httpPost('order/shipping-address', null, 'GET');
  }

  getBillingAdress() {
    return this.httpPost('order/billing-address', null, 'GET');
  }

  productReviews(data) {
    return this.httpPost('product/review', data);
  }
  getAllCategory() {
    return this.httpPost('categories/all', null, 'GET');
  }
  subCategoriesId(id) {
    return this.httpPost('categories/sub-categories/all', id);
  }

  // Shop API End

  // Socail API Start

  userSocailPosts(data) {
    return this.httpPost('post/users', data);
  }

  allPosts(data) {
    return this.httpPost('post/all', data);
  }

  allComments(id) {
    return this.httpPost(`post/comments-by-post/${id}`, null, 'GET');
  }

  writeComment(data) {
    return this.httpPost('post/comment', data);
  }

  creatPost(data) {
    console.log({data});
    return this.httpPost('post/create-post', data);
  }
  likePostOrComment(data) {
    return this.httpPost('post/like', data);
  }

  deletePost(id) {
    return this.httpPost(`post/delete/${id}`, null, 'GET');
  }
  // Socail API end

  // Events API start

  allEvents() {
    return this.httpPost('events/get-all', null, 'GET');
  }

  eventById(id) {
    return this.httpPost(`events/getEventById/${id}`, null, 'GET');
  }

  createEvent(data) {
    return this.httpPost('events/create-event', data);
  }

  userInterest(data) {
    return this.httpPost('events/user-interest', data);
  }

  // Events API end

  // Jobs API start

  allJobs() {
    return this.httpPost('jobs/getAllJob', null, 'GET');
  }

  jobById(id) {
    return this.httpPost(`jobs/getJobById/${id}`, null, 'GET');
  }

  jobCategories() {
    return this.httpPost('jobs/get-job-categories', null, 'GET');
  }

  jobType() {
    return this.httpPost('jobs/get-job-types', null, 'GET');
  }

  applyingForJob(data) {
    return this.httpPost('jobs/apply-job', data);
  }

  // Jobs API end

  forgotPass(data) {
    return this.httpPost('ForgotPassword', data);
  }

  getWalletBalance() {
    return this.httpPost('getWalletBalance', null);
  }

  addMeter({meterNo, type}) {
    return this.httpPost(`addMeter?meter_no=${meterNo}&meter_type=${type}`);
  }

  deleteMeter(no) {
    return this.httpPost(`Deletemeter?meternumber=${no}`);
  }

  getMeters() {
    return this.httpPost(`getmeters`);
  }

  getMeterOrgs(id) {
    return this.httpPost(`GetMeterOrgs?id=${id}`);
  }

  getWalletTransactions() {
    return this.httpPost(`getWalletTransactions`);
  }

  getMeterTransaction(meterId) {
    return this.httpPost(`getMeterTransaction?meterId=${meterId}`);
  }

  getTransactionsApp() {
    return this.httpPost(`GetTransactionsApp`, null, 'POST', 'EasyPay', false);
  }

  easyPayConfirm(accountNumber, accountType) {
    return this.httpPost(
      `EasyPayConfirm?accountNumber=${accountNumber}&accountType=${accountType}`,
      null,
      'POST',
      'EasyPay',
      false,
    );
  }

  payEasyPay({accountNumber, accountType, payMethod, amount, voucherCode}) {
    return this.httpPost(
      `EasyPayBillPaymentApp?payMethod=${payMethod}&accountNumber=${accountNumber}&accountType=${accountType}&amount=${amount}&voucherCode=${voucherCode}`,
      null,
      'POST',
      'EasyPay',
      false,
    );
  }

  ///EasyPay/EasyPayBillPaymentApp?payMethod={payMethod}&accountNumber={accountNumber}&accountType={accountType}&amount={amount}&voucherCode={voucherCode}"

  generatewalletlink(data) {
    return this.httpPost(
      `generatewalletlink`,
      data,
      'POST',
      'MobileService',
      true,
      'multipart/form-data',
    );
  }

  generatewalletPayULink(data) {
    return this.httpPost(
      `generatewalletPayULink`,
      data,
      'POST',
      'MobileService',
      true,
      'multipart/form-data',
    );
  }
  getMeterVoucherCodes(meterId) {
    return this.httpPost(`getMeterVoucherCodes?id=${meterId}`);
  }

  generateFBEToken(meter_no, voucherCodeId) {
    return this.httpPost(
      `GenerateFBEToken?meter_no=${meter_no}&voucherCodeId=${voucherCodeId}`,
      null,
      'POST',
      'payment',
    );
  }

  purchaseTokenFromWallet(data) {
    return this.httpPost(
      `PurchaseTokenFromWallet`,
      data,
      'POST',
      'MobileService',
      true,
      'multipart/form-data',
    );
  }

  GetOTTTransactionsApp() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'oTTVoucher',
      false,
    );
  }

  generateOTTVoucher({payMethod, amount}) {
    return this.httpPost(
      `GenerateOTTVoucherApp?payMethod=${payMethod}&amount=${amount}`,
      null,
      'POST',
      'oTTVoucher',
      false,
    );
  }

  GetSfxTransactionsApp() {
    return this.httpPost(`GetTransactionsApp`, null, 'POST', 'SFX', false);
  }

  SFXLookup(refNo) {
    return this.httpPost(
      `SFXLookup?refNo=${refNo}`,
      null,
      'POST',
      'SFX',
      false,
    );
  }

  SFXPaymentApp({
    payMethod,
    payRef,
    paymentAmount,
    customerName,
    customerSurname,
    voucherCode,
  }) {
    return this.httpPost(
      `SFXPaymentApp?payMethod=${payMethod}&payRef=${payRef}&paymentAmount=${paymentAmount}&customerName=${customerName}&customerSurname=${customerSurname}&voucherCode=${voucherCode}"`,
      null,
      'POST',
      'SFX',
      false,
    );
  }

  GetTalkTransactionsApp() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'Talk360Voucher',
      false,
    );
  }

  generateTalk360Voucher({payMethod, amount}) {
    return this.httpPost(
      `GenerateOTTVoucherApp?payMethod=${payMethod}&amount=${amount}`,
      null,
      'POST',
      'Talk360Voucher',
      false,
    );
  }

  GetSBITransactionsApp() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'SBInstantMoney',
      false,
    );
  }

  generateSBInstantMoney({payMethod, voucherPin, userPin, amount}) {
    return this.httpPost(
      `GenerateOTTVoucherApp?payMethod=${payMethod}&voucherPin=${voucherPin}&userPin=${userPin}&amount=${amount}`,
      null,
      'POST',
      'SBInstantMoney',
      false,
    );
  }

  GetDSTVTransactionsApp() {
    return this.httpPost(`GetTransactionsApp`, null, 'POST', 'DSTV', false);
  }

  verfiyDSTVSubscriberInfoApp({payMethod, customerIdentifier, paymentType}) {
    return this.httpPost(
      `VerfiyDSTVSubscriberInfoApp?payMethod=${payMethod}&customerIdentifier=${customerIdentifier}&paymentType=${paymentType}`,
      null,
      'POST',
      'DSTV',
      false,
    );
  }

  GetMultiVoucher() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'MultiVoucher',
      false,
    ); // multi voucher
  }

  purchaseMultiVoucher({payMethod, list, amount}) {
    return this.httpPost(
      `PurchaseVouchersApp?payMethod=${payMethod}&amount=${amount}&list=${list}`,
      null,
      'POST',
      'MultiVoucher',
      false,
    );
  }

  GetLiveAirTimeApp() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'LiveAirtime',
      false,
    ); // LiveAirTime
  }

  generateLiveAirtime({payMethod, msisdn, network, amount}) {
    return this.httpPost(
      `GenerateOTTVoucherApp?payMethod=${payMethod}&msisdn=${msisdn}&network=${network}&amount=${amount}`,
      null,
      'POST',
      'LiveAirtime',
      false,
    );
  }

  GetAnyValueAirtimeApp() {
    return this.httpPost(
      `GetTransactionsApp`,
      null,
      'POST',
      'AnyValueAirtime',
      false,
    ); // anyLiveAirTime
  }

  generateAnyValueAirtime({payMethod, network, amount}) {
    return this.httpPost(
      `GenerateOTTVoucherApp?payMethod=${payMethod}&network=${network}&amount=${amount}`,
      null,
      'POST',
      'AnyValueAirtime',
      false,
    );
  }

  generateUri(uri, controller) {
    return this.httpPost(
      uri,
      null,
      'GET',
      controller,
      false,
      'Application/json',
      true,
    ); // anyLiveAirTime
  }

  socialLogin(data) {
    return '';
    // this.httpPost('FacebookGoogleLogin', data, 'POST');
  }

  SendOTP(phone) {
    return this.httpPost(`SendOTP?phone=${phone}`);
  }

  resetOTP() {
    return this.httpPost('resetotp');
  }

  VerifyOTP(code) {
    return this.httpPost(`VerifyOTP?code=${code}`);
  }

  loginWith2fa(code) {
    return this.httpPost(`LoginWith2fa?authenticatorCode=${code}`);
  }

  getVerificationData() {
    return this.httpPost(`GetVerificationData`);
  }

  sendEmailVerification() {
    return this.httpPost(`SendEmailVerification`);
  }

  logout() {
    return this.httpPost('Logout', null, 'GET');
  }

  resetPassword(data) {
    return this.httpPost('ResetPassword', data);
  }

  uploadFile(path) {
    var formdata = new FormData();
    let filePath = path.uri;
    console.log('filePath', filePath);
    var filename = filePath.replace(/^.*[\\\/]/, '');
    let obj = {
      uri: filePath,
      name: filename,
      type: 'image/jpg',
    };
    console.log('UPLOAD_FILE', obj);
    // let fullPath = filePath.substring(0, filePath.lastIndexOf("/") + 1);
    formdata.append('file', obj);
    return this.httpPost(
      'UploadFile',
      null,
      formdata,
      'multipart/form-data',
      'common/',
    );
  }

  stringify(data) {
    return JSON.stringify(data);
  }

  httpPost(
    endPoint,
    body,
    method = 'POST',
    controller = '',
    isApiUrl = true,
    contentType = 'application/json',
    isRedirection = false,
  ) {
    return new Promise(async resolve => {
      let token = await getToken();
      console.log('token', token);
      var headers = {};

      headers['Content-Type'] = contentType;
      if (notIsNullOrEmpty(token)) {
        headers['Authorization'] = token;
      }

      // var requestOptions = {
      //   method,
      //   headers,
      //   data:
      //     body && contentType === 'application/json'
      //       ? this.stringify(body)
      //       : body,
      //   redirect: 'follow',
      // };
      var url =
        (isApiUrl ? ServiceApi.BASE_API_URL : ServiceApi.BASE_URL) +
        controller +
        '/' +
        endPoint;
      console.log('URL', url);
      console.log('body', body);

      axios({
        method,
        url,
        headers,
        data:
          body && contentType === 'application/json'
            ? this.stringify(body)
            : body,
      })
        .then(response => {
          let result = response?.data;
          console.log('httpPostResult', response.data);

          resolve(result);
        })
        .catch(error => {
          console.log('Fetch error1', error);
          resolve(error);
        });
    });

    //   fetch(url, requestOptions)
    //     .then(
    //       response => (isRedirection ? response.url : response.json()),
    //       // async response => {
    //       //   try {
    //       //     console.log(await response.text());
    //       //   } catch (ex) {
    //       //     console.log(ex);
    //       //   }
    //       //   return response;
    //       //   // return response.json();
    //       // }
    //     )
    //     .then(result => {
    //       console.log('httpPostResult', result);
    //       resolve(result);
    //     })
    //     .catch(error => {
    //       console.log('Fetch error', error);
    //       resolve(error);
    //     });
    // });
  }
}
