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

  console.log(clientY, clientX);

  useEffect(() => {
    console.log(coordinats);
    img.current.addEventListener("mousemove", function (event) {
      setClientX(event.clientX);
      setClientY(event.clientY);
    });
  }, []);

  const visibleHandler = () => {
    if (!visiblePopup) {
      setStyleCoordinatePopup({
        ...styleCoordinatePopup,
        left: clientX - 210,
        top: clientY - 100 ,
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
        ? coordinats.map((item) => {
            return <Dot key={Math.random()} coordinate={item} />;
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  coordinats: state.dots.coordinats,
});

export default connect(mapStateToProps)(MainPage);
