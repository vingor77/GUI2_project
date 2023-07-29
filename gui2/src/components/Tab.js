import React from "react";
import CloseButton from "./CloseButton";
import TabBody from "./TabBody";
const Tab = ({ tabTitle }) => {
  const tabStyle = {
    borderStyle: "solid",
    marginLeft: "5px",
  };
  return (
    <div className="row col-lg-3 col-12" style={tabStyle}>
      <CloseButton />
      <h3 className="col-lg-9 col-9">{tabTitle}</h3>
      <TabBody />
    </div>
  );
};

export default Tab;
