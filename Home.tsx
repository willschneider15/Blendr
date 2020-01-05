import React, { Component } from "react";
<<<<<<< HEAD
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
=======
import { View, Text, Image, Button } from "react-native";
import ViewButton from "./ViewButton";
>>>>>>> 2d76fa7440a90b39ab4c58c1865655e898cb9873

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
<<<<<<< HEAD
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: LOGO }} />
          <Text style={styles.title} />
        </View>

        <View style={styles.formContainer}>
          <TextInput style={styles.input} />

          <TextInput
            placeholder="Usename"
            placeholderTextColor="Dark Grey"
            style={styles.input}
          />

          <TextInput placeholder="Password" style={styles.input} />
          <View style={styles.buttonSigin}>
            <Button title="the button">
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
          </View>
        </View>
=======
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "space-around",
          paddingTop: 50,
          paddingLeft: 50
        }}
      >
        <Image style={{ width: 70, height: 70 }} source={{ uri: LOGO }}></Image>
        <Text>BLENDR</Text>
        <Button
          title="Sign in"
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
        />

>>>>>>> 2d76fa7440a90b39ab4c58c1865655e898cb9873
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
    width: 100,
    heigth: 140
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
    color: "dark grey",
    marginTop: 25,
    textAlign: "center"
  },

  buttonSigin: {
    backgroundColor: "green",
    paddingVertical: 37
  },

  buttonText: {
    textAlign: "center",
    color: "dark grey",
    fontWeight: "700"
  }
});
