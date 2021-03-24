import { CREATE_NEW_DOT } from "./action-variables";

const initialState = {
  coordinats: [],
  currentValue: 0,
  dotsId: [],
};

const dotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_DOT:
      return {
        ...state,
        coordinats: [...state.coordinats, action.payload],
        currentValue: state.currentValue + 1,
        dotsId: [...state.dotsId, Math.random() * 10],
      };
    default:
      return state;
  }
};

export default dotsReducer;
