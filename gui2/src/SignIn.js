import React from "react";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

import Landing from "./components/Landing";
import "./style/App.css";
import background from "./images/Logo Art.svg";

export default function SignIn(props) {
  const signInWithGoogle = () => {
    signInWithRedirect(props.auth, new GoogleAuthProvider());
  };

  const imgStyle = {
    background: "#CAFFB9",
    position: "absolute",
    bottom: "0",
    left: "0",
    maxWidth: "100%",
    height: "auto",
  };

  const signInButton = {
    textAlign: "center",
    position: "absolute",
    top: "50%",
  };

  const divStyle = {
    backgroundColor: "#CAFFB9",
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div style={divStyle}>
      {/* Greeting Message */}
      <Landing />
      {/* Sign-In Button */}
      <button
        style={signInButton}
        className=" offset-lg-5 col-lg-2 offset-5 col-2 sign-in"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      {/* Background Image */}
      <img style={imgStyle} src={background} />
    </div>
  );
}
