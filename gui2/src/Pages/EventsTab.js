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

const EventsPage = ({ user }) => {
  const data = useContext(DataContext);
  const bookdata = useContext(BookmarkContext);
  const [filteredData, setFilteredData] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  // const [divClicked, setDivClicked] = useState(false);
  const {
    mapData,
    setMapData,
    setCenter,
    selectedLocation,
    setSelectedLocation,
  } = useContext(MapContext);
  useEffect(() => {
    const type = data.filter((alert) => alert.AlertType === "Event");
    setFilteredData(type);
    const newMarkers = type
      .filter(
        (item) =>
          item &&
          item.Location &&
          item.Location.latitude &&
          item.Location.longitude &&
          item.AlertType &&
          item.Title
      )
      .map((item, index) => ({
        lat: item.Location.latitude,
        lng: item.Location.longitude,
        id: `marker${index}`,
        type: item.AlertType,
        title: item.Title,
      }));
    console.log("MD: " + JSON.stringify(mapData));
    console.log("NM: " + JSON.stringify(newMarkers));

    if (JSON.stringify(mapData) !== JSON.stringify(newMarkers)) {
      console.log("CC");
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
  }, [data, setMapData]);

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

  if (showDetails) {
    return (
      <>
        <button
          className="button"
          style={{ padding: "5px", margin: "2px" }}
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

          {/* <p>
          <strong>Report Type:</strong> {filteredData[details].ReportType}
        </p> */}
          <p>
            <strong>Location:</strong>{" "}
            {filteredData[details].Location.latitude.toFixed(3)}{" "}
            {filteredData[details].Location.longitude.toFixed(3)}
          </p>
          <p>
            <strong>Description:</strong> {filteredData[details].Description}
          </p>
        </div>
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
      </>
    );
  } else {
    return (
      // <>
      <div
        style={{
          width: "100%",
          background: "#E4E3D9",
          position: "relative",
          height: "100%",
          overflow: "scroll",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        {filteredData.map((
          item,
          index /* something to note: when the width is about 420-999px, the tabs are wider than page*/
        ) => (
          <div
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
            <p>
              <strong>Alert Type:</strong> {item.AlertType}
            </p>
            {/* <p>
              <strong>Report Type:</strong> {item.ReportType}
            </p> */}
            <p>
              <strong>City/Town:</strong>{" "}
              {item.Locality ? item.Locality : "None"}
            </p>
          </div>
        ))}
      </div>
      // </>
    );
  }
};

export default EventsPage;
