import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import ViewButton from "./ViewButton";

interface HomeScreenProps {
  navigation;
}
const DUCK =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";

export default class HomeScreen extends Component<HomeScreenProps> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
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
        <Image style={{ width: 70, height: 70 }} source={{ uri: DUCK }}></Image>
        <Text>BLENDR</Text>
        <Button
          title="Sign in"
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
        />
        <ViewButton />
      </View>
    );
  }
}
