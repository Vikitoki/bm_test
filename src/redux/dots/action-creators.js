import { CREATE_NEW_DOT, SET_COLOR_TO_DOT, SET_ZOOM } from "./action-variables";

const createNewDot = (coordinates) => ({
  type: CREATE_NEW_DOT,
  payload: coordinates,
});

const setColorToDot = (index, color) => ({
  type: SET_COLOR_TO_DOT,
  payload: [index, color],
});

const setZoom = () => ({
  type: SET_ZOOM,
});

export { createNewDot, setColorToDot, setZoom };
