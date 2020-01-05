import React, { Component } from "react";
import {
  Button,
  GestureResponderEvent,
  AsyncStorage,
  Image,
  Text,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {MatchObject} from "./Match";

const Buttons = "https://cdn.discordapp.com/attachments/654373638065225731/663252486798311447/game-start-button-png.png";
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
      //Loading
      return (
        <View style={{ alignContent: "center" }}>
          <Image
            style={{ width: 80, height: 80, paddingLeft: 200 }}
            source={{ uri: LOADING }}
          ></Image>
          <TouchableOpacity style={styles.loginBtn}>
            
          <Text style={styles.loginText}>Start</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    } else {
      // Not loading
      return (
        <View>
          <Image style={{ width: 80, height: 80 , paddingLeft: 200 }}
              source={{ uri: NOT_LOADING }}
            ></Image>
            <TouchableOpacity onPress={this.startMatchmaking} style={styles.loginBtn}>
            
            <Text style={styles.loginText}>Start</Text>
            {/* <Image
              style={{ width: 200, height: 70 }}
              source={{ uri: Buttons }}
            ></Image> */}
            
            <Text
              style={{
                color: "red",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              {this.state.error}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 60,
  },

  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  /*
  formContainer: {
    padding: 20
  }, 

  input: {
    height: 40,
    backgroundColor: "green",
    marginBottom: 20,
    color: "black"
  }, */

  title: {
    color: 'black',
    fontSize: 40,
    opacity: 1,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: 'bold',
  },

  buttonSigin: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7FA2B6',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20
  },

  buttonText: {
    textAlign: "center",
    color: "#7FA2B6",
    height: 40,
	  fontSize: 40,
    fontWeight: "bold"
    
  },

  loginBtn:{
    width:"75%",
    backgroundColor:"#F08B1C",
    borderRadius:55,
    height:70,
    marginLeft: 25,
    paddingTop: 15,
    alignItems:"center",                         
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    shadowColor: "#7FA2B6",
    shadowRadius: 255,
    shadowOpacity: 1,
    shadowOffset: {width: 15, height: 10},
 
  },

  registerBtn:{
    width:"75%",
    backgroundColor:"#F08B1C",
    borderRadius:25,
    height:50,
    alignItems:"center",                         
    justifyContent:"center",
    marginTop:20,
    marginBottom:150
  },

  loginText:{
    color:"white",
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",

  }
});
