import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  REST_PASSWORD,
  FORGOT_PASSWORD,
  ACTIVATI_ACOUNTE

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  resetpassword: false,
  forgotpassword: false,
  activateLink:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        activateLink:false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,

      };
    case REST_PASSWORD:
      return {
        ...state,
        resetpassword: true
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotpassword: true
      }
    case ACTIVATI_ACOUNTE:
      return {
        ...state,
         ...payload,
         isAuthenticated: true,
         loading:false,
         activateLink: true
      }
    default:
      return state;
  }
}
