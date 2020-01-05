import React, { Component } from "react";
import data from "./secrets.json";
import axios, { AxiosResponse } from "axios";
import { View, Text, Image, Button, AsyncStorage, StyleSheet } from "react-native";
import ViewButton from "./ViewButton";
import User from "./User";
import { firestore } from "./FirebaseConfig";
import { NavigationStackProp } from 'react-navigation-stack';

interface HomeScreenProps {
  navigation: NavigationStackProp;
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
  "https://cdn.discordapp.com/attachments/654373638065225731/663199290847526942/blendrIcon1.png";
const LOADING = "https://cdn.discordapp.com/attachments/654373638065225731/663242149965594645/Screen_Shot_2020-01-04_at_11.47.10_PM.png";
const NOT_LOADING = ""
const Not = "https://cdn.discordapp.com/attachments/654373638065225731/663242149965594645/Screen_Shot_2020-01-04_at_11.47.10_PM.png";
const Move = "https://www.google.com/search?q=gif+of+loading+dots&sxsrf=ACYBGNTRdv_4M8Z044hrUZvvKFJ3H_Kd4w:1578199025618&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiJ4bnC0evmAhUpU98KHT4hCkgQ_AUoAXoECAwQAw&biw=1422&bih=715&dpr=1.8#imgrc=yiqKeNHA5OZ0dM:";

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
      <View style={styles.container}>
        <Image style={styles.logo} source={{uri: LOGO}}/>
        <Text style={styles.title}>Find Match</Text>
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
            for (let i = 0; i < 20; i++) { //pinging the server 20 times
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
              console.log("Timed out!");
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
            console.error(
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
    fontFamily: "Avenir"
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
	  fontSize: 20,
    fontWeight: "bold"
    
  },

  loginBtn:{
    width:"75%",
    backgroundColor:"#F08B1C",
    borderRadius:25,
    height:50,
    alignItems:"center",                         
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
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
    color:"white"
  }
});
