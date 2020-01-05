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
  initialRouteName: "MatchScreen"
};

const AppNavigator = createStackNavigator(
  {
    MatchScreen: {
      screen: MatchScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    PostMatchScreen: {
      screen: PostMatchScreen,
      navigationOptions: {
        headerTitle: "New Work Buddy!",        
      }
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: "Login",
      }
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitle: "Register"
      }
    }
  },
  config
);
export default createAppContainer(AppNavigator);
