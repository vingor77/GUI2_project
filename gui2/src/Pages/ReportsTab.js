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
 // const [divClicked, setDivClicked] = useState(false);
 const [activeItem, setActiveItem] = useState(null);
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
          item.ReportType
      )
      .map((item, index) => ({
        lat: item.Location.latitude,
        lng: item.Location.longitude,
        id: `marker${index}`,
        type: item.ReportType,
      }));

    console.log("MD: " + JSON.stringify(mapData));
    console.log("NM: " + JSON.stringify(newMarkers));

    if (JSON.stringify(mapData) != JSON.stringify(newMarkers)) {
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
const handleDivClick = (item) => {
  console.log("clicked");
 // setDivClicked(true);
 setActiveItem(item);
}
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
  return (
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
          onClick={() => handleDivClick(item)}
          >
          <h2>{item.Title}</h2>
          {item.Image && (<img
            src={imageURLs[item.Image]}
            alt={item.Image === "No image" ? item.Image : item.Title}
            style={
              {
                width: '100%', height: '200px', objectFit: 'cover'
              }
            }
          />)}
          <p>
            <strong>Alert Type:</strong> {item.AlertType}
          </p>
          <p>
            <strong>Report Type:</strong> {item.ReportType}
          </p>
          <p>
            <strong>Description:</strong> {item.Description}
          </p>
          <p>
            <strong>Address:</strong> {item.Address}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {item.Time ? item.Time.toDate().toISOString() : "N/A"}
          </p>
          <p>
            <strong>Author ID:</strong> {item.AuthorID}
          </p>
          <button onClick={(event) => handleBookmark(event, item)}>Bookmark</button>
        </div>
      )
    )
  }
  {activeItem && ReactDOM.createPortal(
   <OuterTab 
    tabTitle="Details" 
    set={setActiveItem} 
    user={user} 
    item={activeItem}
    />,
   document.body
   )}
    </div>
  );
};

export default ReportsPage;
