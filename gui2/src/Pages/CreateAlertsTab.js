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
const CreateAlertsTab = ({ user }) => {
  const [dropDownAlert, setDropDownAlert] = useState("Select Alert");
  const [dropDownReport, setDropDownReport] = useState("Not specified");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let loc = null;
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
        lat: 1.1,
        lng: 1.1,
      };
    }
    setLatitude(data.lat);
    setLongitude(data.lng);
    console.log(data);
    closeModal();
    if (data.lat && data.lng) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0`
      )
        .then((response) => response.json())
        .then((data) => {
          const localityObj = data.results[0].address_components.find((item) =>
            item.types.includes("locality")
          );
          if (localityObj) {
            setLocality(localityObj.long_name);
          } else {
            setLocality(null);
          }
        })
        .catch((error) => setLocality(null));
    }
  };

  loc = new GeoPoint(latitude, longitude);
  console.log("loc: " + loc.latitude);

  const customStyles = {
    content: {
      top: "50%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "80%",
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
  const stylesModal = {
    overlay: {
      zIndex: 5,
    },
  };
  const inputStyle = {
    marginTop: "5px",
  };
  const handleCreateAlert = async (e) => {
    if (dropDownAlert === "Select Alert") {
      alert("Please select an Alert type.");
      return;
    }
    if (dropDownAlert === "Report" && dropDownReport === "Not specified") {
      alert("Please specify a report type.");
      return;
    }
    if (!title) {
      alert("Please fill out title.");
      return;
    }
    if (!loc) {
      alert("Please select and save a location.");
      return;
    }
    if (dropDownAlert === "Event" && (time === "" || date === "")) {
      alert("Please specify a date and time.");
      return;
    }
    if (!description) {
      alert("Please fill out description.");
      return;
    }
    const timestamp = Date.now();

    try {
      const storageRef = ref(storage, `images/${file.name}_${timestamp}`);
      await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");
    } catch (error) {
      //console.error("Error uploading file: ", error);
    }
    const docRef = doc(collection(db, "Alerts"));
    // Call the function and store the result
    let tOrF = false;
    await setDoc(docRef, {
      Title: title,
      Location: loc,
      Locality: locality,
      Description: description,
      ReportType: dropDownReport,
      AlertType: dropDownAlert,
      Archived: tOrF,
      Image: file ? `images/${file.name}_${timestamp}` : "No image",
      Posted: new Date(), // Current time
      Date: date,
      Time: time,
    });
    setDropDownAlert("Select Alert");
    setDropDownReport("Not specified");
    setDate("");
    setTime("");
    setTitle("");
    setDescription("");
    setLocality(null);
    setLatitude("");
    setLongitude("");
    setFile(null);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
    console.log("Document added successfully");
  };

  const ReportOption = () => (
    <>
      <h6>Select Issue Type</h6>
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
  let submissionMessage;
  if (submitted) {
    submissionMessage = (
      <div style={{ color: "white", textAlign: "center", margin: "10px 0px" }}>
        Submitted!
      </div>
    );
  }
  const bodyStyle = {
    width: "100%",
    background: submitted ? "rgba(0, 255, 0, 0.4)" : "#E4E3D9",
    position: "relative",
    height: "100%",
    overflow: "scroll",
    overflowX: "hidden",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    padding: 0,
    margin: 0,
  };
  return (
    <div
      className="row"
      style={bodyStyle}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCreateAlert();
        }
      }}
    >
      {/* Alert type dropdown */}
      {submissionMessage}
      <h6>Select Alert Type</h6>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {dropDownAlert}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelectAlertType("Report")}>
            Issue
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
        style={{
          positon: "relative",
          margin: "auto",
          width: "94%",
          marginTop: "5px",
          borderRadius: "5px",
        }}
        size="md" //I think this may be making it too big
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Alert location */}
      <div>
        <button
          style={{
            marginTop: "5px",
            marginLeft: "0px",
            marginTop: "5px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={openModal}
        >
          Select Location
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{ ...customStyles, ...stylesModal }}
        >
          <PlaceMap onClose={handleMapData} />
        </Modal>
      </div>
      {locality ? <div>City/Town: {locality}</div> : null}
      {dropDownAlert === "Event" ? (
        <div>
          <label style={{ margin: "2px" }}>
            Date:{" "}
            <input
              style={{ margin: "2px" }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label style={{ margin: "2px" }}>
            Start Time:{" "}
            <input
              style={{ margin: "2px" }}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>
      ) : null}
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
      <Form.Group
        controlId="formFile"
        className="mb-3 inputStyle"
        style={{ position: "relative", top: "-10px" }}
      >
        <Form.Label className="inputStyle">Upload Image</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      {/* Submit button */}
      {submissionMessage}
      <Button
        className="offset-lg-4 offset-5 col-lg-3 col-3"
        style={{ position: "relative", top: "-10px" }}
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
