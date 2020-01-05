import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface HomeScreenProps {
  navigation;
}
const LOGO =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";

export default class HomeScreen extends Component<HomeScreenProps> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: LOGO }} />
          <Text style={styles.title}>BLENDR</Text>
        </View>

      {/*
        <View style={styles.formContainer}>
          <TextInput style={styles.input} />

          <TextInput
            placeholder="Usename"
            placeholderTextColor="Dark Grey"
            style={styles.input}
          />

          <TextInput placeholder="Password" style={styles.input} />
      */}
          <View style={styles.buttonSigin}>
            <Button title="Login" onPress = {() => this.props.navigation.navigate("LoginScreen")}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
            <Button title="Register" onPress = {() => this.props.navigation.navigate("RegisterScreen")}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
          </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  logo: {
    width: 150,
    height: 150
  },

  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  /*
  formContainer: {
    padding: 20
  }, 

  input: {
    height: 40,
    backgroundColor: "green",
    marginBottom: 20,
    color: "black"
  }, */

  title: {
    color: 'black',
    fontSize: 20,
    opacity: 0.5,
    marginTop: 25,
    textAlign: "center",
    fontWeight: '500',
  },

  buttonSigin: {
    width: 100,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#F08B1C',
    justifyContent: 'center',
    margin: 20,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
	  fontSize: 16,
    fontWeight: "500"
  }
});
