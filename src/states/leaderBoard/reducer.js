import { ActionType } from './action';

export const initialState = {
  data: [],
  loading: true,
  error: false,
};

function leaderBoardsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.LEADER_BOARDS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionType.LEADER_BOARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ActionType.LEADER_BOARDS_SUCCESS:
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

export default leaderBoardsReducer;
