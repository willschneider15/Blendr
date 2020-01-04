import React, { Component } from "react";
import { View, AsyncStorage, TextInput, Button, Text, Alert } from "react-native";
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
    this.state = {
      loginError: '',
      email: '',
      password: '',
    };
  }

  submit = () => {
    const { email, password } = this.state;
    User.authenticate(email, password).then(result => {
      if (result.success) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('auth', password);
        this.props.navigation.navigate("MatchScreen");
      } else {
        //this.setState({ loginError: result.error });
        Alert.alert(
          'Sorry!',
          'Login failed',
        );
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Blendr</Text>
        <Text>{this.state.loginError}</Text>
        <TextInput
      
          onChangeText={email => this.setState({ email: email })}
        ></TextInput>
        <TextInput
          onChangeText={password => this.setState({ password: password })}
        ></TextInput>
        <Button title="Submit" onPress={this.log} />
      </View>
    );
  }

  log(){
    this.submit;
    this.props.navigation.navigate("MatchScreen");
  }
}
