import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage } from "react-native";
import User from "./User";

// NEED TO UPDATE THESE TWO IN PARALLEL
const questions = ["What is your role?", 
                  "What school did you graduate from?", 
                  "Where are you from?", 
                  "How long have you been working for your company?"];
const dbKeys = ["role", "school", "hometown", "experience"];

interface RegisterProps {
  navigation;
}

interface RegisterState {
  email: string;
  password: string;
  firstName: string;
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
    const [{ email, password, firstName }, answers] = [this.state, ...this.answers];
    answers.map((answer, i) => ({
      question: questions[i],
      answer: answer,
      dbKey: dbKeys[i],
    }));
    User.createUser(email, password, firstName, answers);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("auth", password);
    AsyncStorage.setItem("firstName", firstName);
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
        <TextInput
          placeholder="First Name"
          onChangeText={firstName => this.setState({ firstName: firstName })}
        ></TextInput>
        {questions}
        <Button title="Submit" onPress={this.submit}></Button>
      </View>
    );
  }
}
