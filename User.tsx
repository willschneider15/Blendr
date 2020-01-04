import Base64 from "base-64";
import { Image, AsyncStorage } from "react-native";
import { database } from "firebase";
import { firebaseAuth } from "./FirebaseConfig";
import { firestore } from "./FirebaseConfig";

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
      firebaseAuth.createUserWithEmailAndPassword(email, password).catch(error => {
        // TODO: Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

      // Add user to database
      firestore.collection('Users').doc(email).set({
        // DATA FIELDS GO HERE
      });

      await AsyncStorage.setItem('auth', password);
      return new User(email, questionAnswers);
  }

  static async authenticate(username: string, password: string) {
    firebaseAuth.signInWithEmailAndPassword(username, password).catch(function(error) {
      // Return false if error was thrown
      var errorCode = error.code;
      var errorMessage = error.message;
      return {success: false, error: errorMessage};
    });
    // If this point of the code is reached, return true
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