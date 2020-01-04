import React, { Component } from "react";
import data from "./secrets.json";
import axios, { AxiosResponse } from 'axios';
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

class MatchScreen extends Component<
  HomeScreenProps,
  HomeScreenState
  > {

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
    console.info('matchInfo:', matchInfo);
    this.props.navigation.navigate("postMatchScreen");
  }

  match = async () => {
    let currEmail = await AsyncStorage.getItem('email');

    // Find domain of current user
    let atSym = currEmail.indexOf('@');
    let domain = currEmail.substring(atSym + 1);

    // Check if document exists for domain
    firestore.collection('IncomingMatches').doc(domain).get().then(doc => {
      if (doc.exists) {
        // Create match using email field
        let otherEmail = doc.get('email');
        firestore.collection('Matches').doc(currEmail + '+' + otherEmail).set({
          user1: currEmail,
          user2: otherEmail,
          location: this.chooseLoc(),
          when: this.chooseTime(),
          completed: false,
        });

        // Add match ID for both users
        firestore.collection('Users').doc(currEmail).update({
          match: currEmail + '+' + otherEmail
        });
        firestore.collection('Users').doc(otherEmail).update({
          match: currEmail + '+' + otherEmail
        });

        // TODO: Navigate to postMatch page
      } else {
        // Add document with email field
        let waitingPerson = { email: currEmail };
        firestore.collection('IncomingMatches').doc(domain).set(waitingPerson);
        // WAIT FUNCTIONALITY GOES HERE...send user to waiting screen
        while (true) {
          setTimeout(1000, () => {
            firestore.collection('IncomingMatches').doc(domain).get().then(doc => {
              if (doc.exists) {
                // TODO: Navigate to postMatch pafge
              } 
            });
          });
        }
      }
    });
  }

  chooseTime() {
    const currentTime = new Date();
    return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDay(), 18);
  }

  chooseLoc() {
    return axios.get(`https://api.yelp.com/v3/businesses/search?location=WestLake%Ohio`, {
      headers: {
        Authorization: `Bearer ${data.yelpKey}`
      },
      params: {
        limit: 1,
        categories: 'coffee',
        //add functionality to check if shop is open at given time
      }
    });
  }

  // async chooseLocation() {
  //   const url = new URL("https://api.yelp.com/v3/businesses/search");
  //   url.searchParams.append("limit", "1");
  //   url.searchParams.append(
  //     "categories",
  //     "coffee,coffeeroasteries,coffeeshops"
  //   );
  //   url.searchParams.append("location", "28105%Clemens%Rd");
  //   console.log('url', url.href);
  //   const response = await fetch(url.href, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${data.yelpKey}`
  //     }
  //   });
  //   const json: any = await response.json();
  //   if (json.error) {
  //     throw new Error(`The fetch call failed with: \n${JSON.stringify(json)}`);
  //   }
  //   console.log(json);
  //   return json.businesses.map(business => {
  //     return {
  //       name: business.name,
  //       coords: business.coordinates
  //     };
  //   });
  // }
}

export { MatchScreen as default, MatchObject };