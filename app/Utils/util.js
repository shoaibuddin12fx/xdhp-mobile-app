const isNullOrEmpty = val => {
  return val === null || val === undefined || val === '';
};

const notIsNullOrEmpty = val => {
  return !isNullOrEmpty(val);
};

const isValdEmail = email => {
  console.log(email);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};

// export const getImage = (img) => {
//   return { uri: ServiceApi.BASE_URL + "img/upload/" + img };
// };

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isNullOrEmptyArray = arr => {
  return (arr === null) | (arr === undefined) || arr.length === 0;
};

export {notIsNullOrEmpty, isNullOrEmpty, isValdEmail};
