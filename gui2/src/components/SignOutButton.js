import React from "react";

export const SignOutButton = ({ user }) => {
  const SignOutButtonStyle = {
    position: "absolute",
    right: "0",
    top: "0",
    zIndex: "1",
  };

  return (
    <div style={SignOutButtonStyle}>
      <button
        // style={SignOutButtonStyle}
        className="sign-out"
        onClick={() => user.auth.signOut()}
      >
        Sign Out
      </button>
      <img src={user.photoURL} />
    </div>
  );
};
