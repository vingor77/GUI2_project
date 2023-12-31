import React, { useState, useContext } from "react";
import BookmarkContext from "../contexts/BookmarkContext";
import { storage } from "../index";
import DataContext from "../contexts/DataContext";
import { getDownloadURL, ref } from "firebase/storage";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../index";
import "../style/Hover.css";
const BookmarksPage = ({ user }) => {
  const bookdata = useContext(BookmarkContext);
  const data = useContext(DataContext);

  const [booked, setBooked] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(0);
  if (!bookdata || !bookdata.Bookmarks | !bookdata.Bookmarks.length) {
    return <div>No bookmarks *yet*</div>;
  }
  const viewBookmark = (id) => {
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
            backgroundColor: booked[details].Archived
              ? "rgba(122, 122, 122, 0.4)"
              : "white",
          }}
        >
          {" "}
          {booked[details].Archived &&
            booked[details].AlertType === "Report" && (
              <p>
                <strong>MARKED AS RESOLVED</strong>
              </p>
            )}
          {booked[details].Archived &&
            booked[details].AlertType === "Event" && (
              <p>
                <strong>EVENT HAS ENDED</strong>
              </p>
            )}
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
          <h3>{booked[details].Title}</h3>
          <p className="paragraph">
            <strong>Alert Type:</strong>{" "}
            {booked[details].AlertType === "Report" ? "Issue" : "Event"}
          </p>
          {booked[details].ReportType === "Not specified" ? (
            ""
          ) : (
            <p className="paragraph">
              <strong>Issue Type: </strong>
              {booked[details].ReportType}
            </p>
          )}
          <p className="paragraph">
            <strong>City/Town:</strong> {booked[details].Locality}
          </p>
          <p className="paragraph">
            <strong>Description:</strong> {booked[details].Description}
          </p>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnBookmark(event, booked[details])}
          >
            Unbookmark
          </button>
          {/*Removed bookmark button while in bookmarks tab. Needs styling to center
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleBookmark(event, booked[details])}
          >
            Bookmark
          </button>
          */}
        </div>
        <div style={{ marginLeft: "4%" }}>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleResolve(event, booked[details])}
          >
            Mark as Resolved
          </button>
          <button
            className="button"
            style={{ padding: "5px", margin: "2px" }}
            onClick={(event) => handleUnResolve(event, booked[details])}
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
          maxHeight: "400px",
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
        {bookdata &&
          bookdata.Bookmarks &&
          bookdata.Bookmarks.map((item, index) => (
            <p
              className="hoverDarken"
              onClick={() => {
                viewBookmark(item.id);
              }}
              style={{
                margin: "20px",
                border: "2px solid #aaa",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
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
