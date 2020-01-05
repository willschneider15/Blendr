import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import { MatchObject } from "./Match";
import {MapView} from "expo";

interface PostMatchScreenProps {
  navigation;
  matchObj: MatchObject;
}
const LOGO =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";


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
    this.matchObj = props.navigation.getParam("matchObj")
    const matchObj = props.matchObj;
    console.log('matchObj', matchObj);
  }

  render() {
    return (
      <View>
        <Text>You've found a match!</Text>
        <MatchInfo match={this.matchObj} currentUserEmail="Abounding05@gmail.com" />
      </View>
    );
  }
}
