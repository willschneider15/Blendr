import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
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

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LoginScreen")}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
          style={styles.registerBtn}
        >
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
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
    color: "black",
    fontSize: 20,
    opacity: 0.5,
    marginTop: 25,
    textAlign: "center",
    fontWeight: "bold"
  },

  buttonSigin: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7FA2B6",
    justifyContent: "center",
    marginTop: 20,
    padding: 20
  },

  buttonText: {
    textAlign: "center",
    color: "#7FA2B6",
    height: 40,
    fontSize: 20,
    fontWeight: "bold"
  },

  loginBtn: {
    width: "75%",
    backgroundColor: "#F08B1C",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },

  registerBtn: {
    width: "75%",
    backgroundColor: "#F08B1C",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 150
  },

  loginText: {
    color: "white"
  }
});
