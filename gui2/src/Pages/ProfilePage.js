import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
import Tab from "../components/Tab";
import TopMenu from "../components/TopMenu";
import Map from "../components/Map";
const ProfilePage = ({ user }) => {
  return (
    <div>
      <SignOutButton user={user} />
      <TopMenu />
      <Navigation />
      <Tab tabTitle={"Profile"} />
      <Map />
    </div>
  );
};

export default ProfilePage;
