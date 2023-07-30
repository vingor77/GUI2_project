import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
//This page will change to be the "home" page where the map resides.
export default function MainPage(props) {
  // Create and render a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage user={props} />,
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
