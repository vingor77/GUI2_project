import React from "react";
import CloseButton from "./CloseButton";
import TabBody from "./TabBody";
const OuterTab = ({ tabTitle, set, user }) => {
  const tabStyle = {
    borderStyle: "solid",
    position: "absolute",
    background: "white",
    marginTop: "-500px",
    marginLeft: "500px",
    // width: "100%",
    zIndex: "9999999",
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="row col-lg-3 col-1" style={tabStyle}>
        <CloseButton setTab={set} />
        <h3 className="col-lg-7 col-1">{tabTitle}</h3>
        <TabBody tabTitle={tabTitle} user={user} />
      </div>
    </div>
  );
};

export default OuterTab;
