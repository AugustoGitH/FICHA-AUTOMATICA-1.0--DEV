const firebaseConfig = {
    apiKey: "AIzaSyBNlUhD9ESZbLMw11yxoL5U5Oils4Um1-U",
    authDomain: "fichabancodados.firebaseapp.com",
    projectId: "fichabancodados",
    storageBucket: "fichabancodados.appspot.com",
    messagingSenderId: "665713085",
    appId: "1:665713085:web:46f9aec8f21790f652fad4",
    measurementId: "G-KQGSEF9CJ2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = firebase.auth()
