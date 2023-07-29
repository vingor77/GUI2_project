import React from "react";
import Navigation from "../components/Navigation";
import { SignOutButton } from "../components/SignOutButton";
import Tab from "../components/Tab";
import TopMenu from "../components/TopMenu";
const BookmarksPage = ({ user }) => {
  return (
    <div>
      <SignOutButton user={user} />
      <TopMenu />
      <Navigation />
      <Tab tabTitle={"Bookmarks"} />
    </div>
  );
};

export default BookmarksPage;
