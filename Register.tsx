import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  TextInput
} from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import ListItem from "./ListItem"

<<<<<<< HEAD
// NEED TO UPDATE THESE TWO IN PARALLEL
const questions = ["What is your role?", 
                  "What school did you graduate from?", 
                  "Where are you from?", 
                  "How long have you been working?"];
const dbKeys = ["role", "school", "hometown", "experience"];

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 3,
    borderColor: 'blue',
    textAlign: 'center',
    color: "black",
  },
  text: {
    height: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontFamily: "Avenir",
=======
const questionData = [
  {
    question: "Email",
    key: "email"
  },
  {
    question: "Password",
    key: "password",
>>>>>>> origin/LoginButton
  },
  {
    question: "What is your role?",
    key: "role",
  },
<<<<<<< HEAD
  button: {
    backgroundColor: '#F08B1C',
    flex: 1,
=======
  {
    question: "What school did you graduate from?",
    key: "school",
>>>>>>> origin/LoginButton
  },
  {
    question: "Where are you from?",
    key: "hometown",
  },
  {
    question: "How long have you been working?",
    key: "experience",
  },
];

interface RegisterProps {
  navigation: NavigationStackProp;
}

interface RegisterState {
  answers; // Map from dbKey to answer
}

export default class Register extends Component<RegisterProps, RegisterState> {
  listGenerator = data => {
    return (
      <TextInput placeholder={data.question} onChange={()=>{}} />
    )
  }

  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      answers: {}
    }
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

  // submit = async () => {
  //   let { email, password, firstName, answers } = this.state;
  //   const newAnswers = answers.map((answer, i) => ({
  //     question: questions[i],
  //     answer: answer,
  //     dbKey: dbKeys[i]
  //   }));
  //   console.log("state", this.state);
  //   console.log("newAnswers", newAnswers);
  //   const res = await User.createUser(email, password, firstName, newAnswers);
  //   // If login succeeds, navigate to homepage
  //   if (res) {
  //     Alert.alert("Congrats!", "Your Registration Was Successful");
  //     this.props.navigation.navigate("HomeScreen");
  //   } else {
  //     Alert.alert("Sorry!", "Registration failed");
  //   }
  //   AsyncStorage.setItem("email", email);
  //   AsyncStorage.setItem("auth", password);
  //   AsyncStorage.setItem("firstName", firstName);
  // };


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
