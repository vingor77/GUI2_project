import React, { useEffect, useState, useContext } from "react";
import DataContext from "../contexts/DataContext";
import MapContext from "../contexts/MapContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../index";
import { updateDoc, setDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../index";
import "../style/Button.css";
import "../style/Hover.css";
const ReportsPage = ({ user }) => {
  const data = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterTypeTitle, setFilterTypeTitle] = useState("");
  const [filterTypeLocality, setFilterTypeLocality] = useState("");
  const [filterTypeType, setFilterTypeType] = useState("");
  const {
    mapData,
    setMapData,
    setCenter,
    selectedLocation,
    setSelectedLocation,
    details,
    setDetails,
    showDetails,
    setShowDetails,
  } = useContext(MapContext);
  const [geocodedAddress, setGeocodedAddress] = useState("");

  useEffect(() => {
    let type = data.filter((alert) => alert.AlertType === "Report");

    if (filterTypeLocality) {
      type = type.filter((item) =>
        item.Locality.toLowerCase().includes(filterTypeLocality.toLowerCase())
      );
    }
    if (filterTypeTitle) {
      type = type.filter((item) =>
        item.Title.toLowerCase().includes(filterTypeTitle.toLowerCase())
      );
    }
    if (filterTypeType) {
      type = type.filter((item) => item.ReportType === filterTypeType);
    }

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

    if (JSON.stringify(mapData) !== JSON.stringify(newMarkers)) {
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
      //console.log(JSON.stringify(user));
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

  const GeocodeAddress = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${filteredData[
        details
      ].Location.latitude.toFixed(3)},${filteredData[
        details
      ].Location.longitude.toFixed(
        3
      )}&key=AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0`
    )
      .then((response) => response.json())
      .then((data) => {
        setGeocodedAddress(data.results[0].formatted_address);
      });

    return geocodedAddress;
  };

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
            <strong>Address:</strong> <GeocodeAddress />
          </p>
          <p className="paragraph">
            <strong>Latitude/Longitude: </strong>
            {filteredData[details].Location.latitude.toFixed(3)}
            {", "}
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
                <option value="Oil Spills">Oil Spills</option>
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
          </div>
        )}

        {filteredData.map(
          (
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
              <p className="paragraph">
                <strong>Issue Type:</strong> {item.ReportType}
              </p>
              <p className="paragraph">
                <strong>City/Town:</strong>{" "}
                {item.Locality ? item.Locality : "None"}
              </p>
            </div>
          )
        )}
      </div>
    );
  }
};

export default ReportsPage;
