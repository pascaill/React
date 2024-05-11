import { ActionType } from './action';

export const initialState = {
  data: [],
  loading: false,
  error: false,
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.THREADS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionType.THREADS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ActionType.THREADS_SUCCESS:
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

export default threadsReducer;
