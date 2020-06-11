import { v4 as uuidv4 } from "uuid";
import { SET_DIALOG, REMOVE_DIALOG } from "./types";

export const setDialog = ({ title, msg, alertType, buttons }) => dispatch => {
  const id = uuidv4();
  console.log("set dialog");
  dispatch({
    type: SET_DIALOG,
    payload: { title, msg, alertType, buttons, id },
  });
};

export const removeDialog = () => dispatch => {
  dispatch({
    type: REMOVE_DIALOG,
    payload: null,
  });
};

// button = [{title ,  eventHandler, href, color }]
