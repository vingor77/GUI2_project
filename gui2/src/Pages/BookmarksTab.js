import React, { useEffect, useState, useContext } from "react";
import BookmarkContext from "../contexts/BookmarkContext";
import { storage } from '../index'; 


const BookmarksPage = ({ user }) => {
  const bookdata = useContext(BookmarkContext);
  if (!bookdata) {
    return <div>Loading...</div>
  }
  const viewBookmark = (id) => {
    console.log(id);
    alert("You selected to view the document with id " + id);
  }
  return (
    <div style={{ maxHeight: "400px", overflow: "scroll" }}>
      {bookdata && bookdata.Bookmarks && bookdata.Bookmarks.map((item, index) => (
        <p      onClick={() => {viewBookmark(item.id)}}    style={{
          margin: "20px",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
        }}key={index}>{
          item.Title
          }</p>
      ))}
    </div>
  );
};

export default BookmarksPage;
