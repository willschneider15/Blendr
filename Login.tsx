import React, { Component } from "react";
import { View, AsyncStorage, TextInput, Button, Text } from "react-native";
import User from "./User";

interface LoginScreenProps {
  navigation;
}

interface LoginScreenState {
  email: string;
  password: string;
  loginError: string;
}

export default class LoginScreen extends Component<
  LoginScreenProps,
  LoginScreenState
> {
  constructor(props: LoginScreenProps) {
    super(props);
    if (LoginScreen.loggedIn) {
      props.navigation.navigate("app");
    }
    this.state = {
      loginError: '',
      email: '',
      password: '',
    };
  }

  static get loggedIn() {
    return new Promise(resolve => {
      AsyncStorage.getItem("auth", error =>
        error ? resolve(false) : resolve(true)
      );
    });
  }

  submit() {
    const { email, password } = this.state;
    User.authenticate(email, password).then(result => {
      if (result.success) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('auth', password);
        this.props.navigation.navigate("app");
      } else {
        this.setState({ loginError: result.error });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Blendr</Text>
        <Text>{this.state.loginError}</Text>
        <TextInput
          placeholder='Email'
          onChangeText={email => this.setState({ email: email })}
        ></TextInput>
        <TextInput
          placeholder='Password'
          onChangeText={password => this.setState({ password: password })}
        ></TextInput>
        <Button title="Submit" onPress={this.submit} />
      </View>
    );
  }
}
