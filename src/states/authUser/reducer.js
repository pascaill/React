import { ActionType } from './action';

export const initialState = {
  data: null,
  loading: false,
  error: null,
};

function authUserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.AUTH_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.AUTH_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case ActionType.AUTH_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };
    case ActionType.AUTH_USER_REMOVE:
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

export default authUserReducer;
