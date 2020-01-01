import React, {Component,} from 'react';
import * as firebase from "firebase";
import { 
  StyleSheet, 
  View,
  TouchableOpacity, 
  Image,
  ImageBackground,
  Dimensions,
  Alert,
  Button,
  TextInput,
  Linking,
  ImageBackgroundComponent,
  Text
} from 'react-native';

var firebaseConfig = {
  apiKey: "AIzaSyBubTrMCDqz1efPzz_y89m4RPD-7wNHMUc",
  authDomain: "hsapp-e67f3.firebaseapp.com",
  databaseURL: "https://hsapp-e67f3.firebaseio.com",
  projectId: "hsapp-e67f3",
  storageBucket: "",
  messagingSenderId: "193496808617",
  appId: "1:193496808617:web:7a8733a8694158de"
};




export default class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  }




  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.dataBase()
      } else {
        this.setState({
          isLoading:false
      });
      }
    })
  }
  
  componentWillUnMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }


  signUp = () => {
    const {email, password,} = this.state
    this.setState({
      isLoading:true
  }, () => {
    
    if (this.state.firstname != "" && this.state.lastname != "" && this.state.email != "" && this.state.password != "") {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)  
      .catch((error) => {
        
        var errorCode = error.code;
        var errorMessage = error.message;
    
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);         
        }
        this.setState({isLoading: false})
        console.log(error);
    })
    } else {
      Alert.alert("Please fill in all fields.")
      this.setState({isLoading: false})
    }
    
       
  })
}

  dataBase = () => {
    const {firstname, lastname} = this.state
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var email = user.email;
    firebase.database().ref('users/' + uid).set({
      firstname: firstname,
      lastname: lastname,
      email: email,
    }).then(() => this.setState({firstname:''})) 
    .then(() => this.setState({lastname:''}))
    .then(() => this.setState({email:''})) 
    .then(() => this.setState({password:''}))
    .then(() => this.props.navigation.navigate('App')) 
    
 
  }

  
  onChooseImagePress = async () => {
    const checkPermissions = await this.checkCameraRollPermission()
    console.log(checkPermissions, '--what is returned here determines the permissions');
     if (!checkPermissions) return
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
    }  
    );

    console.log(result);

    if(!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ imageButton: "Image Chosen"});
    }
  }


  clickHandler = () => {
    //function to handle click on floating Action Button
    this.props.navigation.push('Login');
  };

  
  
  render() {
    const { height, width } = Dimensions.get("screen");
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      line: {
        borderBottomColor: 'rgba(161,29,21,.3)',
        borderBottomWidth: 2,
      },
      left: {
        width: width/2, 
        height: height, 
        backgroundColor: 'rgba(255,255,255,0.3)', 
        /* shadowColor: 'black', 
        shadowOffset: {width: -5,height: -5},
        shadowRadius: 5, */
      },
      center: {
        width: width, 
        height: height, 
        backgroundColor: 'rgba(161,29,21,.7)', 
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: -5,}, 
      },
      formMargin: {
  
      },
      image: {
        width: 1024,
        height: 256,
      },
      image3: {
        width: width/4,
        height: height/8,
      },
      submitButton: {
        width: 180,
        height: 64,
        backgroundColor: 'rgba(255,255,255,1)', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        marginTop: 10,
        marginBottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius:20,
        borderColor: 'rgba(255,255,255,1)', 
        
      },
      logo: {
        width: width/4,
        height: width/4,
      },
      logoPosition: {
        position: 'absolute', 
        top: width/8, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center',
        //justifyContent: 'center',
      },
      titlePosition: {
        position: 'absolute',
        marginLeft: width/48, 
        marginRight: width/48, 
        top: width/8, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        //justifyContent: 'center', 
        alignItems: 'center',
        opacity: 1
    },
    titlePosition2: {
      position: 'absolute', 
      top: width/8, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
      opacity: 1
  },
  titlePosition3: {
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    opacity: 1
  },
    title: {
        fontSize: 40,
        color: 'white',
        /* textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1} ,
        textShadowRadius: 1,    */
    },
    textform: {
      marginLeft: 20,
      fontSize: 20,
      color: 'rgba(161,29,21,0.9)', 
  },
  textformresponse: {
    fontSize: 30,
     
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1} ,
    textShadowRadius: 1,   
  },
    title3: {
      fontSize: 35,
       
      color: 'rgba(161,29,21,0.9)',
      textShadowColor: 'black',
      textShadowOffset: {width: 1, height: 1} ,
      textShadowRadius: 1,   
  },
  submit: {
    fontSize: 35,
     
    color: 'rgba(161,29,21,1)',  
},
    button: {
      width: 100,
      height: 100,
  
    },
    form: {
      top: width/8,
    },
    RectangleShapeView: {
      //To make Rectangle Shape
      width: width/3,
      height: height/6,
      backgroundColor: 'rgba(161,29,21,0.9)',
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
      borderColor: 'white',
      borderRadius:20,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 }, 
      //borderWidth: 3
   },
   emailForm: {
    //To make Rectangle Shape
    //backgroundColor: 'rgba(255,255,255,1)', 
    width: 420,
    height: 400,
    top: 30, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,1)',
    borderRadius:20,
    /* shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },  */
    borderWidth: 0
  },
  positionButton: {
    //To make Rectangle Shape
    width: width*3/8,
    height: height/2,
    backgroundColor: 'rgba(161,29,21,0)',
    position: 'absolute', 
    top: height/2, 
    left: ((width/2)-(width*3/8))/2, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
  
  },
  formTextBox: {
    width: 378,
    height: 400,
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
/*     borderColor: 'white',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black', */
    shadowOffset: { height: 0, width: 0 }, 
  },
   WhiteButton: {
    width: width/3,
    height: height/6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'white',
    borderRadius:20,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }, 
    //borderWidth: 3
  },
   formtext: {
    width: 380,
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 30,
    paddingTop:10,
    paddingBottom: 10,
    marginTop:5,
    marginBottom: 5,

   },
   buttonPage: {
  top: height*5/8,
  left: width/12,
   },
   buttonPage2: {
     top: height/6,
    left: width/12,
     },
   buttonText: {
    top: 576,
    alignItems: 'center',
    left: width/24,
    right: width/24,
    zIndex: 1,
     },
     buttonText2: {
      top: width/9,
      alignItems: 'center',
      zIndex: 5,
       },
   title2: {
    fontSize: 50,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1} ,
    textShadowRadius: 1,
    
    
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius:20,
    //backgroundColor:'black'
  },
  
  
  
    });

    return (
      
      <View style={styles.container}>
        
        <View>

        <View style={styles.center}>
        <View style={styles.titlePosition}>
        <Text style = {styles.title}>Sign Up</Text>
        <View style={styles.emailForm}>

                <View>
                <View style={styles.formMargin}>
                    <View style= {styles.formtext}>
                        <TextInput style={styles.textform} placeholder='First Name' onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname} />
                    </View>
                </View>
                    <View style= {styles.formtext}>
                        <TextInput style={styles.textform} placeholder='Last Name' onChangeText={lastname=> this.setState({ lastname })} value={this.state.lastname} />
                    </View>
                </View>
                <View style={styles.formMargin}>
                    <View style= {styles.formtext}>
                        <TextInput style={styles.textform} placeholder='Email' onChangeText={email => this.setState({ email })} value={this.state.email} keyboardType = {'email-address'}/>
                    </View>
                </View>
                <View>
                    <View style= {styles.formtext}>
                        <TextInput style={styles.textform} placeholder='Password' secureTextEntry={true} onChangeText={password => this.setState({ password })} value={this.state.password} />
                    </View>
                </View>
                {this.state.isLoading ? 
          <View><Text>Loading</Text></View>
          :
                <TouchableOpacity onPress={() => this.signUp()}>
                  <View style={styles.submitButton}>
                          <Text style={styles.submit}>Signup</Text>
                  </View>
                </TouchableOpacity>
                }
        </View>
        </View>
      </View>
      </View>  
        
    
      </View>
    );
  }
}

