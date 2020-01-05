import React, { Component } from "react";
import { View, Text, Image, Button, AsyncStorage } from "react-native";
import { MatchObject } from "./Match";
import { NavigationStackProp } from 'react-navigation-stack';
import {Linking} from "expo";


interface PostMatchScreenProps {
  navigation: NavigationStackProp<{matchObj: MatchObject}>;
}

function MatchInfo(props: {match: MatchObject, currentUserEmail: string}) {
  const match = props.match;
  console.log('match to render', match);
  const otherUser = match.user1.email === props.currentUserEmail ? match.user2 : match.user1; 
  const mapsURI = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location)}`;
  console.log('other user', otherUser);
  return (
    <View>
      <Text>Email: {otherUser.email}</Text>
      <Text>Name: {otherUser.name}</Text>
      <Text>Experience: {otherUser.experience}</Text>
      <Text>Hometown: {otherUser.hometown}</Text>
      <Text>Where you're meeting: {match.location}</Text>
      <Button title="Open in Google Maps!" onPress={()=>Linking.openURL(mapsURI)}></Button>
    </View>
  )
}


export default class PostMatchScreen extends Component<PostMatchScreenProps> {
  matchObj;
  email: string;

  constructor(props: Readonly<PostMatchScreenProps>) {
    super(props);
    this.matchObj = props.navigation.getParam("matchObj");
    console.log('matchObj', this.matchObj);
  }

  async componentDidMount() {
    this.email = await AsyncStorage.getItem('email');
  }

  render() {
    const match = this.matchObj;
    console.log('match', match);
    const otherUser = match.user1.email === this.email ? match.user2 : match.user1; 
    console.log("REACHED IT");
    return (
      <View>
        <Text>You've found a match!</Text>
        <MatchInfo match={this.matchObj} currentUserEmail={otherUser.email} />
      </View>
    );
  }
}
