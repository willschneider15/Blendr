import React, { Component } from "react";
import data from "./secrets.json";
import axios from 'axios';
import { View, Text, Image, Button } from "react-native";
import ViewButton from "./ViewButton";

interface HomeScreenProps {
  navigation;
}

interface HomeScreenState {
  date: number | string;
}

const LOGO =
  "https://cdn.discordapp.com/attachments/654373638065225731/662870509750452244/logoTest.gif";

export default class MatchScreen extends Component<
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
    this.chooseTime();
    this.chooseLoc();
    // const ifSuccess = result => {

    // };
    // const ifFailure = error => {
    //   console.error(error);
    // };
    // this.chooseLocation()
    //   .then(ifSuccess)
    //   .catch(ifFailure);

    this.getCurrentDate();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  getCurrentDate() {
    var currentTime = new Date();
    currentTime.getHours();
    return currentTime;
  }

  chooseTime() {}

  chooseLoc(){
    axios.get(`https://api.yelp.com/v3/businesses/search?location=WestLake%Ohio`, {
      headers: {
        Authorization: `Bearer ${data.yelpKey}`
    },
      params: {
        limit: 1,
        categories: 'coffee',
        //add functionality to check if shop is open at given time
    }
    })
    .then((res) => {
      console.log(res.data.businesses[0].name)
    })
    .catch((err) => {
      console.log ('No locations were found')
    })
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
