import React from "react";
import CloseButton from "./CloseButton";
import TabBody from "./TabBody";
const Tab = ({ tabTitle, set }) => {
  const tabStyle = {
    borderStyle: "solid",
    position: "absolute",
    zIndex: "1",
    background: "white",
    marginTop: "5%",
    marginLeft: "5px",
  };
  return (
    <div className="row col-lg-3 col-12" style={tabStyle}>
      <CloseButton setTab={set} />
      <h3 className="col-lg-7 col-9">{tabTitle}</h3>
      <TabBody />
    </div>
  );
};

export default Tab;
