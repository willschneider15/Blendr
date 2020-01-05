import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  View
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


export default class Register extends Component<RegisterProps> {
  answers = {};

  listGenerator = (item: { question: string; key: React.ReactText; }) => {
    return (
    <View>
      <TextInput placeholder={item.question} onChange={text => this.answers[item.key] = text} />
    </View>
    );
  };

  constructor(props: RegisterProps) {
    super(props);
  }
  
  async render() {
    return (
      <KeyboardAvoidingView>
        <FlatList 
          data={questionData}
          renderItem={this.listGenerator}
        />
      </KeyboardAvoidingView>
    );
  }

  onQuestionChange(text: any, i: React.ReactText) {
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
