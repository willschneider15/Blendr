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
import PostMatchScreen from "./PostMatch";
import HomeScreen from "./Home";

const config: NavigationStackRouterConfig = {
  initialRouteName: "HomeScreen"
};

const AppNavigator = createStackNavigator(
  {
    MatchScreen: {
      screen: MatchScreen
    },
    PostMatchScreen: {
      screen: PostMatchScreen
    },
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
