import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Registration extends Component {
    render(){
        return (
      
            <View style={styles.container}>
            <TouchableOpacity>
              <Text style={styles.text}>Registration</Text>
              </TouchableOpacity>
            </View>
          
          
        );
    }  
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