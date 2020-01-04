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
