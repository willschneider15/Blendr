import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import MatchScreen from './Match';



const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  Match: {
    screen: MatchScreen
  }
});

export default createAppContainer(AppNavigator);