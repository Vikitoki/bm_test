import { CREATE_NEW_DOT } from "./action-variables";

const createNewDot = (coordinates) => ({
  type: CREATE_NEW_DOT,
  payload: coordinates,
});

export { createNewDot };
