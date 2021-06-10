
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({});

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {

        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
  }
  const handleGitHubSignIn =()=>{
    firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user)
    console.log(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log('error',errorMessage,errorCode,email,credential)
  });

  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}> Google Sign in</button>
      <br />
      <button onClick={handleGitHubSignIn}> Github Sign in</button>
      <h2> Email : {user.email}</h2>
      <h2> Name : {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
