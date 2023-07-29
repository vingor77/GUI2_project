import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FilterPage from "./Pages/FilterPage";
import ReportsPage from "./Pages/ReportsPage";
import CreateAlertsPage from "./Pages/CreateAlertsPage";
import BookmarksPage from "./Pages/BookmarksPage";
import ProfilePage from "./Pages/ProfilePage";
import EventsPage from "./Pages/EventsPage";
//This page will change to be the "home" page where the map resides.
export default function MainPage(props) {
  // Create and render a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage user={props} />,
    },
    {
      path: "filter",
      element: <FilterPage user={props} />,
    },
    {
      path: "events",
      element: <EventsPage user={props} />,
    },
    {
      path: "reports",
      element: <ReportsPage user={props} />,
    },
    {
      path: "createAlerts",
      element: <CreateAlertsPage user={props} />,
    },
    {
      path: "bookmarks",
      element: <BookmarksPage user={props} />,
    },
    {
      path: "profile",
      element: <ProfilePage user={props} />,
    },
  ]);

  return (
    props.auth.currentUser && (
      <>
        <RouterProvider router={router} />
      </>
    )
  );
}
