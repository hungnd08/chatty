import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAn2BPjh3Nv7lOpCNWBv20h7xBmKYS2Fmg",
    authDomain: "chatty-2e8d3.firebaseapp.com",
    databaseURL: "https://chatty-2e8d3-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();