// contexts/BookmarkProvider.js
import React from "react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import BookmarkContext from "./BookmarkContext";
import { onAuthStateChanged } from "firebase/auth";
export default function BookmarkProvider({ children, db, auth }) {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Bookmarks", `${userId}`),
      (snapshot) => {
        console.log("UID: " + userId);
        const fetchedData = snapshot.data();
        setData(fetchedData);
        console.log("CALLING BOOKMARK DATABASE" + fetchedData);
      },
      (error) => {}
    );

    return () => unsubscribe();
  }, [db, userId]);

  return (
    <BookmarkContext.Provider value={data}>{children}</BookmarkContext.Provider>
  );
}
