import React from "react";
import { Link } from "react-router-dom";
const HelpPage = () => {
  return (
    <div
      style={{
        background: "#DFF8D5",
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        position: "relative",
      }}
      className="help-page"
    >
      {/* Button to back to the homepage */}
      <Link to="/">
        <button> Go Back</button>
      </Link>

      <h1>Help & FAQ</h1>

      <h2>How to Use CommunityAlert</h2>
      <p>
        CommunityAlert is an application designed to allow users to report and
        visualize environmental issues in their local community.
      </p>

      <h2>How do I report an issue?</h2>
      <p>
        To report an issue, go to the "Create Alert" button in the Nav bar,
        select the type of issue you are reporting, and provide a brief
        description and location. You can also add a photo of the issue if you
        wish.
      </p>

      <h2>How do I add the locations of the Alerts or events?</h2>
      <p>
        To add a location to the report, you currently need to click on show map{" "}
        {"->"} navigate the map {"->"} click on anywhere in the map to drop your
        pin OR enter a location at the top(make sure to hit Geocode). Select
        Close to submit location!
      </p>

      <h2>How do I view reports on the map?</h2>
      <p>
        To view reports, navigate to the 'Map' page. There, you can see all the
        reports that have been made. You can filter these reports by issue type
        or status.
      </p>

      <h2>Can I resolve an issue?</h2>
      <p>Yes, if an issue has been fixed, it can be marked as resolved.</p>

      <h2>What does the bookmark feature do?</h2>
      <p>
        The bookmark feature allows you to easily keep track of issues that
        you're interested in. You can bookmark a report by clicking the
        'Bookmark' button on the report page.
      </p>

      <h2>Why do I need to sign in to make a report?</h2>
      <p>
        We require users to sign in to make a report to ensure that reports are
        valid and to prevent abuse of the platform.
      </p>

      <h2>What is the purpose of CommunityAlert?</h2>
      <p>
        The goal of CommunityAlert is to address local environmental issues in
        an organized manner, promoting real-time reporting, enhancing graphical
        user interface standards, and improving resource allocation and
        responsiveness of local governing bodies.
      </p>
      <h2>Need Further Assistance?</h2>
      <p>
        If you have any other concerns, questions, or need further assistance,
        please feel free to reach out to our team at{" "}
        <a href="mailto:group3communityalert@gmail.com">
          group3communityalert@gmail.com
        </a>
        . We're here to help!
      </p>
    </div>
  );
};

export default HelpPage;
