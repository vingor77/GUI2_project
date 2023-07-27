import React from "react";

//This page will change to be the "home" page where the map resides.
export default function MainPage(props) {
  return (
    props.auth.currentUser && (
      <button className="sign-out" onClick={() => props.auth.signOut()}>
        Sign Out
      </button>
    )
  );
}
