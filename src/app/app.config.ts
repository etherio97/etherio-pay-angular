import { FirebaseOptions } from '@firebase/app';

let HOSTNAME = window.location.hostname;
let BASE_URL = '/api';

if (!HOSTNAME.includes('etherio.fun')) {
  BASE_URL = 'https://etherio-pay.herokuapp.com';

  if (!HOSTNAME.match(/^(localhost|\d)/)) {
    window.location.href = 'https://pay.etherio.fun';
  }
}

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBLnixFP-rLWHOOEvxC2pjF1ocCrH2qt1A',
  authDomain: 'etherio-pay.firebaseapp.com',
  projectId: 'etherio-pay',
  messagingSenderId: '927983401567',
  appId: '1:927983401567:web:3323be6b7ee9a37a5fb9ea',
  measurementId: 'G-SQ08BEE4GJ',
};

export const SERVICE_URL = {
  GET_ACCOUNT: `${BASE_URL}/account`,
  TRAN_TRANSFERED: `${BASE_URL}/transaction/transfered`,
  TRAN_RECIEVED: `${BASE_URL}/transaction/recieved`,
  SEND_TRANSFER: `${BASE_URL}/transfer`,
  FIND_ACCOUNTS: `${BASE_URL}/account/identify`,
  GET_PACKAGE: `${BASE_URL}/gift-cards`,
  GET_ALL_PACKAGES: `${BASE_URL}/gift-cards/all`,
};

export const VALIDATOR_PATTERNS = {
  PHONE_NUMBER: /^\+?[0-9]{9,12}$/,
  OTP_CODE: /^[0-9]{6}$/,
};
