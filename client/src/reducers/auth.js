import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  RESET_SUCCESS,
  RESET_FAIL,
  LOGOUT,
  USER_LOADED,
  NEW_PASS_SUCCESS,
  NEW_PASS_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: localStorage.getItem("user"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case CREATE_USER_SUCCESS:
    case RESET_SUCCESS:
    case NEW_PASS_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case CREATE_USER_FAIL:
    case RESET_FAIL:
    case NEW_PASS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
