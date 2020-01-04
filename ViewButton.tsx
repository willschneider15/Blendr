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

const DUCK =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";
const NON_MOVING_DUCK =
  "https://cdn.discordapp.com/attachments/654373638065225731/663095334620233770/logo4.png";

class MatchJob {
  running: boolean;

  constructor() {
    this.running = false;
    this.setRunning.bind(this);
  }

  setRunning(running: boolean) {
    this.running = running;
  }
}

interface MatchmakingProps {
  toggleMatchmaking: (event: GestureResponderEvent) => void;
}

class MatchmakingIcon extends Component<MatchmakingProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.toggleMatchmaking}>
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
      </TouchableOpacity>
    );
  }
}

interface ViewButtonState {
  matchmaking: boolean;
  matchmakingJob: MatchJob;
}

export default class ViewButton extends Component<{}, ViewButtonState> {
  constructor(props) {
    super(props);
    this.state = {
      matchmaking: false,
      matchmakingJob: new MatchJob()
    };
  }

  toggleMatchmaking = () => {
    this.setState(prevState => {
      const matchmaking = !prevState.matchmaking;
      this.state.matchmakingJob.setRunning(matchmaking);
      return {
        matchmaking: matchmaking
      };
    });
  };

  render() {
    if (this.state.matchmaking) {
      return <MatchmakingIcon toggleMatchmaking={this.toggleMatchmaking} />;
    } else {
      return (
        <TouchableOpacity onPress={this.toggleMatchmaking}>
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={{ uri: NON_MOVING_DUCK }}
            ></Image>
            <Text>Find Match</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
