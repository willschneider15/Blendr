import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage } from "react-native";
import User from "./User";

const questions = ["test"];

interface RegisterProps {
  navigation;
}

interface RegisterState {
  email: string;
  password: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  answers = new Array(questions.length);
  elements = questions.map((question, index) => (
    <TextInput
      placeholder={question}
      onChangeText={text => {
        this.answers[index] = text;
      }}
    />
  ));

  constructor(props: RegisterProps) {
    super(props);
  }

  submit() {
    const [{ email, password }, answers] = [this.state, this.answers];
    User.createUser(email, password, answers);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("auth", password);
    this.props.navigation.navigate("app");
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={email => this.setState({ email: email })}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={password => this.setState({ password: password })}
        ></TextInput>
        {questions}
        <Button title="Submit" onPress={this.submit}></Button>
      </View>
    );
  }
}
