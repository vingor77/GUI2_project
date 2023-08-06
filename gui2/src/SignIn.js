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
import GoogleLogo from "./images/googleLogo.svg";
import IcognitoLogo from "./images/incognito.png";
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
    width: "100%",
    height: "auto",
    objectFit: "contain",
    width: "100%",
  };

  const signInButtonGoogle = {
    borderStyle: "none",
    background: "#576153",
    color: "white",
  };

  const signInButtonAnon = {
    borderStyle: "none",
    background: "#A3AF9E",
    color: "white",
  };

  const divStyle = {
    backgroundColor: "#CAFFB9",
    width: "100%",
    height: "100%",
    position: "fixed",
  };

  const googleStyle = {
    padding: "0",
    cursor: "pointer",
  };

  return (
    <div style={divStyle}>
      {/* Greeting Message */}
      <Landing />
      {/* Sign-In Button */}
      <div
        className="row offset-xl-5 col-xl-2 offset-lg-5 col-lg-3 offset-md-4 col-md-4 offset-sm-4 col-sm-4 offset-4 col-4"
        style={{
          top: "7%",
          position: "relative",
          background: "#576153",
        }}
      >
        <img
          className="col-xl-2 col-lg-3 col-md-4 col-sm-3 d-none d-sm-block"
          style={googleStyle}
          src={GoogleLogo}
          alt="google logo"
          onClick={signInWithGoogle}
        />
        <button
          className="col-xl-10 col-lg-9 col-md-8 col-sm-9 col-12"
          style={signInButtonGoogle}
          // className=" offset-lg-5 col-lg-2 offset-3 col-6 offset-md-4 col-md-4 offset-sm-4 col-sm-4 sign-in"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>

      <div
        className="row offset-xl-5 col-xl-2 offset-lg-5 col-lg-3 offset-md-4 col-md-4 offset-sm-4 col-sm-4 offset-4 col-4"
        style={{
          top: "20%",
          position: "relative",
          background: "#A3AF9E",
        }}
      >
        <img
          className="col-xl-2 col-lg-3 col-md-4 col-sm-3 col-2 d-none d-sm-block"
          style={googleStyle}
          src={IcognitoLogo}
          alt="incognito logo"
          onClick={signInWithAnon}
        />
        <button
          className="col-xl-10 col-lg-9 col-md-8 col-sm-9 col-12"
          onClick={signInWithAnon}
          style={signInButtonAnon}
        >
          Sign in anonymously
        </button>
      </div>
      {/* Background Image */}
      <img style={imgStyle} src={background} alt="background community" />
    </div>
  );
}
