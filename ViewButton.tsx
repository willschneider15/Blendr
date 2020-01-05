import React, { Component } from "react";
import {
  Button,
  GestureResponderEvent,
  AsyncStorage,
  Image,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {MatchObject} from "./Match";

const DUCK =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";
const NON_MOVING_DUCK =
  "https://cdn.discordapp.com/attachments/654373638065225731/663095334620233770/logo4.png";

class MatchJob {
  running: boolean;

  constructor() {
    this.running = false;
    this.start.bind(this);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.running = true;
      setTimeout(() => {
        reject("Not Implemented");
        this.running = false;
      }, 2000);
    });
  }
}

interface ViewButtonProps {
  onMatchFound(matchObject): void;
  matchFunc()
}

interface ViewButtonState {
  matchmaking: boolean;
  matchmakingJob: MatchJob;
  error: string;
}

export default class ViewButton extends Component<ViewButtonProps, ViewButtonState> {
  constructor(props) {
    super(props);
    this.state = {
      matchmaking: false,
      matchmakingJob: new MatchJob(),
      error: ""
    };
  }

  stopMatchmaking = reason => {
    this.setState({
      matchmaking: false,
      matchmakingJob: new MatchJob(),
      error: reason
    });
  };

  startMatchmaking = () => {
    if (this.state.matchmaking) {
      return;
    }
    this.setState({
      matchmaking: true
    });
    this.props.matchFunc()
      .then(matchObj => {
        this.props.onMatchFound(matchObj);
        this.stopMatchmaking('');
      })
      .catch(reason => this.stopMatchmaking('No matches found'));
  };

  render() {
    if (this.state.matchmaking) {
      return (
        <View style={{ alignContent: "center" }}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: DUCK }}
          ></Image>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>Searching </Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.startMatchmaking}>
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={{ uri: NON_MOVING_DUCK }}
            ></Image>
            <Text>Find Match</Text>
            <Text
              style={{
                color: "red",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              {this.state.error}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
