import { ActionType } from './action';

export const initialState = {
  data: [],
  loading: false,
  error: false,
};

function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.USERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionType.USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ActionType.USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}

export default usersReducer;
