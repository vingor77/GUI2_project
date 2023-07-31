import React from "react";
import { useState } from "react";
import CreateAlertsTab from "../Pages/CreateAlertsTab";
import FilterTab from "../Pages/FilterTab";
import EventsTab from "../Pages/EventsTab";
import ReportsTab from "../Pages/ReportsTab";
import ProfileTab from "../Pages/ProfileTab";
import BookmarksTab from "../Pages/BookmarksTab"
const TabBody = ({tabTitle}) => {
  const [events, setEvents] = useState(false);
  const [reports, setReports] = useState(false);

  // Displays different contents based on the tab
  function Display({tabTitle}) {
    switch(tabTitle){
      case "View Events":
        return <EventsTab />
      case "View Reports":
        return <ReportsTab />
      case "Create Alert":
        return <CreateAlertsTab/>
      case "Bookmarks":
        return <BookmarksTab />
      case "Profile":
        return <ProfileTab />
    }
  }
  return (
    <div style={{ borderTop: "solid" }}>
      <Display tabTitle={tabTitle}/> 
    </div>
  );
};

export default TabBody;
