import React from "react";
import Navigation from "../components/Navigation";
// import { SignOutButton } from "../components/SignOutButton";
import Map from "../components/Map";
import TopMenu from "../components/TopMenu";

const HomePage = ({ user }) => {
  return (
    <>
      {/* <SignOutButton user={user} /> */}
      <TopMenu user={user} />
      <Navigation />
      <Map />
    </>
  );
};

export default HomePage;
