import React, { Component } from "react";
import data from "./secrets.json";
import axios, { AxiosResponse } from "axios";
import { View, Text, Image, Button, AsyncStorage } from "react-native";
import ViewButton from "./ViewButton";
import User from "./User";
import { firestore } from "./FirebaseConfig";

interface HomeScreenProps {
  navigation;
}

interface HomeScreenState {
  date: number | string;
}

interface MatchObject {
  currentUser: Promise<User>;
  otherUser: User;
  location: Promise<AxiosResponse<any>>;
  time: Date;
}

const LOGO =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";

class MatchScreen extends Component<HomeScreenProps, HomeScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  componentDidMount() {
    var that = this;
    var hours = new Date().setHours(18);
    that.setState({
      date: hours
    });
  }

  render() {
    //var currentTime = new(Date)
    return (
      <View>
        <Text>{this.state.date}</Text>
        <Image style={{ width: 70, height: 70 }} source={{ uri: LOGO }}></Image>
        <ViewButton matchFunc={this.match} onMatchFound={this.onMatchFound} />
      </View>
    );
  }

  onMatchFound = matchInfo => {
    return;
    console.info("matchInfo:", matchInfo);
    this.props.navigation.navigate("postMatchScreen");
  };

  match = async () => {
    let currEmail = await AsyncStorage.getItem("email");

    // Find domain of current user
    let atSym = currEmail.indexOf("@");
    let domain = currEmail.substring(atSym + 1);

    // Check if document exists for domain
    firestore
      .collection("IncomingMatches")
      .doc(domain)
      .get()
      .then(async doc => {
        if (doc.exists) {
          // Create match using email field
          let otherEmail = doc.get("email");
          firestore
            .collection("Matches")
            .doc(currEmail + "+" + otherEmail)
            .set({
              user1: currEmail,
              user2: otherEmail,
              location: await this.chooseLoc(),
              when: this.chooseTime(),
              completed: false
            });

          // Add match ID for both users
          firestore
            .collection("Users")
            .doc(currEmail)
            .update({
              match: currEmail + "+" + otherEmail
            });
          firestore
            .collection("Users")
            .doc(otherEmail)
            .update({
              match: currEmail + "+" + otherEmail
            });

          // TODO: Navigate to postMatch page
          this.props.navigation.navigate("PostMatchScreen");
        } else {
          // Add document with email field
          let waitingPerson = { email: currEmail };
          firestore
            .collection("IncomingMatches")
            .doc(domain)
            .set(waitingPerson);
          // WAIT FUNCTIONALITY GOES HERE...send user to waiting screen
          let success = false;
          for (let i = 0; i < 20; i++) {
            firestore
              .collection("IncomingMatches")
              .doc(domain)
              .get()
              .then(doc => {
                if (doc.exists) {
                  // TODO: Navigate to postMatch page
                  firestore
                    .collection("IncomingMatches")
                    .doc(domain)
                    .delete();
                  this.props.navigation.navigate("PostMatchScreen");
                  success = true;
                }
              });
          }
          if (!success) {
            throw new Error("Timed out");
          }
        }
      });
  };

  chooseTime() {
    const currentTime = new Date();
    return new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDay(),
      18
    );
  }

  chooseLoc(): Promise<string> {
    return axios
      .get(`https://api.yelp.com/v3/businesses/search?location=WestLake%Ohio`, {
        headers: {
          Authorization: `Bearer ${data.yelpKey}`
        },
        params: {
          limit: 1,
          categories: "coffee"
          //add functionality to check if shop is open at given time
        }
      })
      .then(res => {
        console.log('res', res.data.businesses[0].name)
        return res.data.businesses[0].name;
      })
      .catch(err => {
        console.log("No locations were found");
      });
  }
}

export { MatchScreen as default, MatchObject };
