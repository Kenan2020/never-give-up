import { SET_DIALOG, REMOVE_DIALOG } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOG:
      return payload;
    case REMOVE_DIALOG:
      return null;
    default:
      return state;
  }
}
