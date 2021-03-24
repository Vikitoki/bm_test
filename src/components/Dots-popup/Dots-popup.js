import React from "react";
import { connect } from "react-redux";

import "./Dots-popup.scss";
import "../../styles/common/common.scss";
import { createNewDot } from "../../redux/dots/action-creators";

const DotsPopup = ({
  coordinate,
  createNewDot,
  setVisiblePopup,
}) => {
  // console.log(coordinate, coordinats, currentValue);

  const coodinateHandler = (event) => {
    event.preventDefault();
    setVisiblePopup(false);
    createNewDot(coordinate);
  };

  return (
    <div className="dots-popup">
      <button
        onClick={coodinateHandler}
        type="button"
        className="dots-popup__btn"
      >
        Создать точку
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createNewDot: (coordinates) => dispatch(createNewDot(coordinates)),
});

export default connect(null, mapDispatchToProps)(DotsPopup);
