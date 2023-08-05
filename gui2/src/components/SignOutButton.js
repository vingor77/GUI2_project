import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import signOutIcon from "../images/signOut.svg";
export const SignOutButton = ({ user }) => {
  const SignOutButtonStyle = {
    // position: "absolute",
    // right: "0",
    // top: "60px",
    // zIndex: "1",
    background: "#D0F5FF",
    position: "relative",
    left: "8px",
  };

  const avatarStyle = {
    width: "50px",
    position: "absolute",
    zIndex: "1",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  };

  const signOutIconStyle = {
    zIndex: "1",
    width: "35px",
    height: "auto",
    marginLeft: "25px",
    cursor: "pointer",
  };

  const divStyle = {
    position: "absolute",
    right: "0",
    top: "60px",
    zIndex: "1",
    background: "#D0F5FF",
    width: "80px",
    height: "auto",
    zIndex: "3",
  };
  // Get user's avatar URL
  const auth = getAuth();
  const userInfo = auth.currentUser;

  if (userInfo && userInfo.isAnonymous) {
    updateProfile(userInfo, {
      photoURL: "/anony.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
  const [signOut, setSignOut] = useState(false);
  const onClick = () => setSignOut(!signOut);
  const SignOutButton = () => (
    <div style={divStyle}>
      <img
        src={signOutIcon}
        style={signOutIconStyle}
        onClick={() => user.auth.signOut()}
      />
      <button
        style={SignOutButtonStyle}
        className="sign-out"
        onClick={() => user.auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
  return (
    <div>
      {/* Avatar */}
      <img
        onClick={onClick}
        className="rounded-circle"
        src={userInfo.photoURL}
        style={avatarStyle}
      />

      {/* Sign out */}
      {/* <button
        style={SignOutButtonStyle}
        className="sign-out"
        onClick={() => user.auth.signOut()}
      >
        Sign Out
      </button> */}
      {signOut ? <SignOutButton /> : null}
    </div>
  );
};
