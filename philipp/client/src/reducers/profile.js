import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,

  GET_PROFILES,

  UPDATE_USER_PROFILE,
  PROFILE_USER_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  user: null,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER_PROFILE:
    case GET_PROFILE:

      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
    case PROFILE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        user: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: []
      };

    default:
      return state;
  }
}
