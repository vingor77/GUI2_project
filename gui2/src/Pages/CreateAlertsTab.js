// <<<<<<< HEAD
// import React from "react";
// import Dropdown from "react-bootstrap/Dropdown";
// import { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// const CreateAlertsTab = () => {
//   const [dropDownAlert, setDropDownAlert] = useState("Select Alert");
//   const [dropDownReport, setDropDownReport] = useState("Select Report");
//   // Change dropdown's name to the one selected
//   function onClick(name) {
//     setDropDownAlert(name);
//   }
//   function onClickReport(name) {
//     setDropDownReport(name);
//   }
// =======

import React from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../index";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const CreateAlertsTab = () => {
  // const alertCol = collection(db, `Alerts`);
  // const alertDoc = doc(db, `Alerts/ok`);
  // const handleCreateAlert = async () => {
  //   try {
  //     await addDoc(alertCol, { Type: 'Test' });
  //     console.log('Document added successfully');
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //   }
  // };

  const [dropDownAlert, setDropDownAlert] = useState("Select Alert");
  const [dropDownReport, setDropDownReport] = useState("Select Report");
  // Change dropdown's name to the one selected
  function onClick(name) {
    setDropDownAlert(name);
  }
  function onClickReport(name) {
    setDropDownReport(name);
  }

  const inputStyle = {
    marginTop: "10px",
  };

  const ReportOption = () => (
    <>
      <h6>Select Report Type</h6>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {dropDownReport}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onClickReport("Potholes")}>
            Potholes
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onClickReport("Oil Spills")}>
            Oil Spills
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onClickReport("Roadkill")}>
            Roadkill
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onClickReport("Illegal Parking")}>
            Illegal Parking
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onClickReport("Others")}>
            Others
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
  return (
    <div className="row">
      {/* Alert type dropdown */}
      <h6>Select Alert Type</h6>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {dropDownAlert}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onClick("Report")}>
            Report
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onClick("Event")}>Event</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Only shows if user selects report  */}
      {dropDownAlert === "Report" ? <ReportOption /> : null}

      {/* Alert title */}
      <Form.Control
        style={inputStyle}
        size="lg"
        type="text"
        placeholder="Enter Title"
      />
      {/* Alert location */}
      <Form.Control
        style={inputStyle}
        type="text"
        placeholder="Enter Location"
      />

      {/* Description */}
      <Form>
        <Form.Group
          style={inputStyle}
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            as="textarea"
            style={{ maxHeight: "100px" }}
            rows={3}
            placeholder="Enter Description"
          />
        </Form.Group>
      </Form>

      {/* Image upload */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      {/* Submit button */}
      <Button className="offset-lg-4 offset-5 col-lg-3 col-3" variant="dark">
        Submit
      </Button>
    </div>
  );
};
// >>>>>>> ben

//   const inputStyle = {
//     marginTop: "10px",
//   };

//   const ReportOption = () => (
//     <>
//       <h6>Select Report Type</h6>
//       <Dropdown>
//         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//           {dropDownReport}
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           <Dropdown.Item onClick={() => onClickReport("Potholes")}>
//             Potholes
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => onClickReport("Oil Spills")}>
//             Oil Spills
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => onClickReport("Roadkill")}>
//             Roadkill
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => onClickReport("Illegal Parking")}>
//             Illegal Parking
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => onClickReport("Others")}>
//             Others
//           </Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </>
//   );
//   return (
//     <div className="row">
//       {/* Alert type dropdown */}
//       <h6>Select Alert Type</h6>
//       <Dropdown>
//         <Dropdown.Toggle variant="primary" id="dropdown-basic">
//           {dropDownAlert}
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           <Dropdown.Item onClick={() => onClick("Report")}>
//             Report
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => onClick("Event")}>Event</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>

//       {/* Only shows if user selects report  */}
//       {dropDownAlert === "Report" ? <ReportOption /> : null}

//       {/* Alert title */}
//       <Form.Control
//         style={inputStyle}
//         size="lg"
//         type="text"
//         placeholder="Enter Title"
//       />
//       {/* Alert location */}
//       <Form.Control
//         style={inputStyle}
//         type="text"
//         placeholder="Enter Location"
//       />

//       {/* Description */}
//       <Form>
//         <Form.Group
//           style={inputStyle}
//           className="mb-3"
//           controlId="exampleForm.ControlTextarea1"
//         >
//           <Form.Control
//             as="textarea"
//             style={{ maxHeight: "300px" }}
//             rows={3}
//             placeholder="Enter Description"
//           />
//         </Form.Group>
//       </Form>

//       {/* Image upload */}
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Label>Upload Image</Form.Label>
//         <Form.Control type="file" />
//       </Form.Group>

//       {/* Submit button */}
//       <Button className="offset-lg-4 offset-5 col-lg-3 col-3" variant="dark">
//         Submit
//       </Button>
//     </div>
//   );
// };

export default CreateAlertsTab;
