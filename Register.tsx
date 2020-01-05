import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage, Alert, Text, StyleSheet } from "react-native";
import User from "./User";
import { Col, Row, Grid } from "react-native-easy-grid";

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
    borderColor: '#F08B1C',
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
  },
  row: {
    padding: 20,
  },
  button: {
    backgroundColor: 'blue',
    flex: 1,
  },

});

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
    <Row style={styles.row}>
      <Col><Text style={styles.text}>{question}</Text></Col>
      <Col><TextInput
        style={styles.input}
        onChangeText={text => this.onQuestionChange(text, index)}
        key={index}
      /></Col>
    </Row>
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
    console.log('state', this.state);
    console.log('newAnswers', newAnswers);
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
      <Grid>
        <Row style={styles.row}>
          <Col><Text style={styles.text}>Email</Text></Col>
          <Col><TextInput
            style={styles.input}
            onChangeText={email => this.setState({ email: email })}
          ></TextInput></Col>
        </Row>
        <Row style={styles.row}>
          <Col><Text style={styles.text}>Password</Text></Col>
          <Col><TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password: password })}
          ></TextInput></Col>
        </Row>
        <Row style={styles.row}>
          <Col><Text style={styles.text}>First Name</Text></Col>
          <Col><TextInput
            style={styles.input}
            onChangeText={firstName => this.setState({ firstName: firstName })}
          ></TextInput></Col>
        </Row>
        {this.elements}
        <Row style={styles.row}><View style={styles.button} ><Button title="Submit" color='white' onPress={this.submit}></Button></View></Row>
      </Grid>
    );
  }
}