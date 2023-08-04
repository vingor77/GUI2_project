import React from "react";
import UMLImage from "../images/UML.svg";

const AboutUs = () => {
  return (
    <div style={{ background: "#DFF8D5" }} className="container py-5">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
          <img
              className="my-4"
              src={UMLImage}
              alt="UML"
              style={{ height: "48px", width: "48px", marginBottom: "20px" }}
            />
            <h1 className="display-4 ms-2">About Us</h1>
          </div>
          <p className="lead">
          As a group of students from the University of Massachusetts Lowell,
            we embarked on a journey to create CommunityAlert for our GUI 2
            class project. The platform was designed with the intention to
            promote safety and unity within local communities.
          </p>
          <p>
          The platform transforms every user into an active participant in
            their community's safety by allowing them to report incidents or
            safety concerns. With the goal of fostering a sense of collective
            responsibility and vigilance, CommunityAlert is committed to
            providing a user-friendly experience for all, regardless of their
            tech proficiency levels.
          </p>
          <p>
          Transparency is another key aspect of our platform. In the modern
            world, where data is often abundant yet inaccessible, we aim to
            provide community members with timely, transparent access to
            information. By facilitating real-time updates and open sharing of
            reported incidents, CommunityAlert ensures everyone in the community
            stays informed and vigilant.
          </p>
          <p>
          We are not just the creators of CommunityAlert; we are its users,
            advocates, and community members too. Our shared vision of safer,
            more connected communities drives us to continually refine and
            improve CommunityAlert based on user experiences and feedback.
          </p>
          <p>
          More than a class project, CommunityAlert represents our shared
            vision of safer, more connected communities. Each member of our
            team—Akshat, Ben, Phat, and Vincent—brings unique skills,
            perspectives, and passion to the project, resulting in a platform
            that truly embodies our commitment to community safety and unity.
          </p>
          <hr />
          <h2 className="display-6">Thanks for Reading</h2>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
