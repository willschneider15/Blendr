import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  TextInput
} from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import ListItem from "./ListItem"

const questionData = [
  {
    question: "Email",
    key: "email"
  },
  {
    question: "Password",
    key: "password",
  },
  {
    question: "What is your role?",
    key: "role",
  },
  {
    question: "What school did you graduate from?",
    key: "school",
  },
  {
    question: "Where are you from?",
    key: "hometown",
  },
  {
    question: "How long have you been working?",
    key: "experience"
  },
];

interface RegisterProps {
  navigation: NavigationStackProp;
}

interface RegisterState {
  answers // Map from dbKey to answer
}

export default class Register extends Component<RegisterProps, RegisterState> {
  listGenerator = data => {
    return (
      <TextInput placeholder={question} onChange={} />
    )
  }

  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      answers: {}
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView>
        <FlatList 
          data={questionData}
          renderItem={this.listGenerator}
        />
      </KeyboardAvoidingView>
    );
  }

  setQuestionResponse(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  onQuestionChange(text, i) {
    this.setState(prevState => {
      prevState.answers[i] = text;
      return prevState;
    });
  }
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 3,
    borderColor: "#F08B1C",
    textAlign: "center",
    color: "black"
  },
  text: {
    height: 40,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    includeFontPadding: false,
    textAlignVertical: "center"
  },
  row: {
    padding: 20
  },
  button: {
    backgroundColor: "blue",
    flex: 1
  }
});