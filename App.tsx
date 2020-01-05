import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  createAppContainer,
  NavigationStackRouterConfig
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import User from "./User";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import MatchScreen from "./Match";
//import postMatchScreen from "./PostMatch";
import HomeScreen from "./Home";

const config: NavigationStackRouterConfig = {
  initialRouteName: "LoginScreen"
};

const AppNavigator = createStackNavigator(
  {
    MatchScreen: {
      screen: MatchScreen
    },
    // postMatchScreen: {
    //   screen: postMatchScreen
    // },
    HomeScreen: {
      screen: HomeScreen
    },
    LoginScreen: {
      screen: LoginScreen
    },
    RegisterScreen: {
      screen: RegisterScreen
    }
  },
  config
);
export default createAppContainer(AppNavigator);
