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
  const [showFilter, setShowFilter] = useState(false);
  const [filterTypeDate, setFilterTypeDate] = useState("");
  const [filterTypeTime, setFilterTypeTime] = useState("");
  const [filterTypeLocality, setFilterTypeLocality] = useState(""); // initial value
  const [filterTypeTitle, setFilterTypeTitle] = useState("");
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
  const [geocodedAddress, setGeocodedAddress] = useState("");
  // useEffect(() => {
  //   setIsCloseClicked(false);
  // }, []);

  // useEffect(() => {
  //   let type = data.filter((alert) => alert.AlertType === "Event");
  //   setTData(type);
  // }, [data]);
  // useEffect(() => {
  //   if (tData === null) return;
  //   let type = tData;
  //   if (filterTypeLocality) {
  //     alert("!!!");
  //     type = tData.filter((item) => item.Locality === filterTypeLocality);
  //   }

  useEffect(() => {
    //setDetails(0);
    //setShowDetails(false);
    let type = data.filter((alert) => alert.AlertType === "Event");

    //

    if (filterTypeLocality) {
      // alert("!!!");
      type = type.filter((item) => 
        item.Locality.toLowerCase().includes(filterTypeLocality.toLowerCase())
      );
    }
    if (filterTypeTitle) {
      //alert("!!!");
      type = type.filter((item) =>
        item.Title.toLowerCase().includes(filterTypeTitle.toLowerCase())
      );
    }
    if (filterTypeTime) {
      //const currentTime = new Date().getHours();
      //const [hour, minute] = item.Time.split(":").map(Number);
      //const when = hour * 60 + minute;
      const mornin = 540;
      const dayt = 960;
      const evenin = 1440;
      switch (filterTypeTime) {
        case "mor":
          type = type.filter((item) => {
            const [hour, minute] = item.Time.split(":").map(Number);
            const when = hour * 60 + minute;
            return when <= mornin;
          });
          break;
        case "day":
          type = type.filter((item) => {
            const [hour, minute] = item.Time.split(":").map(Number);
            const when = hour * 60 + minute;
            return when > mornin && when <= dayt;
          });
          break;
        case "eve":
          type = type.filter((item) => {
            const [hour, minute] = item.Time.split(":").map(Number);
            const when = hour * 60 + minute;
            return when > dayt && when <= evenin;
          });
          break;
        default:
          break;
      }
    }
    if (filterTypeDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // to remove the time part

      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );

      const endOfWeek = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + 6
      );

      switch (filterTypeDate) {
        case "pas":
          type = type.filter((item) => {
            const [year, month, day] = item.Date.split("-").map(Number);
            const itemDate = new Date(year, month - 1, day);
            return itemDate < today;
          });
          break;
        case "tod":
          type = type.filter((item) => {
            const [year, month, day] = item.Date.split("-").map(Number);
            return (
              year === today.getFullYear() &&
              month === today.getMonth() + 1 && // Adjusted month comparison
              day === today.getDate()
            );
          });
          break;
        case "thi":
          type = type.filter((item) => {
            const [year, month, day] = item.Date.split("-").map(Number);
            const itemDate = new Date(year, month - 1, day);
            return itemDate >= startOfWeek && itemDate <= endOfWeek;
          });
          break;
        case "nex":
          type = type.filter((item) => {
            const [year, month, day] = item.Date.split("-").map(Number);
            const itemDate = new Date(year, month - 1, day);
            return itemDate > endOfWeek;
          });
          break;
        default:
          break;
      }
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
  }, [
    data,
    setMapData,
    filterTypeLocality,
    filterTypeTitle,
    filterTypeDate,
    filterTypeTime,
  ]);

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
  const GetTime = () => {
    const tempTime = timeStringToFloat(filteredData[details].Time);
    console.log(tempTime);
    const hours = tempTime.toFixed(2).split(".");
    const minutes = tempTime.toFixed(2).split(".");
    const mins = ((minutes[1] / 100) * 60).toFixed(0);
    let hour = hours[0];
    if(hours[0] > 12) {
      hour = hours[0] - 12;
    }

    if(tempTime < 12.00) {
      return hours[0] + ":" + mins + " AM";
    }
    else {
      return hour + ":" + mins + " PM";
    }
  }

  function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  const GetDate = () => {
    const dates = filteredData[details].Date.split("-");
    
    //Year month day
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[parseInt(dates[1]) - 1];
    
    return month + " " + parseInt(dates[2]) + ", " + dates[0];
  }

  const GeocodeAddress = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${filteredData[details].Location.latitude.toFixed(3)},${filteredData[details].Location.longitude.toFixed(3)}&key=AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0`)
    .then(response => response.json())
    .then(data => {
      setGeocodedAddress(data.results[0].formatted_address);
    })

    return geocodedAddress;
  }
  

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
          <h3>{filteredData[details].Title}</h3>
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
            <strong>Address:</strong>{" "} <GeocodeAddress />
          </p>
          <p className="paragraph">
            <strong>Latitude/Longitude: </strong>
            {filteredData[details].Location.latitude.toFixed(3)}{", "}
            {filteredData[details].Location.longitude.toFixed(3)}
          </p>
          <p className="paragraph">
            <strong>Description:</strong> {filteredData[details].Description}
          </p>
          <p className="paragraph">
            <strong>Time:</strong> <GetTime />
          </p>
          <p className="paragraph">
            <strong>Date:</strong> <GetDate />
          </p>
        </div>
        <div style={{ marginLeft: "4%" }}>
          {/*
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnBookmark(event, filteredData[details])}
          >
            Unbookmark
          </button>
          */}
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
            setFilterTypeTitle("");
            setFilterTypeDate("");
            setFilterTypeTime("");
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
              Title (keyword):{" "}
              <input
                style={{ width: "58%", padding: "2px" }}
                type="text"
                value={filterTypeTitle}
                onChange={(e) => setFilterTypeTitle(e.target.value)}
                placeholder="'Food Drive', 'Free', etc"
              />
            </label>
            <label style={{ margin: "2px", padding: "2px" }}>
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
            </label>
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
            <h3>{item.Title}</h3>
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
