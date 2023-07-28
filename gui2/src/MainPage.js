import React from "react";
import HomePage from "./components/HomePage";
import "./style/MainPage.css";

//This page will change to be the "home" page where the map resides.
export default function MainPage(props) {
  return (
    props.auth.currentUser && (
      <>
        {/* <button className="sign-out" onClick={() => props.auth.signOut()}>
          Sign Out
        </button> */}
        <HomePage user={props} />
      </>
    )
  );
}
