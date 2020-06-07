import {
  PUT_COMMENT,
  ADD_COMMENT,
  ADD_COMMENTS,
  ADD_REPLY,
  ADD_REPLYS,
  PUT_REPLY,
  RESET_REPLYS,
} from "../actions/types";

const initialState = {
  comments: {},
  replys: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.videoId]: [...state.comments[payload.videoId], payload],
        },
        loading: false,
      };

    case ADD_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload[0].videoId]: payload[0]._id ? payload : [],
        },
        loading: false,
      };

    case PUT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.videoId]: state.comments[payload.videoId].map(comment =>
            comment._id === payload._id ? payload : comment
          ),
        },
        loading: false,
      };

    case ADD_REPLY:
      return {
        ...state,
        replys: state.replys[payload.replyTo]
          ? {
              ...state.replys,
              [payload.replyTo]: [...state.replys[payload.replyTo], payload],
            }
          : { ...state.replys, [payload.replyTo]: [payload] },
        loading: false,
      };

    case PUT_REPLY:
      return {
        ...state,
        replys: {
          ...state.replys,
          [payload.replyTo]: state.replys[payload.replyTo].map(comment =>
            comment._id === payload._id ? payload : comment
          ),
        },
        loading: false,
      };

    case ADD_REPLYS:
      return {
        ...state,
        replys: { ...state.replys, [payload[0].replyTo]: payload },
        loading: false,
      };

    case RESET_REPLYS:
      return {
        ...state,
        replys: payload,
        loading: false,
      };

    default:
      return state;
  }
}
