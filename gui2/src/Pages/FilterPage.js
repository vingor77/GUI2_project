import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
import Map from "../components/Map";
const FilterPage = ({ user }) => {
  return (
    <div>
      <SignOutButton user={user} />
      <Navigation />
      <Map />
    </div>
  );
};

export default FilterPage;
