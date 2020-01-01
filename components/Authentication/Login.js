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





export default class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  }




  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoading:false
      }, () => {
          this.props.navigation.navigate('App');
      });
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
      email: "",
      password: "",
      isLoading: true,
    };
  }


  handleLogin = () => {
    const { email,password} = this.state

    this.setState({
      isLoading:true
  }, () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
         
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({isLoading: false})
      if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
      } else {
          alert(errorMessage);         
      }
      console.log(error);
  })
  .then(() => this.setState({email:''})) 
    .then(() => this.setState({password:''})) 
  });
    
  };


  

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
submit2: {
  fontSize: 30,
    
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
    flex: 1,
    width: 384,
    height: 400,
    top: 30, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'flex-start', 
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
    flex: 1,
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
    backgroundColor: 'rgba(255,255,255,1)',
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
  logo: {
    width: 100,
    height: 100,
  },
  
  
  
    });

    return (

      <View style={styles.container}>
      
      <View>

      <View style={styles.center}>
        <View style={styles.titlePosition}>
        <Text style = {styles.title}>Login</Text>
        {this.state.isLoading ?
            <View><Text>Loading</Text></View>
          :
          <View style={styles.emailForm}>
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
                  <View>
                      
                  </View>


          <TouchableOpacity onPress={() => this.handleLogin()}>
            <View style={styles.submitButton}>
                    <Text style={styles.submit}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <View style={styles.submitButton}>
                    <Text style={styles.submit}>Sign Up</Text>
            </View>
          </TouchableOpacity>


          </View>
        }
        </View>
        
    </View>
        
    </View>  
      
  
    </View>  

    );

  }
}

