import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useRadioGroup } from '@material-ui/core';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [logInUser, setLogInUser] = useContext(userContext)
    const history = useHistory();
  const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
}
  
    const handleGoogleSignIn =()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
      
        firebase.auth().signInWithPopup(provider).then(function(result) {
        const {displayName, email} = result.user;
        const signInUser = {name:displayName,email}
            setLogInUser(signInUser)
            storeAuthToken()
              history.replace(from);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
            const storeAuthToken = ()=>{
                firebase.auth().currentUser.getIdToken( true).then(function(idToken) {
                   sessionStorage.setItem("token",idToken)
                    
                  }).catch(function(error) {
                    // Handle error
                  });
            }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}> google sign in</button>
        </div>
    );
};

export default Login;