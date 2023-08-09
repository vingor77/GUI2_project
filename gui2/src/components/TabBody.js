import React from "react";
import CreateAlertsTab from "../Pages/CreateAlertsTab";
import EventsTab from "../Pages/EventsTab";
import ReportsTab from "../Pages/ReportsTab";
import BookmarksTab from "../Pages/BookmarksTab";

const TabBody = ({ tabTitle, user }) => {
  // Displays different contents based on the tab
  function Display({ tabTitle }) {
    switch (tabTitle) {
      case "View Events":
        return <EventsTab user={user} />;
      case "View Issues":
        return <ReportsTab user={user} />;
      case "Create Alert":
        return <CreateAlertsTab user={user} />;
      case "Bookmarks":
        return <BookmarksTab user={user} />;
    }
  }
  return (
    <div
      style={{
        borderTop: "solid",
        position: "relative",
        height: "400px",
        maxHeight: "400px",
        padding: 0,
        margin: 0,
        background: "#E4E3D9",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <Display tabTitle={tabTitle} />
      {/* <CreateAlertsTab /> */}
    </div>
  );
};

export default TabBody;
