import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
import Tab from "../components/Tab";
import TopMenu from "../components/TopMenu";
import Map from "../components/Map";
const EventsPage = ({ user }) => {
  return (
    <div>
      <SignOutButton user={user} />
      <TopMenu />
      <Tab tabTitle={"View Events"} />
      <Navigation />
      <Map />
    </div>
  );
};

export default EventsPage;
