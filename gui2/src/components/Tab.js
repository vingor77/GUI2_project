import React from "react";
import CloseButton from "./CloseButton";
import TabBody from "./TabBody";
const Tab = ({ tabTitle, set, user }) => {
  const tabStyle = {
    borderStyle: "solid",
    position: "relative",
    marginTop: "0.5px",
    background: "white",
    marginLeft: "6px",
    // width: "100%",
    zIndex: "2",
    // borderTop: "none",
    borderRadius: "10px",
  };

  const titleStyle = {
    paddingTop: "20px",
    display: "inline-block",
    paddingLeft: "10px",
  };

  return (
    // <div style={{ position: "relative" }}>
    <div className="row col-lg-3 col-11" style={tabStyle}>
      <div
        style={{
          background: "#A3AF9E",
          // borderRadius: "5px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <CloseButton setTab={set} />
        <h3 style={titleStyle} className="col-lg-7 col-9">
          {tabTitle}
        </h3>
      </div>
      <TabBody tabTitle={tabTitle} user={user} />
    </div>
    // </div>
  );
};

export default Tab;
