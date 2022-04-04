import axios from "axios";
import {
  GET_USERS,
  GET_USERS_ERROR,
  PUT_EDIT_PROFILE,
  PUT_EDIT_PROFILE_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR
} from "./types";

import { setAlert } from "./alert";

//Get User
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("https://mernapp-backendapp.herokuapp.com/api/users/allusers");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Edit User Profile
export const editProfile = (userId, { name, avatar, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, avatar, password });

  try {
    const res = await axios.put(
      `https://mernapp-backendapp.herokuapp.com/api/users/editprofile/${userId}`,
      body,
      config
    );
    dispatch({
      type: PUT_EDIT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("User updated Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PUT_EDIT_PROFILE_ERROR,
    });
  }
};


// Delete User
export const deleteUser = (id) => async (dispatch) => {
  if (window.confirm("Are You sure? Once User Deleted can't be undone ")) {

  try {
    await axios.delete(`https://mernapp-backendapp.herokuapp.com/api/users/deleteUser/${id}`);
    
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
    dispatch(setAlert("User Deleted Permanently", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_USER_ERROR,
      
    });
  }
}
};