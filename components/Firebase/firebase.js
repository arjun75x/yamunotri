import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


var firebaseConfig = {
  apiKey: "AIzaSyAe4ys-PzQhimCv9W7vGcsB9_2GxHEK44k",
  authDomain: "yamunotri-30107.firebaseapp.com",
  databaseURL: "https://yamunotri-30107.firebaseio.com",
  projectId: "yamunotri-30107",
  storageBucket: "yamunotri-30107.appspot.com",
  messagingSenderId: "996019236567",
  appId: "1:996019236567:web:b8eb2c52cf879af7464a92",
  measurementId: "G-2WSGFML3DB"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
// *** Auth API ***
doCreateUserWithEmailAndPassword = (email, password) =>
this.auth.createUserWithEmailAndPassword(email, password);
doSignInWithEmailAndPassword = (email, password) =>
this.auth.signInWithEmailAndPassword(email, password);
doSignOut = () => this.auth.signOut();
doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
doPasswordUpdate = password =>
this.auth.currentUser.updatePassword(password);
// *** User API ***
user = uid => this.db.ref(`users/${uid}`);
users = () => this.db.ref('users');
events = () => this.db.ref('events');
}
export default Firebase;