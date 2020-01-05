import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity onPress={this.submit} style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor:"#7FA2B6",
    borderRadius:25,
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
  loginBtn:{
    width:"30%",
    backgroundColor:"#F08B1C",
    borderRadius:25,
    height:50,
    alignItems:"center",                         
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontFamily: "Avenir",
  }
});