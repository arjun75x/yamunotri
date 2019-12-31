import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import * as firebase from 'firebase';




export default class Attendance extends Component {
  constructor(props) {
    super(props);
      this.state = {
          presentStudents: [],
          students: []
    }
  }
  
  componentDidMount() {
    var students = [];
    const ref = firebase.database().ref('Attendance/Dhruva/Roster');
    ref.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        students.push(childSnapshot.key)
      })
    }).then(() => this.setState({
      students: students
    }))
  }

 
  onSelectionsChange = (presentStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({ presentStudents })
  }

  submitAttendance = () => { 
    var presentStudents = this.state.presentStudents.map(student => student.label);
    var date = new Date();
    var day = date.toString().substring(4,16);

    // const ref = firebase.database().ref('Attendance/Dhruva/' + day);
    // ref.set({Abhay: 'Present'})



  }

  formatTime = (time) => {
    var timeSt = new Date(time);
      var date = timeSt.toString();
      var dateShort= date.substring(0,15);
      var hours = timeSt.getHours();
      var minutes = timeSt.getMinutes();
      var sal = (hours >= 12) ? " PM" : " AM";
      if(hours == 0)hours = 12;
      var timeValue = dateShort + " " + ((hours >12) ? hours -12 :hours);
      timeValue += (((minutes < 10) ? ":0" : ":")  + minutes);
      timeValue += sal;
      return timeValue;
  }

  render(){
      return (
    
          <View style={styles.container}>
          <View style={styles.center}>
          <Text style={styles.text}>Attendance</Text>
          </View>
            
            <View style={{height: 400}}>
        <SelectMultiple
          items={this.state.students}
          selectedItems={this.state.presentStudents}
          onSelectionsChange={this.onSelectionsChange} />
          </View>
          <View>
          <TouchableOpacity onPress={this.submitAttendance}>
          <View style={styles.center}>
          <View style={styles.button}>
          <Text>Hello</Text>
          </View>
          </View>
          
          </TouchableOpacity>
          </View>
          
      
          </View>
        
        
      );
  }  
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124,10,10,1)',
    paddingTop: 60,
    padding: 20,
    
  },
  text: {
    color: 'white',
    fontSize: 35,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});