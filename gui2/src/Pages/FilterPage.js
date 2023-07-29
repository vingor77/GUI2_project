import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
const FilterPage = ({ user }) => {
  return (
    <div>
      <p>This is a filter Page</p>
      <SignOutButton user={user} />
      <Navigation />
    </div>
  );
};

export default FilterPage;
