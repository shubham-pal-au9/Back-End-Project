import {GET_USERS, 
GET_USERS_ERROR,
PUT_EDIT_PROFILE, 
PUT_EDIT_PROFILE_ERROR,
DELETE_USER,
DELETE_USER_ERROR} from '../actions/types'


const initialState = {
    users: [],
    user: null,
    editprofiles: [],
    editprofile: null,
    userdeleted: [],
    userdelete: null,
    loading: true,
    error: {},
  };

  export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

      case PUT_EDIT_PROFILE:
      return {
        ...state,
        editprofiles:payload,
        loading: false,
      };
    case PUT_EDIT_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

      case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
