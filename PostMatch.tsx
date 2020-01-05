import React, { Component } from "react";
import { View, Text, Image, Button, AsyncStorage } from "react-native";
import { MatchObject } from "./Match";

interface PostMatchScreenProps {
  navigation;
  matchObj: MatchObject;
}

function MatchInfo(props: {match: MatchObject, currentUserEmail: string}) {
  const match = props.match;
  console.log('match to render', match);
  const otherUser = match.user1.email === props.currentUserEmail ? match.user2 : match.user1; 
  return otherUser.getComponent(match.location);
}


export default class PostMatchScreen extends Component<PostMatchScreenProps> {
  matchObj;

  constructor(props: Readonly<PostMatchScreenProps>) {
    super(props);
    this.matchObj = props.navigation.getParam("matchObj");
    const matchObj = props.matchObj;
    const currentUserEmail = 
    console.log('matchObj', matchObj);
  }

  async render() {
    const match = this.props.matchObj;
<<<<<<< HEAD
    const otherUser = match.user1.email === (await AsyncStorage.getItem("email")) ? match.user2 : match.user1; 
=======
    const otherUser = match.user1.email === await AsyncStorage.getItem('email') ? match.user2 : match.user1; 
>>>>>>> 115e73f9ebe3705abe0880ab2a85607c32018d7e
    return (
      <View>
        <Text>You've found a match!</Text>
        <MatchInfo match={this.matchObj} currentUserEmail={otherUser.email} />
      </View>
    );
  }
}
