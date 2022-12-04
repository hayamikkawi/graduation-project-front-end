// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/compat'
// import 'firebase/auth'
// import 'firebase/firestore'
// // v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxaPVJiyygKadl_J8mmcMNbT4gCAlkHKA",
  authDomain: "test-186cf.firebaseapp.com",
  projectId: "test-186cf",
  storageBucket: "test-186cf.appspot.com",
  messagingSenderId: "636600780569",
  appId: "1:636600780569:web:9de222fb3c3b7a1c106788"
};

// Initialize Firebase
let app; 
if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
} 
else {
  app = firebase.app()
}
// const db = app.firestore()
// const auth = firebase.auth()
export default firebase
//const app = initializeApp(firebaseConfig);