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
  user1: User;
  user2: User;
  location;
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

  onMatchFound = matchObj => {
    console.info("matchInfo:", matchObj);
    this.props.navigation.navigate("PostMatchScreen", {
      matchObj: matchObj
    });
  };

  match = async () => {
    const time1 = new Date().getMilliseconds();
    let currEmail = await AsyncStorage.getItem("email");

    console.log(`Finding match for user ${currEmail}`);
    // Find domain of current user
    let atSym = currEmail.indexOf("@");
    let domain = currEmail.substring(atSym + 1);

    let proposedLocation = this.chooseLoc();

    // Check if document exists for domain
    return await new Promise<MatchObject>(async (resolve, reject) => {
      firestore
        .collection("IncomingMatches")
        .doc(domain)
        .get()
        .then(async doc => {
          if (doc.exists) {
            // Create match using email field
            let otherEmail = doc.get("email");
            let time = this.chooseTime();
            firestore
              .collection("Matches")
              .doc(currEmail + "+" + otherEmail)
              .set({
                user1: currEmail,
                user2: otherEmail,
                location: await proposedLocation,
                when: time,
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
            const result = {
              user1: await User.getUser(currEmail),
              user2: await User.getUser(otherEmail),
              location: await proposedLocation,
              time: time
            };
            console.log(
              `Found match for ${currEmail} in ${new Date().getMilliseconds() -
                time1} ms:`,
              result
            );
            resolve(result);
          } else {
            // Add document with email field
            let waitingPerson = { email: currEmail };
            firestore
              .collection("IncomingMatches")
              .doc(domain)
              .set(waitingPerson);
            // WAIT FUNCTIONALITY GOES HERE...send user to waiting screen
            let success = false;
            let doc;
            for (let i = 0; i < 20; i++) {
              doc = await firestore
                .collection("IncomingMatches")
                .doc(domain)
                .get();
              if (!doc.exists) {
                // TODO: Navigate to postMatch page
                firestore
                  .collection("IncomingMatches")
                  .doc(domain)
                  .delete();
                success = true;
                break;
              }
            }
            if (!success) {
              console.error("Timed out!");
              reject("Timed out!");
            }
            const matchDoc = firestore
              .collection("Users")
              .doc(currEmail)
              .get()
              .then(data => {
                return firestore
                  .collection("Match")
                  .doc(data.get("match"))
                  .get();
              });

            const result = {
              user1: await matchDoc.then(doc => User.getUser(doc.get("user1"))),
              user2: await matchDoc.then(doc => User.getUser(doc.get("user2"))),
              location: await matchDoc.then(doc => doc.get("location")),
              time: await matchDoc.then(doc => doc.get("when"))
            };
            console.log(
              `Found match for ${currEmail} in ${time1 -
                new Date().getMilliseconds()} ms:`,
              result
            );
            resolve(result);
          }
        });
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
        console.log("res", res.data.businesses[0]);
        return res.data.businesses[0].name;
      })
      .catch(err => {
        console.error("No locations were found:", err);
      });
  }
}

export { MatchScreen as default, MatchObject };
