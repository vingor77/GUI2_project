import React from "react";
import CloseButton from "./CloseButton";
import TabBody from "./TabBody";
const Tab = ({ tabTitle, set, user }) => {
  const tabStyle = {
    borderStyle: "solid",
    position: "relative",
    background: "white",
    marginTop: "7%",
    marginLeft: "5px",
    // width: "100%",
    zIndex: "2",
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="row col-lg-3 col-11" style={tabStyle}>
        <CloseButton setTab={set} />
        <h3 className="col-lg-7 col-9">{tabTitle}</h3>
        <TabBody tabTitle={tabTitle} user={user}/>
      </div>
    </div>
  );
};

export default Tab;
