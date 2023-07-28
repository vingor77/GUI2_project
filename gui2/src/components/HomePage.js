import React from "react";
import Navigation from "./Navigation";
const HomePage = ({ user }) => {
  return (
    <>
      <button className="sign-out" onClick={() => user.auth.signOut()}>
        Sign Out
      </button>
      <Navigation />
    </>
  );
};

export default HomePage;
