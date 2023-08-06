import React, { useEffect, useState, useContext } from "react";
import BookmarkContext from "../contexts/BookmarkContext";
import { storage } from "../index";
import DataContext from "../contexts/DataContext";
import { getDownloadURL, ref } from "firebase/storage";
const BookmarksPage = ({ user }) => {
  const bookdata = useContext(BookmarkContext);
  const data = useContext(DataContext);

  const [booked, setBooked] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  //const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(0);
  if (!bookdata) {
    return <div>No bookmarks *yet*</div>;
  }
  const viewBookmark = (id) => {
    //console.log(id);
    //alert("You selected to view the document with id " + id);
    setShowDetails(true);
    const booked = data.filter((alert) => alert.id === id);
    setBooked(booked);

    const getImageURLs = async () => {
      const urls = {};

      for (let item of booked) {
        if (item.Image && item.Image !== "No image") {
          const url = await getDownloadURL(ref(storage, item.Image));
          urls[item.Image] = url;
        }
      }

      setImageURLs(urls);
    };

    getImageURLs();
  };

  const handleUnBookmark = async (event, item) => {
    // event.stopPropagation();
    // let userId = "ERROR";
    //   if (user && user.auth && user.auth.currentUser) {
    //     userId = user.auth.currentUser.uid;
    // } else {
    //   console.log(JSON.stringify(user));
    // }
    // const docRef = doc(db, "Bookmarks", `${userId}`);
    //   await setDoc(docRef, {
    //     Bookmarks: arrayUnion({ id: item.id, Title: item.Title }),
    //   }, { merge: true });
  };

  // const showReportDetails = (index) => {
  //   if(index === details) {
  //     if(showDetails) {
  //       setShowDetails(false);
  //     }
  //     else {
  //       setShowDetails(true);
  //     }
  //   }
  //   else if(!showDetails && index !== details) {
  //     setShowDetails(true);
  //   }
  //   setDetails(index);
  // }

  if (showDetails) {
    return (
      <>
        <div style={{ maxHeight: "400px", overflow: "scroll" }}>
          {bookdata &&
            bookdata.Bookmarks &&
            bookdata.Bookmarks.map((item, index) => (
              <p
                onClick={() => {
                  viewBookmark(item.id);
                }}
                style={{
                  margin: "20px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                key={index}
              >
                {item.Title}
              </p>
            ))}
        </div>
        <div
          style={{
            margin: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {booked[details].Image && (
            <img
              src={imageURLs[booked[details].Image]}
              alt={
                booked[details].Image === "No image"
                  ? booked[details].Image
                  : booked[details].Title
              }
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }} //TODO: UPDATE MAP MARKERS
            />
          )}
          <h2>{booked[details].Title}</h2>
          <p>
            <strong>Report Type:</strong> {booked[details].ReportType}
          </p>
          <p>
            <strong>City/Town:</strong> {booked[details].Locality}
          </p>
          <p>
            <strong>Description:</strong> {booked[details].Description}
          </p>

          {/* TODO: <button onClick={(event) => handleUnBookmark(event, booked[details])}>Delete Bookmark</button> */}
        </div>
      </>
    );
  } else {
    return (
      <div style={{ maxHeight: "400px", overflow: "scroll" }}>
        {bookdata &&
          bookdata.Bookmarks &&
          bookdata.Bookmarks.map((item, index) => (
            <p
              onClick={() => {
                viewBookmark(item.id);
              }}
              style={{
                margin: "20px",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
              key={index}
            >
              {item.Title}
            </p>
          ))}
      </div>
    );
  }
};

export default BookmarksPage;
