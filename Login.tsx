// import React, { Component } from 'react';
// import {View, Text, StyleSheet, Image},  from 'react-native';
// import { getActiveChildNavigationOptions } from 'react-navigation';

// const LOGO = "https://cdn.discordapp.com/attachments/654373638065225731/663179114299260929/blendrIcon.jpg"
// //create a component
// class Login extends Component {
//   render() {
//     return (
//         <View style={styles.container}>
//             <Image resizeMode="contain" style={styles.logo} source={{uri:LOGO}}></Image>
//         </View>
//     );
//   }
// }

// //define your styles
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#2c3e58',
//     },
//     loginContainer:{
//       alignItems: 'center',
//       flexGrow: 1,
//       justifyContent: 'center'
//     },

//     logo: {
//       position: 'absolute',
//       width: 300,
//       height: 100
//   }
// })

import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, TextInput, Button, Text, Alert } from "react-native";
import User from "./User";

interface LoginScreenProps {
  navigation;
}

interface LoginScreenState {
  email: string;
  password: string;
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
  }

  styles = StyleSheet.create({
    username: {
      color: 'blue',
      fontWeight: 'bold'
    }
    
  }) 

  render() {
    return (
      <View>
        <Text>{this.state.loginError}</Text>
        <Text> UserName</Text>
        <TextInput 
        style = {styles.textInputStyle}
        onChangeText={email => this.setState({ email: email })}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style = {styles.textInputStyle}
          onChangeText={password => this.setState({ password: password })}
        ></TextInput>
        <Button title="Submit" onPress={this.log} />
      </View>
    );
  }

  log(){
    this.submit;
    this.props.navigation.navigate("MatchScreen");
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    width: 100,
    height: 140
  },

  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  formContainer: {
    padding: 20
  },

  input: {
    height: 40,
    backgroundColor: "green",
    marginBottom: 20,
    color: "black"
  },

  title: {
    color: "white",
    marginTop: 25,
    textAlign: "center"
  },

  buttonSigin: {
    backgroundColor: "green",
    paddingVertical: 37
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  },

  textInputStyle: {  
    borderColor: '#9a73ef',  
    borderWidth: 1,  
    height: 40,  
    margin: 20,  
    padding: 10,  
  },

  textOutputStyle: {  
    fontSize: 20  
  } 
});
