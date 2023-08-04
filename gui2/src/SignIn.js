import React from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getAuth,
  signInAnonymously,
} from "firebase/auth";

import Landing from "./components/Landing";
import "./style/App.css";
import background from "./images/Logo Art.svg";

export default function SignIn(props) {
  const signInWithGoogle = () => {
    signInWithRedirect(props.auth, new GoogleAuthProvider());
  };
  const signInWithAnon = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  const imgStyle = {
    background: "#CAFFB9",
    position: "absolute",
    bottom: "0",
    left: "0",
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
    width: "100%",
  };

  const signInButtonGoogle = {
    textAlign: "center",
    position: "absolute",
    top: "45%", // adjusted from 50%
  };

  const signInButtonAnon = {
    textAlign: "center",
    position: "absolute",
    top: "55%", // adjusted from 50%
  };

  const divStyle = {
    backgroundColor: "#CAFFB9",
    width: "100%",
    height: "100%",
    position: "fixed",
  };

  return (
    <div style={divStyle}>
      {/* Greeting Message */}
      <Landing />
      {/* Sign-In Button */}
      <button
        style={signInButtonGoogle}
        className=" offset-lg-5 col-lg-2 offset-3 col-6 sign-in"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <button
        style={signInButtonAnon}
        className=" offset-lg-5 col-lg-2 offset-3 col-6 sign-in"
        onClick={signInWithAnon}
      >
        Sign in anonymously
      </button>
      {/* Background Image */}
      <img style={imgStyle} src={background} alt="background community" />
    </div>
  );
}
