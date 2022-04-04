import axios from "axios";
import { setAlert } from "./alert";

import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  NEW_PASS_SUCCESS,
  NEW_PASS_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("https://mernapp-backendapp.herokuapp.com/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//create user
export const createUser = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post(
      "https://mernapp-backendapp.herokuapp.com/api/users",
      body,
      config
    );
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("User Added Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: CREATE_USER_FAIL,
    });
  }
};

//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "https://mernapp-backendapp.herokuapp.com/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Reset Password
export const reset = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      "https://mernapp-backendapp.herokuapp.com/api/auth/reset-password",
      body,
      config
    );
    dispatch({
      type: RESET_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Check your email to reset password", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: RESET_FAIL,
    });
  }
};

//new password
export const newPassword = (password, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password, token });

  try {
    const res = await axios.put(
      "https://mernapp-backendapp.herokuapp.com/api/auth/new-password",
      body,
      config
    );
    dispatch({
      type: NEW_PASS_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert(
        "Password has been changed. You can login with your updated password",
        "success"
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: NEW_PASS_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
