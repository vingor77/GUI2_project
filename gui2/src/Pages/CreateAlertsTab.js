// CreateAlertsTab.js
import React, { useState, useEffect } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../index";
import { ref, uploadBytes } from "firebase/storage";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GeoPoint } from "firebase/firestore";
import PlaceMap from "../components/PlaceMap";
import Modal from "react-modal";
Modal.setAppElement("#root");
const CreateAlertsTab = () => {
  const [dropDownAlert, setDropDownAlert] = useState("Select Alert");
  const [dropDownReport, setDropDownReport] = useState("Select Report");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [showMap, setShowMap] = useState(false);
  //const [loc, setLoc] = useState(null);
  // const [reportType, setReportType] = useState("");
  // const [alertType, setAlertType] = useState("");
  // const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  // Change dropdown's name to the one selected
  const handleSelectAlertType = (type) => {
    setDropDownAlert(type); // Using the state updater function from useState
  };
  function onClickReport(name) {
    setDropDownReport(name);
  }
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMapData = (data) => {
    if (!data || !data.lat || !data.lng) {
      // if this code executes from lack of point selection, it will default to 1, 1
      data = {
        lat: 1,
        lng: 1,
      };
    }
    setLatitude(data.lat);
    setLongitude(data.lng);
    console.log(data);
    closeModal();
  };

  //let loc;
  //useEffect(() => {
  //console.log(data);
  //console.log(latitude);
  let loc = new GeoPoint(latitude, longitude);
  console.log("loc: " + loc);
  //}, [latitude, longitude]);
  const customStyles = {
    content: {
      top: "50%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%", // Set here the width you want
      height: "80%", // And here the height
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#ff0000",
      color: "white",
      fontSize: "1.2em",
      border: "none",
    },
  };

  const inputStyle = {
    marginTop: "10px",
  };
  const handleCreateAlert = async (e) => {
    //e.preventDefault(); // Prevent the form from reloading the page
    if (
      !title ||
      !location ||
      !description ||
      dropDownAlert === "Select Alert" ||
      (dropDownAlert === "Report" && dropDownReport === "Select Report")
    ) {
      alert("Please fill out all required fields before submitting.");
      return;
    }
    // Then, add the report data to Firestore
    const timestamp = Date.now();

    try {
      const storageRef = ref(storage, `images/${file.name}_${timestamp}`);
      await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      // Handle any additional error response here, if needed
    }
    const docRef = doc(collection(db, "Alerts"));
    //const processLocation = (locationString) => {
    //if locstring is address, convert to address,

    //return loc;
    //};

    // Call the function and store the result
    //const processedLocation = processLocation(location);
    await setDoc(docRef, {
      Title: title,
      Location: loc,
      Description: description,
      ReportType: dropDownReport,
      AlertType: dropDownAlert,
      Image: file ? `images/${file.name}_${timestamp}` : "No image",
      //AuthorID: user.uid, // Assuming `user` contains the current user's data
      Time: new Date(), // Current time
    });

    console.log("Document added successfully");
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
          <Dropdown.Item onClick={() => handleSelectAlertType("Report")}>
            Report
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelectAlertType("Event")}>
            Event
          </Dropdown.Item>
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Alert location */}
      <div>
        <button onClick={openModal}>Show Map</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <PlaceMap onClose={handleMapData} />
          {/* <button style={customStyles.closeButton} onClick={closeModal}>Close</button> */}
        </Modal>
      </div>

      <Form.Control
        style={inputStyle}
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* Image upload */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      {/* Submit button */}
      <Button
        className="offset-lg-4 offset-5 col-lg-3 col-3"
        variant="dark"
        onClick={() => {
          handleCreateAlert();
        }}
      >
        Submit
      </Button>
    </div>
  );
};
export default CreateAlertsTab;
