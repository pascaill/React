import { ActionType } from './action';

export const initialState = {
  loading: false,
};

function isPreloadReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.IS_PRELOAD:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

export default isPreloadReducer;
