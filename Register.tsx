import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage, Alert } from "react-native";
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
  answers: string[];
}

export default class Register extends Component<RegisterProps, RegisterState> {
  answers = new Array(questions.length).map(() => '');
  elements = questions.map((question, index) => (
    <TextInput
      placeholder={question}
      onChangeText={text => this.onQuestionChange(text, index)}
      key={index}
    />
  ));

  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      answers: new Array(questions.length),
      email: '',
      password: '',
      firstName: '',
    };
    this.onQuestionChange.bind(this);
  }

  onQuestionChange(text, i) {
    this.setState(prevState => {
      prevState.answers[i] = text
      return prevState;
    });
  }

  submit = async () => {
    let { email, password, firstName, answers } = this.state;
    const newAnswers = answers.map((answer, i) => ({
      question: questions[i],
      answer: answer,
      dbKey: dbKeys[i],
    }));
    const res = await User.createUser(email, password, firstName, newAnswers);
    // If login succeeds, navigate to homepage
    if (res) {
      Alert.alert(
        'Congrats!',
        'Your Registration Was Successful',
      );
      this.props.navigation.navigate("HomeScreen");
    } else {
      Alert.alert(
        'Sorry!',
        'Registration failed',
      );
    }
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("auth", password);
    AsyncStorage.setItem("firstName", firstName);
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
        {this.elements}
        <Button title="Submit" onPress={this.submit}></Button>
      </View>
    );
  }
}
