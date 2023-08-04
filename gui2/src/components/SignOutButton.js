import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
export const SignOutButton = ({ user }) => {
  const SignOutButtonStyle = {
    position: "absolute",
    right: "0",
    top: "60px",
    zIndex: "1",
  };

  const avatarStyle = {
    width: "50px",
    position: "absolute",
    zIndex: "1",
    right: "10px",
    top: "10px",
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
    <button
      style={SignOutButtonStyle}
      className="sign-out"
      onClick={() => user.auth.signOut()}
    >
      Sign Out
    </button>
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
