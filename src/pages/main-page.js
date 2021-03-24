import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import MainPageBG from "../images/map-bm.png";
import DotsPopup from "../components/Dots-popup/Dots-popup";
import Dot from "../components/Dot/Dot";
import { setZoom } from "../redux/dots/action-creators";
import "./main-pages.scss";

import * as $ from "jquery";

$(function ($) {
  $.fn.blowup = function (attributes) {
    var $element = this;

    // If the target element is not an image
    if (!$element.is("img")) {
      console.log(
        "%c Blowup.js Error: ",
        "%cTarget element is not an image.",
        "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;",
        "background: #FCEBB6; color: #F07818; font-size: 17px;"
      );
      return;
    }

    // Constants
    var $IMAGE_URL = $element.attr("src");
    var NATIVE_IMG = new Image();
    NATIVE_IMG.src = $element.attr("src");

    // Default attributes
    var defaults = {
      round: true,
      width: 200,
      height: 200,
      background: "#FFF",
      shadow: "0 8px 17px 0 rgba(0, 0, 0, 0.2)",
      border: "6px solid #FFF",
      cursor: true,
      zIndex: 999999,
      scale: 1,
      customClasses: "",
    };

    // Update defaults with custom attributes
    var $options = $.extend(defaults, attributes);

    // Modify target image
    $element.on("dragstart", function (e) {
      e.preventDefault();
    });
    $element.css("cursor", $options.cursor ? "crosshair" : "none");

    // Create magnification lens element
    var lens = document.createElement("div");
    lens.id = "BlowupLens";

    // Attack the element to the body
    $("body").append(lens);

    // Updates styles
    var $blowupLens = $("#BlowupLens");

    $blowupLens.css({
      position: "absolute",
      display: "none",
      "pointer-events": "none",
      zIndex: $options.zIndex,
      width: $options.width,
      height: $options.height,
      border: $options.border,
      background: $options.background,
      "border-radius": $options.round ? "50%" : "none",
      "box-shadow": $options.shadow,
      "background-repeat": "no-repeat",
    });

    // Add custom CSS classes
    $blowupLens.addClass($options.customClasses);

    // Show magnification lens
    $element.mouseenter(function () {
      $blowupLens.css("display", "block");
    });

    // Mouse motion on image
    $element.mousemove(function (e) {
      // Lens position coordinates
      var lensX = e.pageX - $options.width / 2;
      var lensY = e.pageY - $options.height / 2;

      // Relative coordinates of image
      var relX = e.pageX - $(this).offset().left;
      var relY = e.pageY - $(this).offset().top;

      // Zoomed image coordinates
      var zoomX = -Math.floor(
        (relX / $element.width()) * (NATIVE_IMG.width * $options.scale) -
          $options.width / 2
      );
      var zoomY = -Math.floor(
        (relY / $element.height()) * (NATIVE_IMG.height * $options.scale) -
          $options.height / 2
      );

      var backPos = zoomX + "px " + zoomY + "px";
      var backgroundSize =
        NATIVE_IMG.width * $options.scale +
        "px " +
        NATIVE_IMG.height * $options.scale +
        "px";

      // Apply styles to lens
      $blowupLens.css({
        left: lensX,
        top: lensY,
        "background-image": "url(" + encodeURI($IMAGE_URL) + ")",
        "background-size": backgroundSize,
        "background-position": backPos,
      });
    });

    // Hide magnification lens
    $element.mouseleave(function () {
      $blowupLens.css("display", "none");
    });
  };
});

const MainPage = ({ coordinats, setZoomImg, zoom }) => {
  console.log(zoom);
  const img = useRef(null);
  const [clientX, setClientX] = useState(null);
  const [clientY, setClientY] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [styleCoordinatePopup, setStyleCoordinatePopup] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    console.log("render");
    if (zoom) {
      $(document).ready(function () {
        $("img").blowup({
          background: "#FCEBB6",
        });
      });
    } else {
      $(document).ready(function () {
        $("img").blowup({
          background: "transparent",
          width: 0,
          height: 0,
          border: "none",
        });
      });
    }
  }, [zoom]);

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
        left: clientX - 155,
        top: clientY - 60,
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
      <div className="main-page__btns">
        <button
          onClick={() => setZoomImg()}
          type="button"
          className="btn btn_blue"
        >
          Лупа
        </button>
      </div>

      {coordinats.length > 0
        ? coordinats.map((item, index) => {
            return <Dot key={Math.random()} index={index} coordinate={item} />;
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  coordinats: state.dots.coordinats,
  dotsColor: state.dots.dotsColor,
  zoom: state.dots.zoom,
});

const mapDispatchToProps = (dispatch) => ({
  setZoomImg: () => dispatch(setZoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
