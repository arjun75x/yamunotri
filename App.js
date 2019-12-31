import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Attendance from './components/Attendance/index';
import Registration from './components/Registration/index';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe4ys-PzQhimCv9W7vGcsB9_2GxHEK44k",
  authDomain: "yamunotri-30107.firebaseapp.com",
  databaseURL: "https://yamunotri-30107.firebaseio.com",
  projectId: "yamunotri-30107",
  storageBucket: "yamunotri-30107.appspot.com",
  messagingSenderId: "996019236567",
  appId: "1:996019236567:web:b8eb2c52cf879af7464a92",
  measurementId: "G-2WSGFML3DB"
};

firebase.initializeApp(firebaseConfig);




  

const appNavigator = createDrawerNavigator (
  {
    Attendance: {
      screen: Attendance
    },
    Registration: {
      screen: Registration,
    },
  }
)

const AppContainer = createAppContainer(appNavigator);

export default function App() {
  return (
    
      <AppContainer/>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124,10,10,1)',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: 'white',
  }
});
