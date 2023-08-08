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
const EventsPage = ({ user }) => {
  const data = useContext(DataContext);
  const bookdata = useContext(BookmarkContext);
  const [filteredData, setFilteredData] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  //const [showDetails, setShowDetails] = useState(false);
  //const [details, setDetails] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  // const [divClicked, setDivClicked] = useState(false);
  const [initialized, setInitialized] = useState(false);
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
  // useEffect(() => {
  //   setIsCloseClicked(false);
  // }, []);
  useEffect(() => {
    //setDetails(0);
    //setShowDetails(false);
    const type = data.filter((alert) => alert.AlertType === "Event");
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
          item.AlertType &&
          item.Title
      )
      .map((item, index) => ({
        lat: item.Location.latitude,
        lng: item.Location.longitude,
        id: index,
        type: item.AlertType,
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
    // const bruh = selectedLocation;
    // console.log("bruh" + bruh);
    // setSelectedLocation(null); // *******
    // setShowDetails(false);
    // //setDetails(1);

    // if (bruh) {
    //   const matchedItem = data.find(
    //     (item) =>
    //       item.Title === bruh.title &&
    //       item.Location.latitude === bruh.lat &&
    //       item.Location.longitude === bruh.lng
    //   );
    //   console.log("Matched item:", matchedItem);
    // }

    setSelectedLocation(null);
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
    //console.log("Clickedd index:", index);

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

        {/* {console.log("detai: " + details)} */}
        <div
          style={{
            margin: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: filteredData[details].Archived
              ? "rgba(122, 122, 122, 0.4)"
              : "white",
          }}
        >
          {filteredData[details].Archived && (
            <p>
              <strong>EVENT HAS ENDED</strong>
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
            Mark as ended
          </button>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnResolve(event, filteredData[details])}
          >
            Mark upcoming
          </button>
        </div>
      </div>
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
          overflowX: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
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
                ? "rgba(122, 122, 122, 0.4)"
                : "white",
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
              //console.log("Clickedd index:", index);
              handleCrazy(item, index);
              // setDetails(index);
              // setShowDetails(true);
            }}
          >
            {item.Archived && (
              <p>
                <strong>EVENT HAS ENDED</strong>
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
            {/* <p>
              <strong>Report Type:</strong> {item.ReportType}
            </p> */}
            <p className="paragraph">
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
