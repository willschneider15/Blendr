import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";

interface HomeScreenProps {
  navigation;
}
const LOGO =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";

export default class PostMatchScreen extends Component<HomeScreenProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Blendr</Text>
        <Image style={{ width: 70, height: 70 }} source={{ uri: LOGO }}></Image>
        <Button
          title="Start Match"
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        />
      </View>
    );
  }
}
