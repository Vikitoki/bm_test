import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setColorToDot } from "../../redux/dots/action-creators";

import "./Dot.scss";

const Dot = ({ coordinate, index, dotsColor, setColorToDot }) => {
  const { left, top } = coordinate;
  const [visibleList, setVisibleList] = useState(false);

  const handleVisible = () => {
    setVisibleList(!visibleList);
  };

  const handleBackground = (color) => {
    setVisibleList(!visibleList);
    setColorToDot(index, color);
  };

  return (
    <div style={{ left: left - 15, top: top + 35 }} className="dot">
      <div
        onClick={handleVisible}
        className="dot__body"
        style={{ backgroundColor: dotsColor[index] }}
      >
        This is a dot
      </div>
      <div className="dot__actions">
        {visibleList ? (
          <ul className="dot__list">
            <li onClick={() => handleBackground("red")}>Красный цвет</li>
            <li onClick={() => handleBackground("yellow")}>Жёлтый цвет</li>
            <li onClick={() => handleBackground("green")}>Зелёный цвет</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dotsColor: state.dots.dotsColor,
});

const mapDispatchToProps = (dispatch) => ({
  setColorToDot: (index, color) => dispatch(setColorToDot(index, color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dot);
