import React from "react";

import "./Dot.scss";

const Dot = ({ coordinate }) => {
  const { left, top } = coordinate;

  return (
    <div style={{ left: left + 200, top: top + 90 }} className="dot">
      <div className="dot__body">This is a dot</div>
    </div>
  );
};

export default Dot;
