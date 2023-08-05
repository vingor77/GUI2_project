import React from "react";
import CreateAlertsTab from "../Pages/CreateAlertsTab";
import FilterTab from "../Pages/FilterTab";
import EventsTab from "../Pages/EventsTab";
import ReportsTab from "../Pages/ReportsTab";
import ProfileTab from "../Pages/ProfileTab";
import BookmarksTab from "../Pages/BookmarksTab";

const TabBody = ({ tabTitle, user }) => {
  // Displays different contents based on the tab
  function Display({ tabTitle }) {
    switch (tabTitle) {
      case "View Events":
        return <EventsTab user={user} />;
      case "View Reports":
        return <ReportsTab user={user} />;
      case "Create Alert":
        return <CreateAlertsTab user={user} />;
      case "Bookmarks":
        return <BookmarksTab user={user} />;
      case "Profile":
        return <ProfileTab user={user} />;
      case "Filter":
        return <FilterTab user={user} />;
    }
  }
  return (
    <div
      style={{
        borderTop: "solid",
        position: "relative",
        height: "400px",
        overflow: "scroll",
        maxHeight: "400px",
      }}
    >
      <Display tabTitle={tabTitle} />
      {/* <CreateAlertsTab /> */}
    </div>
  );
};

export default TabBody;
