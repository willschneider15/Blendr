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

const LOADING =
  "https://media.giphy.com/media/12yixaK3jASpb2/giphy.gif"
const NOT_LOADING = 
  "https://cdn.discordapp.com/attachments/654373638065225731/663244447768903690/Screen_Shot_2020-01-04_at_11.53.21_PM.png";
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
  onMatchFound(matchObject: MatchObject): void;
  matchFunc(): Promise<MatchObject>
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
    const result = this.props.matchFunc();
    result.then(result => console.log('matchFunc', result));
    result
      .then(matchObj => {
        console.log('Found match!:', matchObj);
        this.props.onMatchFound(matchObj);
        this.stopMatchmaking('');
      })
      .catch(reason => this.stopMatchmaking(reason));
  };

  render() {
    if (this.state.matchmaking) {
      return (
        <View style={{ alignContent: "center" }}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: LOADING }}
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
              source={{ uri: NOT_LOADING }}
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
