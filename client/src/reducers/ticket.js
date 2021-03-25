import {
  GET_TICKETS,
  GET_TICKETS_ERROR,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  TICKET_ERROR,
  GET_TICKET,
  ADD_REPLY,
  UPDATE_TICKET_STATUS,
} from "../actions/types";

const initialState = {
  tickets: [],
  ticket: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false,
      };

    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case CREATE_TICKET_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_TICKETS_ERROR:
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_TICKET:
    case UPDATE_TICKET_STATUS:
      return {
        ...state,
        ticket: payload,
        loading: false,
      };
    case ADD_REPLY:
      return {
        ...state,
        ticket: { ...state.ticket, conversation: payload },
        loading: false,
      };
    default:
      return state;
  }
}
