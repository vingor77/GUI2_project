import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';

const HelpPage = () => {
  const [openedSection, setOpenedSection] = useState('');

  const toggleSection = (section) => {
    setOpenedSection(openedSection === section ? '' : section);
  };

  return (
    <Container fluid
      style={{
        background: "#DFF8D5",
        height: "100vh",
        overflow: "scroll",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        padding: "0"
      }}
      className="help-page"
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>  
        <div className="text-center mt-5">
          <h1>Help & FAQ</h1>
        </div>

        <Card className="my-4 p-4">
          <div className="accordion-section" onClick={() => toggleSection('howToUse')}>
            <h2>How to Use CommunityAlert</h2>
            {openedSection === 'howToUse' && (
              <p>CommunityAlert is an application designed to allow users to report issues, view local events and visualize environmental issues in their local community with the help of dynamic maps and community input.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('reportIssue')}>
            <h2>How do I report an issue?</h2>
            {openedSection === 'reportIssue' && (
              <p>To report an issue, go to create an alert button, select the type of issue you are reporting, and provide a brief description and location. You can also add a photo of the issue if you wish.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('viewReports')}>
            <h2>How do I view issues on the map?</h2>
            {openedSection === 'viewReports' && (
              <p>To view issues, you can either navigate the map to find all kinds of alerts or click the issues tab. There, you can see all the issues that have been made. You can even filter these issues by issue type.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('resolveIssue')}>
            <h2>Can I resolve an issue?</h2>
            {openedSection === 'resolveIssue' && (
              <p>Yes, if an issue has been fixed, it can be marked for deletion.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('bookmark')}>
            <h2>What does the bookmark feature do?</h2>
            {openedSection === 'bookmark' && (
              <p>The bookmark feature allows you to easily keep track of issues that you're interested in. You can bookmark a report by clicking the 'Bookmark' button on the issues page. Then if you would like to unbookmark, simply go to the bookmarks tab to do so.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('signIn')}>
            <h2>Why do I need to sign in to make a report?</h2>
            {openedSection === 'signIn' && (
              <p>We require users to sign in to make a report to ensure that issues are valid and to prevent abuse of the platform.</p>
            )}
          </div>

          <div className="accordion-section" onClick={() => toggleSection('purpose')}>
            <h2>What is the purpose of CommunityAlert?</h2>
            {openedSection === 'purpose' && (
              <p>The goal of CommunityAlert is to address local environmental issues in an organized manner, promoting real-time reporting, enhancing graphical user interface standards, and improving resource allocation and responsiveness of local governing bodies.</p>
            )}
          </div>
        </Card>

        <div className="text-center">
          <h2>Need Further Assistance?</h2>
          <p>If you have any other concerns, questions, or need further assistance, please feel free to reach out to our team at <a href="mailto:group3communityalert@gmail.com">group3communityalert@gmail.com
          </a>. We're here to help!</p>
        </div>
      </div>
    </Container>
  );
};

export default HelpPage;
