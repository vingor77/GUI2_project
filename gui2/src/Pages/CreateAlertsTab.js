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
  const [title, setTitle] = useState("");
  //const [loc, setLoc] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState(null);
  const [showMap, setShowMap] = useState(false);
  let loc = null;
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

  //let loc;
  //useEffect(() => {
  //console.log(data);
  //console.log(latitude);

  loc = new GeoPoint(latitude, longitude);
  console.log("loc: " + loc.latitude);

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
  const stylesModal = {
    overlay: {
      // height: "90%",
      zIndex: 5,
    },
  };
  const inputStyle = {
    marginTop: "10px",
  };
  const handleCreateAlert = async (e) => {
    //e.preventDefault(); // Prevent the form from reloading the page

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
    if (!description) {
      alert("Please fill out description.");
      return;
    }

    // Then, add the report data to Firestore
    const timestamp = Date.now();

    try {
      const storageRef = ref(storage, `images/${file.name}_${timestamp}`);
      await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");
    } catch (error) {
      //console.error("Error uploading file: ", error);
      // Handle any additional error response here, if needed
    }
    const docRef = doc(collection(db, "Alerts"));
    //const processLocation = (locationString) => {
    //if locstring is address, convert to address,

    //return loc;
    //};

    // Call the function and store the result
    //const processedLocation = processLocation(location);
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
      //AuthorID: user.uid, // Assuming `user` contains the current user's data
      Time: new Date(), // Current time
    });

    console.log("Document added successfully");
  };
  // const formatCoordinates = (lat, long) => {
  //   let latitude = lat;
  //   let longitude = long;
  //   let latSuffix = 'N';
  //   let longSuffix = 'E';

  //   if (lat < 0) {
  //     latitude = -lat;
  //     latSuffix = 'S';
  //   }

  //   if (long < 0) {
  //     longitude = -long;
  //     longSuffix = 'W';
  //   }

  //   return `${latitude}${latSuffix} ${longitude}${longSuffix}`;
  //};
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

  const bodyStyle = {
    width: "100%",
    background: "#E4E3D9",
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
    <div className="row" style={bodyStyle}>
      {/* Alert type dropdown */}
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
        style={inputStyle}
        size="lg" //I think this may be making it too big
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
            marginLeft: "5px",
            marginTop: "5px",
            padding: "5px",
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
          {/* <button style={customStyles.closeButton} onClick={closeModal}>Close</button> */}
        </Modal>
      </div>
      {/* { loc && loc.latitude && loc.longitude && loc.latitude > 0 && loc.longitude > 0 ? <div>Location: {formatCoordinates(loc.latitude, loc.longitude)}</div> : null } */}
      {locality ? <div>City/Town: {locality}</div> : null}

      {/* <Form.Control   //TODO: Make this a non-input that shows location
        style={inputStyle}
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      /> */}

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
