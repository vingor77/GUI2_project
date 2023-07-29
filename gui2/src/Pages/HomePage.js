import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
const HomePage = ({ user }) => {
  return (
    <>
      <SignOutButton user={user} />
      <Navigation />
    </>
  );
};

export default HomePage;
