import Base64 from "base-64";
import { Image, AsyncStorage } from "react-native";
import { database } from "firebase";
import { firebaseAuth } from "./FirebaseConfig";
import { firestore } from "./FirebaseConfig";
import React, {Component} from "react";
import {Text, View, Button} from "react-native";
import {WebView} from "react-native-webview";
import {Linking} from "expo";

interface QuestionAnswer {
  question: string;
  answer: string;
  dbKey: string;
}

export default class User {
  email: string;
  name: string;
  experience: string;
  hometown: string;
  lookingForMatch: string;
  static get password(): Promise<string> {
    return AsyncStorage.getItem("auth");
  }

  private constructor(email, name, experience, hometown, lookingForMatch) {
    this.email = email;
    this.name = name;
    this.experience = experience;
    this.hometown = hometown;
    this.lookingForMatch = lookingForMatch;
  }

  getComponent = (location: string) => {
    const mapsURI = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    console.log('mapsURI', mapsURI);
    return (
      <View>
        <Text>Email: {this.email}</Text>
        <Text>Name: {this.name}</Text>
        <Text>Experience: {this.experience}</Text>
        <Text>Hometown: {this.hometown}</Text>
        <Text>Where you're meeting: {location}</Text>
        <Button title="Open in Google Maps!" onPress={()=>Linking.openURL(mapsURI)}></Button>
      </View>
    )
  }

  commit() {
    database()
      .ref(`users/${this.email}`)
      .set(this);
  }

  public static async createUser(
    email: string,
    password: string,
    firstName: string,
    questionAnswers: QuestionAnswer[]
  ): Promise<Boolean> {
    email = email.toLowerCase();
    let success = true;
    // Attempt to create user in Firebase
    await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // TODO: Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("error:", errorMessage);
        success = false;
        return false;
      });

    // Add user's name and other metadata
    if (success) {
      var userInfo = {
        name: firstName,
        score: 0,
        lookingForMatch: false,
        prevMatches: new Array<string>(),
        image: Math.trunc(Math.random()*5+1),
      };

      // Add each answer response of user
      for (let qa of questionAnswers) {
        userInfo[qa.dbKey] = qa.answer;
      }

      // Add user to database
      firestore
        .collection("Users")
        .doc(email)
        .set(userInfo);

      await AsyncStorage.setItem("auth", password);
      return true;
    }
  }

  static async authenticate(email: string, password: string) {
    let successful = true;
    let res = { success: true };
    await firebaseAuth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
          console.log("fail");
          successful = false;
        }
      });

    if (!successful) {
      res.success = false;
    }

    return res;
  }

  static async getUser(email: string) {
    console.log(`Finding user with email ${email}`);
    const userDoc = await firestore
      .collection("Users")
      .doc(email.toLowerCase())
      .get();
    if (!userDoc.exists) {
      const errorString = `Could not find user with email ${email}`;
      console.error(errorString);
      throw new Error(`Could not find user with email ${email}`);
    }
    const user = new User(
      email,
      userDoc.get("name"),
      userDoc.get("experience"),
      userDoc.get("hometown"),
      userDoc.get("lookingForMatch")
    );
    console.log('Found user:', user);
    return user;
  }
}
