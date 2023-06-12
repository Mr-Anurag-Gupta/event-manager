// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeBz6b7d-yzA6pl0XEtGgSuqc40RJJaIs",
  authDomain: "phonebook-f2dfe.firebaseapp.com",
  databaseURL: "https://phonebook-f2dfe-default-rtdb.firebaseio.com",
  projectId: "phonebook-f2dfe",
  storageBucket: "phonebook-f2dfe.appspot.com",
  messagingSenderId: "854502367173",
  appId: "1:854502367173:web:3eaee3a9a385162c47f5ac",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
