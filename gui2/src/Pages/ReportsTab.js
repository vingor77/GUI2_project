import React, { useEffect, useState, useContext } from "react";
import DataContext from "../contexts/DataContext";
import BookmarkContext from "../contexts/BookmarkContext";
import MapContext from "../contexts/MapContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../index";
import {
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../index";
import OuterTab from "../components/OuterTab";
import ReactDOM from "react-dom";
import "../style/Button.css";
import "../style/Hover.css";
const ReportsPage = ({ user }) => {
  const data = useContext(DataContext);
  const bookdata = useContext(BookmarkContext);
  const [filteredData, setFilteredData] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  // const [showDetails, setShowDetails] = useState(false);
  // const [details, setDetails] = useState(0);
  // const [divClicked, setDivClicked] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  //const [filterTypeDate, setFilterTypeDate] = useState("");
  const [filterTypeTitle, setFilterTypeTitle] = useState("");
  const [filterTypeLocality, setFilterTypeLocality] = useState(""); // initial value
  const [filterTypeType, setFilterTypeType] = useState("");
  const {
    mapData,
    setMapData,
    setCenter,
    selectedLocation,
    setSelectedLocation,
    isCloseClicked,
    setIsCloseClicked,
    details,
    setDetails,
    showDetails,
    setShowDetails,
  } = useContext(MapContext);
  useEffect(() => {
    let type = data.filter((alert) => alert.AlertType === "Report");

    //

    if (filterTypeLocality) {
      // alert("!!!");
      type = type.filter((item) => item.Locality === filterTypeLocality);
    }
    if (filterTypeTitle) {
      //alert("!!!");
      type = type.filter((item) =>
        item.Title.toLowerCase().includes(filterTypeType.toLowerCase())
      );
    }
    if (filterTypeType) {
      //alert("!!!");
      type = type.filter((item) => item.Title === filterTypeType);
    }

    //
    setFilteredData(type);
    setInitialized(true);
    setDetails(-1);
    const newMarkers = type
      .filter(
        (item) =>
          item &&
          item.Location &&
          item.Location.latitude &&
          item.Location.longitude &&
          item.ReportType &&
          item.Title
      )
      .map((item, index) => ({
        lat: item.Location.latitude,
        lng: item.Location.longitude,
        id: index,
        type: item.ReportType,
        title: item.Title,
      }));
    //console.log("MD: " + JSON.stringify(mapData));
    //console.log("NM: " + JSON.stringify(newMarkers));

    if (JSON.stringify(mapData) !== JSON.stringify(newMarkers)) {
      //console.log("CC");
      setMapData(newMarkers);
    }

    const getImageURLs = async () => {
      const urls = {};

      for (let item of type) {
        if (item.Image && item.Image !== "No image") {
          const url = await getDownloadURL(ref(storage, item.Image));
          urls[item.Image] = url;
        }
      }

      setImageURLs(urls);
    };

    getImageURLs();
    setSelectedLocation(null);
  }, [data, setMapData, filterTypeLocality, filterTypeType, filterTypeTitle]);
  const handleCrazy = (item, index) => {
    // setCenter({
    //   lat: item.Location.latitude,
    //   lng: item.Location.longitude,
    // });
    // const marker = mapData.find(
    //   (m) =>
    //     m.title === item.Title &&
    //     m.lat === item.Location.latitude &&
    //     m.lng === item.Location.longitude
    // );
    // if (marker) {
    //   setSelectedLocation(marker);
    // }
    setUpdateTrigger(updateTrigger + 1);
    setDetails(index);
  };
  useEffect(() => {
    if (selectedLocation) {
      setShowDetails(true);
    }
  }, [updateTrigger]);
  const handleBookmark = async (event, item) => {
    event.stopPropagation();
    let userId = "ERROR";
    if (user && user.auth && user.auth.currentUser) {
      userId = user.auth.currentUser.uid;
    } else {
      console.log(JSON.stringify(user));
    }
    const docRef = doc(db, "Bookmarks", `${userId}`);
    await setDoc(
      docRef,
      {
        Bookmarks: arrayUnion({ id: item.id, Title: item.Title }),
      },
      { merge: true }
    );
  };
  const handleUnBookmark = async (event, item) => {
    event.stopPropagation();
    let userId = "ERROR";
    if (user && user.auth && user.auth.currentUser) {
      userId = user.auth.currentUser.uid;
    } else {
      console.log(JSON.stringify(user));
    }
    const docRef = doc(db, "Bookmarks", `${userId}`);
    await updateDoc(docRef, {
      Bookmarks: arrayRemove({ id: item.id, Title: item.Title }),
    });
  };
  const handleResolve = async (event, item) => {
    const docRef = doc(db, "Alerts", `${item.id}`);
    await updateDoc(docRef, {
      Archived: true,
    });
  };
  const handleUnResolve = async (event, item) => {
    const docRef = doc(db, "Alerts", `${item.id}`);
    await updateDoc(docRef, {
      Archived: false,
    });
  };
  //   const returnAddressOrCoords = async (geo) => {
  //     if(!geo || !geo.latitude || !geo.longitude) {
  //       return "Secret location";
  //     }
  //     try {
  //       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.latitude},${geo.longitude}&key=AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0`);
  //       const data = await response.json();

  //       // check if full address is available
  //       let fullAddress = null;
  //       if (data.results && data.results[0] && data.results[0].formatted_address) {
  //         fullAddress = data.results[0].formatted_address;
  //       }
  //       if (fullAddress) {
  //         return fullAddress;
  //       } else {
  //           // if no locality, default to coordinates
  //           return `Lat: ${geo.latitude}, Lng: ${geo.longitude}`;
  //       }
  //     } catch (error) {
  //       return "Secret location";
  //     }
  // };

  // };

  if (showDetails && initialized && details !== -1) {
    return (
      <div
        style={{
          width: "100%",
          background: "#E4E3D9",
          position: "relative",
          height: "100%",
          overflow: "scroll",
          overflowX: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <button
          className="button"
          style={{ padding: "5px", marginTop: "10px", marginLeft: "4%" }}
          onClick={(event) => {
            setShowDetails(false);
          }}
        >
          {" "}
          &larr; Return to list
        </button>
        <div
          style={{
            margin: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: filteredData[details].Archived
              ? "rgba(0, 255, 0, 0.4)"
              : "#FF7F7F",
          }}
        >
          {filteredData[details].Archived && (
            <p>
              <strong>MARKED AS RESOLVED</strong>
            </p>
          )}
          <h2>{filteredData[details].Title}</h2>

          {filteredData[details].Image && (
            <img
              src={imageURLs[filteredData[details].Image]}
              alt={
                filteredData[details].Image === "No image"
                  ? filteredData[details].Image
                  : filteredData[details].Title
              }
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <p className="paragraph">
            <strong>Issue Type:</strong> {filteredData[details].ReportType}
          </p>
          <p className="paragraph">
            <strong>Location:</strong>{" "}
            {filteredData[details].Location.latitude.toFixed(3)}{" "}
            {filteredData[details].Location.longitude.toFixed(3)}
          </p>
          <p className="paragraph">
            <strong>Description:</strong> {filteredData[details].Description}
          </p>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnBookmark(event, filteredData[details])}
          >
            Unbookmark
          </button>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleBookmark(event, filteredData[details])}
          >
            Bookmark
          </button>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleResolve(event, filteredData[details])}
          >
            Mark as Resolved
          </button>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnResolve(event, filteredData[details])}
          >
            Mark as Unresolved
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          background: "#E4E3D9",
          position: "relative",
          height: "100%",
          overflow: "scroll",
          overflowX: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <button
          className="button"
          style={{ padding: "5px", marginTop: "10px", marginLeft: "3%" }}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter Results
        </button>
        <button
          className="button"
          style={{ padding: "5px", marginTop: "10px", marginLeft: "2%" }}
          onClick={() => {
            setFilterTypeLocality("");
            setFilterTypeType("");
            setFilterTypeTitle("");
          }}
        >
          Clear Filters
        </button>

        {showFilter && (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              margin: "10px 0",
            }}
          >
            <label style={{ margin: "2px", padding: "2px" }}>
              City/Town:{" "}
              <input
                style={{ width: "60%", padding: "2px" }}
                type="text"
                value={filterTypeLocality}
                onChange={(e) => setFilterTypeLocality(e.target.value)}
                placeholder="'Boston', 'Lowell', etc"
              />
            </label>
            <label style={{ margin: "2px", padding: "2px" }}>
              Type:{" "}
              <select
                value={filterTypeType}
                onChange={(e) => setFilterTypeType(e.target.value)}
              >
                <option value="">All</option>
                <option value="Potholes">Potholes</option>
                <option value="Oil Spills">"Oil Spills</option>
                <option value="Roadkill">Roadkill</option>
                <option value="Illegal Parking">Illegal Parking</option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label style={{ margin: "2px", padding: "2px" }}>
              Title (keyword):{" "}
              <input
                style={{ width: "58%", padding: "2px" }}
                type="text"
                value={filterTypeTitle}
                onChange={(e) => setFilterTypeTitle(e.target.value)}
                placeholder="'Dangerous', 'Huge pothole', etc"
              />
            </label>
            {/* <label style={{ margin: "2px", padding: "2px" }}>
              Date:{" "}
              <select
                value={filterTypeDate}
                onChange={(e) => setFilterTypeDate(e.target.value)}
              >
                <option value="">All</option>
                <option value="pas">Past</option>
                <option value="tod">Today</option>
                <option value="thi">This Week</option>
                <option value="nex">After 1 week</option>
              </select>
            </label>
            <label style={{ margin: "2px", padding: "2px" }}>
              Time:{" "}
              <select
                value={filterTypeTime}
                onChange={(e) => setFilterTypeTime(e.target.value)}
              >
                <option value="">All</option>

                <option value="mor">Morning (12:00 - 9:00)</option>
                <option value="day">Day (9:00 - 16:00)</option>
                <option value="eve">Evening (16:00 - 23:59)</option>
              </select>
          </label>*/}
          </div>
        )}

        {filteredData.map((
          item,
          index /* something to note: when the width is about 420-999px, the tabs are wider than page*/
        ) => (
          <div
            className="hoverDarken"
            key={index}
            style={{
              margin: "20px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: item.Archived
                ? "rgba(0, 255, 0, 0.4)"
                : "#FF7F7F",
              cursor: "pointer",
            }}
            onClick={() => {
              setCenter({
                lat: item.Location.latitude,
                lng: item.Location.longitude,
              });
              const marker = mapData.find(
                (m) =>
                  m.title === item.Title &&
                  m.lat === item.Location.latitude &&
                  m.lng === item.Location.longitude
              );
              if (marker) {
                setSelectedLocation(marker);
              }
              handleCrazy(item, index);
              // setDetails(index);
              // setShowDetails(true);
            }}
          >
            {item.Archived && (
              <p>
                <strong>MARKED AS RESOLVED</strong>
              </p>
            )}
            {item.Image && item.Image !== "No image" && (
              <img
                src={imageURLs[item.Image]}
                alt={item.Image === "No image" ? item.Image : item.Title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}
            <h2>{item.Title}</h2>
            {/* <p className="paragraph">
              <strong>Alert Type:</strong> {item.AlertType}
            </p> */}
            <p className="paragraph">
              <strong>Issue Type:</strong> {item.ReportType}
            </p>
            <p className="paragraph">
              <strong>City/Town:</strong>{" "}
              {item.Locality ? item.Locality : "None"}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default ReportsPage;
