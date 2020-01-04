import Base64 from "base-64";
import { Image, AsyncStorage } from "react-native";
import { database } from "firebase";
import { firebaseAuth } from "./FirebaseConfig";
import { firestore } from "./FirebaseConfig";

interface QuestionAnswer {
  question: string, answer: string, dbKey: string
}

export default class User {
  private email: string;
  private firstName: string;
  private questionAnswers: QuestionAnswer[];
  private image?: Image;
  static get password(): Promise<string> {
    return AsyncStorage.getItem('auth');
  }

  static get isLoggedIn() {
    return new Promise(resolve => {
      AsyncStorage.getItem("auth", error =>
        error ? resolve(false) : resolve(true)
      );
    });
  }

  private constructor(email: string, firstName: string, questionAnswer: QuestionAnswer[]) {
    this.email = email;
    this.firstName = firstName;
    this.questionAnswers = questionAnswer;
  }

  commit() {
    database().ref(`users/${this.email}`).set(this);
  }
  
  public static async createUser(email: string, password: string, firstName: string, questionAnswers: QuestionAnswer[]): Promise<Boolean> {
      let success = true;
      // Attempt to create user in Firebase
      await firebaseAuth.createUserWithEmailAndPassword(email, password).catch(error => {
        // TODO: Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log('fail');
        success = false;
        return false;
      });

      // Add user's name and other metadata
      if (success) {
        var userInfo = { 
            name: firstName,
            score: 0,
            lookingForMatch: false,
            prevMatches: new Array<string>() };
        
        // Add each answer response of user
        for (let qa of questionAnswers) {
          userInfo[qa.dbKey] = qa.answer;
        }
      
        // Add user to database
        firestore.collection('Users').doc(email).set(userInfo);
      
        await AsyncStorage.setItem('auth', password);
        return true;
      }
  }

  static async authenticate(username: string, password: string) {
    let successful = true;
    let res = {success: true};
    await firebaseAuth.signInWithEmailAndPassword(username, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        console.log('fail');
        successful = false;
      }
    });

    if (!successful) {
      res.success = false;
    }
    
    return res;
  }

  static getUser(email: string) {
    return new Promise<User>(resolve => {
      database().ref(`users/${email}`).on("value", snapshot => {
        const val = snapshot.val();
        const user = new User(val.email, val.firstName, val.questionAnswers);
        resolve(user);
      });
    });
  }
}