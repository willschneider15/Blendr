import Base64 from "base-64";
import { Image, AsyncStorage } from "react-native";
import { database } from "firebase";
import firebase from "firebase/app";

interface QuestionAnswer {
  question: string, answer: string
}

export default class User {
  private email: string;
  private questionAnswers: QuestionAnswer[];
  private image?: Image;
  static get password(): Promise<string> {
    return AsyncStorage.getItem('auth');
  }

  private constructor(email: string, questionAnswer: QuestionAnswer[]) {
    this.email = email;
    this.questionAnswers = questionAnswer;
  }

  commit() {
    database().ref(`users/${this.email}`).set(this);
  }
  
  public static async createUser(email: string, password: string, questionAnswers: QuestionAnswer[]): Promise<User> {
      // Attempt to create user in Firebase
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        // TODO: Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      await AsyncStorage.setItem('auth', password);
      return new User(email, questionAnswers);
  }

  //TODO: Jake write this
  static async authenticate(username: string, password: string) {
    return {success: true, error: ''};
  }

  static getUser(email: string) {
    return new Promise<User>(resolve => {
      database().ref(`users/${email}`).on("value", snapshot => {
        const val = snapshot.val();
        const user = new User(val.email, val.questionAnswers);
        resolve(user);
      });
    });
  }
}