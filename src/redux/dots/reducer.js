import { CREATE_NEW_DOT, SET_COLOR_TO_DOT, SET_ZOOM } from "./action-variables";

const initialState = {
  coordinats: [],
  currentValue: 0,
  dotsId: [],
  dotsColor: {},
  zoom: false,
};

const dotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_DOT:
      return {
        ...state,
        coordinats: [...state.coordinats, action.payload],
        dotsColor: { ...state.dotsColor, [state.currentValue]: "red" },
        currentValue: state.currentValue + 1,
        dotsId: [...state.dotsId, Math.random() * 10],
      };
    case SET_COLOR_TO_DOT:
      const [index, color] = action.payload;

      return {
        ...state,
        dotsColor: { ...state.dotsColor, [index]: color },
      };
    case SET_ZOOM:
      return {
        ...state,
        zoom: !state.zoom,
      };
    default:
      return state;
  }
};

export default dotsReducer;
