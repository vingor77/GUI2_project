import React, { useEffect, useState, useContext } from "react";
import BookmarkContext from "../contexts/BookmarkContext";
import { storage } from "../index";
import DataContext from "../contexts/DataContext";
import { getDownloadURL, ref } from "firebase/storage";
import {
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../index";
const BookmarksPage = ({ user }) => {
  const bookdata = useContext(BookmarkContext);
  const data = useContext(DataContext);

  const [booked, setBooked] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  //const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(0);
  if (!bookdata || !bookdata.Bookmarks | !bookdata.Bookmarks.length) {
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

  // const handleUnBookmark = async (event, item) => {
  //   // event.stopPropagation();
  //   // let userId = "ERROR";
  //   //   if (user && user.auth && user.auth.currentUser) {
  //   //     userId = user.auth.currentUser.uid;
  //   // } else {
  //   //   console.log(JSON.stringify(user));
  //   // }
  //   // const docRef = doc(db, "Bookmarks", `${userId}`);
  //   //   await setDoc(docRef, {
  //   //     Bookmarks: arrayUnion({ id: item.id, Title: item.Title }),
  //   //   }, { merge: true });
  // };

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
  if (showDetails) {
    return (
      <>
        {/* <div style={{ maxHeight: "400px" }}>
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
        </div> */}
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
            backgroundColor: booked[details].Archived
              ? "rgba(0, 255, 0, 0.4)"
              : "white",
          }}
        >
          {" "}
          {booked[details].Archived && (
            <p>
              <strong>MARKED AS RESOLVED</strong>
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
        <button
          className="button"
          style={{ padding: "5px", margin: "2px" }}
          onClick={(event) => handleUnBookmark(event, booked[details])}
        >
          Unbookmark
        </button>
        <button
          className="button"
          style={{ padding: "5px", margin: "2px" }}
          onClick={(event) => handleBookmark(event, booked[details])}
        >
          Bookmark
        </button>
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
      </>
    );
  } else {
    return (
      <div style={{ maxHeight: "400px" }}>
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
