<<<<<<< HEAD
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert } from 'react-native';
import User from "./User";

interface LoginScreenProps {
  navigation;
=======
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import User from './User';
import { NavigationStackProp } from 'react-navigation-stack';


interface LoginScreenProps {
  navigation: NavigationStackProp;
>>>>>>> origin/LoginButton
}

interface LoginScreenState {
  email: string;
  password: string;
<<<<<<< HEAD
  loginError: string;
}

export default class LoginScreen extends Component<
  LoginScreenProps,
  LoginScreenState
> {
  constructor(props: LoginScreenProps) {
    super(props);
    this.state = {
      loginError: '',
      email: '',
      password: '',
    };
  }
  submit = () => {
    const { email, password } = this.state;
    console.log('email', email);
    console.log('password', password);
    User.authenticate(email, password).then(result => {
      if (result.success) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('auth', password);
        this.props.navigation.navigate("MatchScreen");
      } else {
        //this.setState({ loginError: result.error });
        Alert.alert(
          'Sorry!',
          'Login failed',
        );
      }
    });
=======
}

export default class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
>>>>>>> origin/LoginButton
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Blendr</Text>
        <View style={styles.inputView} >
       
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
            
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
<<<<<<< HEAD
        <Button title="Submit" onPress={this.submit} />
=======
        <KeyboardAvoidingView style={styles.loginButtonContainer}>
          <Button title="Login" onPress={this.login} />
        </KeyboardAvoidingView>
>>>>>>> origin/LoginButton
      </View>
    );
  }

  async login() {
    const isAuthenticated = await User.authenticate(this.state.email, this.state.password);
    if (isAuthenticated) {
      this.props.navigation.navigate("");
    } else {
      alert("Invalid login credentials.");
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginButtonContainer: {
    width: "80%",
    borderRadius: 1
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40,
    fontFamily: "Avenir",
  },
  inputView:{
    width:"80%",
    backgroundColor:"#F08B1C",
    borderRadius: 1,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white",
    fontFamily: "Avenir",
  },
});
// import React, { Component } from "react";
// import { StyleSheet, View, AsyncStorage, TextInput, Button, Text, Alert } from "react-native";
// import User from "./User";

// interface LoginScreenProps {
//   navigation;
// }

// interface LoginScreenState {
//   email: string;
//   password: string;
//   loginError: string;
// }

// export default class LoginScreen extends Component<
//   LoginScreenProps,
//   LoginScreenState
// > {
//   constructor(props: LoginScreenProps) {
//     super(props);
//     this.state = {
//       loginError: '',
//       email: '',
//       password: '',
//     };
//   }

//   submit = () => {
//     const { email, password } = this.state;
//     User.authenticate(email, password).then(result => {
//       if (result.success) {
//         AsyncStorage.setItem('email', email);
//         AsyncStorage.setItem('auth', password);
//         this.props.navigation.navigate("MatchScreen");
//       } else {
//         //this.setState({ loginError: result.error });
//         Alert.alert(
//           'Sorry!',
//           'Login failed',
//         );
//       }
//     });
//   }

//   styles = StyleSheet.create({
//     username: {
//       color: 'blue',
//       fontWeight: 'bold'
//     }
    
//   }) 

//   render() {
//     return (
//       <View>
//         <Text>{this.state.loginError}</Text>
//         <Text> UserName</Text>
//         <TextInput 
//         style = {styles.textInputStyle}
//         onChangeText={email => this.setState({ email: email })}
//         ></TextInput>
//         <Text>Password</Text>
//         <TextInput
//           style = {styles.textInputStyle}
//           onChangeText={password => this.setState({ password: password })}
//         ></TextInput>
//         <Button title="Submit" onPress={this.log} />
//       </View>
//     );
//   }

//   log(){
//     this.submit;
//     this.props.navigation.navigate("MatchScreen");
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   logo: {
//     width: 100,
//     height: 140
//   },

//   logoContainer: {
//     alignItems: "center",
//     flexGrow: 1,
//     justifyContent: "center"
//   },

//   formContainer: {
//     padding: 20
//   },

//   input: {
//     height: 40,
//     backgroundColor: "green",
//     marginBottom: 20,
//     color: "black"
//   },

//   title: {
//     color: "white",
//     marginTop: 25,
//     textAlign: "center"
//   },

//   buttonSigin: {
//     backgroundColor: "green",
//     paddingVertical: 37
//   },

//   buttonText: {
//     textAlign: "center",
//     color: "white",
//     fontWeight: "700"
//   },

//   textInputStyle: {  
//     borderColor: '#9a73ef',  
//     borderWidth: 1,  
//     height: 40,  
//     margin: 20,  
//     padding: 10,  
//   },

//   textOutputStyle: {  
//     fontSize: 20  
//   } 
// });
