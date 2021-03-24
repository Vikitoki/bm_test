import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import MainPageBG from "../images/map-bm.png";
import DotsPopup from "../components/Dots-popup/Dots-popup";
import Dot from "../components/Dot/Dot";
import "./main-pages.scss";

const MainPage = ({ coordinats }) => {
  const img = useRef();
  const [clientX, setClientX] = useState(null);
  const [clientY, setClientY] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [styleCoordinatePopup, setStyleCoordinatePopup] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    img.current.addEventListener("mousemove", function (event) {
      setClientX(event.clientX);
      setClientY(event.clientY);
    });
  }, []);

  const visibleHandler = () => {
    if (!visiblePopup) {
      setStyleCoordinatePopup({
        ...styleCoordinatePopup,
        left: clientX - 220,
        top: clientY - 100,
      });
    }
    setTimeout(() => {
      setVisiblePopup(!visiblePopup);
    }, 250);
  };

  return (
    <div className="main-page">
      <div onClick={visibleHandler} className="main-page__img">
        <img ref={img} src={MainPageBG} alt="" />
      </div>
      <div
        className={
          visiblePopup ? "main-page__action active" : "main-page__action"
        }
        style={styleCoordinatePopup}
      >
        <DotsPopup
          setVisiblePopup={setVisiblePopup}
          coordinate={styleCoordinatePopup}
        />
      </div>
      {coordinats.length > 0
        ? coordinats.map((item, index) => {
            return (
              <Dot
                key={Math.random()}
                index={index}
                coordinate={item}
              />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  coordinats: state.dots.coordinats,
  dotsColor: state.dots.dotsColor,
});

export default connect(mapStateToProps)(MainPage);
