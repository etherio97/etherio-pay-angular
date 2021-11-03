import { FirebaseOptions } from "@firebase/app";

// const BASE_API_URL = "https://etherio-pay.herokuapp.com";
const BASE_API_URL = "http://localhost:3000";

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBLnixFP-rLWHOOEvxC2pjF1ocCrH2qt1A",
  authDomain: "etherio-pay.firebaseapp.com",
  projectId: "etherio-pay",
  messagingSenderId: "927983401567",
  appId: "1:927983401567:web:3323be6b7ee9a37a5fb9ea",
  measurementId: "G-SQ08BEE4GJ",
};

export const SERVICE_URL = {
  GET_ACCOUNT: BASE_API_URL + "/account",
  TRAN_TRANSFERED: BASE_API_URL + "/transaction/transfered",
  TRAN_RECIEVED: BASE_API_URL + "/transaction/recieved",
  GET_PACKAGE: BASE_API_URL + "/gift-cards",
  GET_ALL_PACKAGES: BASE_API_URL + "/gift-cards/all",
};
