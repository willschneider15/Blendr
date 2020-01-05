import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Button,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { MatchObject } from "./Match";
import { NavigationStackProp } from "react-navigation-stack";
import { Linking } from "expo";
import { Card } from "react-native-shadow-cards";
import User from "./User";

interface PostMatchScreenProps {
  navigation: NavigationStackProp<{ matchObj: MatchObject }>;
}

function MatchInfo(props: { match: MatchObject; currentUserEmail: string }) {
  const match = props.match;
  console.log("match to render", match);
  const otherUser =
    match.user1.email === props.currentUserEmail ? match.user2 : match.user1;
  const mapsURI = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    match.location
  )}`;
  console.log("other user", otherUser);
  return (
    <View>
      <Text>Email: {otherUser.email}</Text>
      <Text>Name: {otherUser.name}</Text>
      <Text>Experience: {otherUser.experience}</Text>
      <Text>Hometown: {otherUser.hometown}</Text>
      <Text>Where you're meeting: {match.location}</Text>
      <Button
        title="Open in Google Maps!"
        onPress={() => Linking.openURL(mapsURI)}
      ></Button>
    </View>
  );
}

export default class PostMatchScreen extends Component<PostMatchScreenProps> {
  matchObj;
  email: string;

  constructor(props: Readonly<PostMatchScreenProps>) {
    super(props);
    this.matchObj = props.navigation.getParam("matchObj");
    console.log("matchObj", this.matchObj);
  }

  async componentDidMount() {
    this.email = await AsyncStorage.getItem("email");
  }

  render() {
    const match: MatchObject = this.matchObj;
    console.log("match to render", match);
    const otherUser: User =
      match.user1.email === this.email ? match.user2 : match.user1;
    const mapsURI = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location)}`
    console.log("other user", otherUser);
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, paddingBottom: 25, color: "#B2BB1D" }}>
          It's a Match!
        </Text>
        <Card style={{ padding: 10, margin: 10, height: 50 }}>
          <Text>{'Name: ' + otherUser.name}</Text>
        </Card>
        <Card style={{ padding: 10, margin: 10, height: 50 }}>
          <Text>{'Experience: ' + otherUser.experience}</Text>
        </Card>
        <Card style={{ padding: 10, margin: 10, height: 50 }}>
          <Text>Time: {'Time: ' + match.time}</Text>
        </Card>
        <Card style={{ padding: 10, margin: 10, height: 50 }}>
          <Text>{'Location: ' + match.location}</Text>
        </Card>
        <Card style={{ padding: 10, margin: 10 }}>
          <Button
            onPress={() => {Linking.openURL(mapsURI)}}
            title="Open in Google Maps"
            color="#B2BB1D"
            accessibilityLabel="Learn more about this purple button"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
