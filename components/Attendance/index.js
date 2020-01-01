import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import * as firebase from 'firebase';




export default class Attendance extends Component {
  constructor(props) {
    super(props);
      this.state = {
          presentStudents: [],
          presentStudentsDatabase: [],
          students: [],
          changed: false,
    }
  }
  
  componentDidMount() {
    var date = new Date();
    var day = date.toString().substring(4,16);

    // Get roster from DB and update UI elements
    var students = [];
    const rosterRef = firebase.database().ref('Attendance/Dhruva/Roster');
    rosterRef.once('value').then(function(snapshot) {
      console.log(snapshot)
      snapshot.forEach(function(childSnapshot){
        students.push(childSnapshot.key)
      })
    }).then(() => this.setState({
      students: students
    }))


    
    var presentStudents = [];
    var presentStudentsDatabase = [];
    const presentRef = firebase.database().ref('Attendance/Dhruva/' + day +'/Attendance');
    presentRef.once('value').then(function(snapshot) {
      presentStudentsDatabase = snapshot.val()
      for (var i = 0; i < snapshot.val().length; i++) {
        presentStudents.push(snapshot.val()[i])
      }
    }).then(() => this.setState({
      presentStudents: presentStudents,
      presentStudentsDatabase: presentStudentsDatabase,
    })).then(() => console.log(presentStudents))
  }

 
  onSelectionsChange = (presentStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({presentStudents:presentStudents, changed: true })
  }

  submitAttendance = () => { 
    var presentStudents = [];
    if (this.state.changed) {
        presentStudents = this.state.presentStudents.map(student => student.label);
    } else {
      presentStudents = this.state.presentStudentsDatabase
    }
    
     
    var date = new Date();
    var day = date.toString().substring(4,16);
    console.log(presentStudents)
    const ref = firebase.database().ref('Attendance/Dhruva/' + day);
    ref.set({Attendance: presentStudents})



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