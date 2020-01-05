import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  state={
    email:"",
    password:""
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
    marginBottom:40
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
    color:"white"
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
