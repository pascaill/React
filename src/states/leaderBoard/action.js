import { getLeaderBoards } from '../../utils/api';

const ActionType = {
  LEADER_BOARDS_SUCCESS: 'leaderboards/success',
  LEADER_BOARDS_LOADING: 'leaderboards/loading',
  LEADER_BOARDS_ERROR: 'leaderboards/error',
};

function leaderBoardsSuccessActionCreator(data) {
  return {
    type: ActionType.LEADER_BOARDS_SUCCESS,
    payload: {
      data,
    },
  };
}

function leaderBoardsErrorActionCreator() {
  return {
    type: ActionType.LEADER_BOARDS_ERROR,
  };
}

function leaderBoardsLoadingActionCreator() {
  return {
    type: ActionType.LEADER_BOARDS_LOADING,
  };
}

function asyncGetLeaderBoards() {
  return async (dispatch) => {
    try {
      dispatch(leaderBoardsLoadingActionCreator());

      const { data: { leaderboards } } = await getLeaderBoards();

      dispatch(leaderBoardsSuccessActionCreator(leaderboards));
    } catch (error) {
      dispatch(leaderBoardsErrorActionCreator());
    }
  };
}

export {
  ActionType,
  asyncGetLeaderBoards,
  leaderBoardsLoadingActionCreator,
  leaderBoardsErrorActionCreator,
  leaderBoardsSuccessActionCreator,
};
