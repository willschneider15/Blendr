import Base64 from "base-64";
import { Image, AsyncStorage } from "react-native";
import { database } from "firebase";
import { firebaseAuth } from "./FirebaseConfig";


export default class User {
  private email: string;
  private questionAnswers: string[];
  private image?: Image;
  get password(): Promise<string> {
    return AsyncStorage.getItem('auth');
  }

  private constructor(email: string, questionAnswers: string[]) {
    this.email = email;
    this.questionAnswers = questionAnswers;
  }

  commit() {
    database().ref(`users/${this.email}`).set(this);
  }
  
  public static async createUser(email: string, password: string, questionAnswers: string[]): Promise<User> {
      // Attempt to create user in Firebase
      firebaseAuth.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        // TODO: Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

      await AsyncStorage.setItem('auth', password);
      return new User(email, questionAnswers);
  }

  static async getUser(email: string) {
    return new Promise<User>(resolve => {
      database().ref(`users/${email}`).on("value", snapshot => {
        const val = snapshot.val();
        const user = new User(val.email, val.questionAnswers);
        resolve(user);
      });
    });
  }
}