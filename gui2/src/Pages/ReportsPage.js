import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
import Tab from "../components/Tab";
import TopMenu from "../components/TopMenu";
const ReportsPage = ({ user }) => {
  return (
    <div>
      <SignOutButton user={user} />
      <TopMenu />
      <Navigation />
      <Tab tabTitle={"View Reports"} />
    </div>
  );
};

export default ReportsPage;
