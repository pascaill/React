import { getUserStatus } from '../../utils/api';
import { authUserErrorActionCreator, authUserSuccessActionCreator } from '../authUser/action';

const ActionType = {
  IS_PRELOAD: 'isPreload/loading',
};

function setIsPreloadActionCreator(loading = true) {
  return {
    type: ActionType.IS_PRELOAD,
    payload: {
      loading,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(setIsPreloadActionCreator(true));
    try {
      const { data: { user } } = await getUserStatus();
      dispatch(authUserSuccessActionCreator(user));
    } catch (error) {
      dispatch(authUserErrorActionCreator(error));
    }
    dispatch(setIsPreloadActionCreator(false));
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};
