import React, { useEffect, useState, useContext } from "react";
import DataContext from "../contexts/DataContext";
import BookmarkContext from "../contexts/BookmarkContext";
import MapContext from "../contexts/MapContext";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../index'; 
import { updateDoc, setDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../index";
import OuterTab from "../components/OuterTab";
import ReactDOM from 'react-dom';

const ReportsPage = ({ user }) => {
  const data = useContext(DataContext);
  const bookdata = useContext(BookmarkContext);
  const [filteredData, setFilteredData] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(0);
 // const [divClicked, setDivClicked] = useState(false);
  const { mapData, setMapData } = useContext(MapContext);
  useEffect(() => {
    const type = data.filter((alert) => alert.AlertType === "Report");
    setFilteredData(type);
    const newMarkers = type
      .filter(
        (item) =>
          item &&
          item.Location &&
          item.Location.latitude &&
          item.Location.longitude &&
          item.ReportType &&
          item.Title,
      )
      .map((item, index) => ({
        lat: item.Location.latitude,
        lng: item.Location.longitude,
        id: `marker${index}`,
        type: item.ReportType,
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
}, [data]); 

const handleBookmark = async (event, item) => {
  event.stopPropagation();
  let userId = "ERROR";
    if (user && user.auth && user.auth.currentUser) {
      userId = user.auth.currentUser.uid;
  } else {
    console.log(JSON.stringify(user));
  }
  const docRef = doc(db, "Bookmarks", `${userId}`);
    await setDoc(docRef, {
      Bookmarks: arrayUnion({ id: item.id, Title: item.Title }),
    }, { merge: true });
  }
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
  const showReportDetails = (index) => {
    if(index === details) {
      if(showDetails) {
        setShowDetails(false);
      }
      else {
        setShowDetails(true);
      }
    }
    else if(!showDetails && index !== details) {
      setShowDetails(true);
    }
    setDetails(index);
  }

  if(showDetails) {
    return (
      <>
      <div style={{ maxHeight: "400px", overflow: "scroll" }}>
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
            }}
            onClick={() => showReportDetails(index)}
          >
            <h2>{item.Title}</h2>
            {/* <p>
              <strong>Alert Type:</strong> {item.AlertType}
            </p> */}
            <p>
              <strong>Report Type:</strong> {item.ReportType}
            </p>
            <p>
              <strong>City/Town:</strong> {item.Locality ? item.Locality : "None"}
            </p>
          </div>
        ))}
        {/* <MapDataContext.Provider value={[
          { lat: 48.8584, lng: 2.2945, id: 'marker1', type: "1Pothole" },
          { lat: 48.8500, lng: 2.3000, id: 'marker2', type: "2Pothole" }
        ]} /> */}
      </div>
      
      <div style={{
              margin: "20px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}>
              <h2>{filteredData[details].Title}</h2>

                      {filteredData[details].Image && (<img
          src={imageURLs[filteredData[details].Image]}
          alt={filteredData[details].Image === "No image" ? filteredData[details].Image : filteredData[details].Title}
          style={
            {
              width: '100%', height: '200px', objectFit: 'cover'
            }
          }
        />)}
        
        <p>
          <strong>Report Type:</strong> {filteredData[details].ReportType}
        </p>
        <p>
          <strong>Location:</strong>  {filteredData[details].Location.latitude.toFixed(3)} {filteredData[details].Location.longitude.toFixed(3)}
        </p>
        <p>
          <strong>Description:</strong> {filteredData[details].Description}
        </p>

        <button onClick={(event) => handleBookmark(event, filteredData[details])}>Bookmark</button>
      </div>
      </>
    );
  }
  else {
    return (
      <>
      <div style={{ maxHeight: "400px", overflow: "scroll" }}>
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
            }}
            onClick={() => showReportDetails(index)}
          >
            <h2>{item.Title}</h2>
            <p>
              <strong>Alert Type:</strong> {item.AlertType}
            </p>
            <p>
              <strong>Report Type:</strong> {item.ReportType}
            </p>
            <p>
            <strong>City/Town:</strong> {item.Locality ? item.Locality : "None"}
            </p>
          </div>
        ))}
      </div>
      </>
    );
  }
};

export default ReportsPage;