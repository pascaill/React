import { commentThreads, getThreadById } from '../../utils/api';

const ActionType = {
  THREADS_DETAIL_SUCCESS: 'threads/detail/success',
  THREADS_DETAIL_LOADING: 'threads/detail/loading',
  THREADS_DETAIL_ERROR: 'threads/detail/error',
};

function threadsDetailSuccessActionCreator(data) {
  return {
    type: ActionType.THREADS_DETAIL_SUCCESS,
    payload: {
      data,
    },
  };
}

function threadsDetailErrorActionCreator() {
  return {
    type: ActionType.THREADS_DETAIL_ERROR,
  };
}

function threadsDetailLoadingActionCreator() {
  return {
    type: ActionType.THREADS_DETAIL_LOADING,
  };
}

function asyncGetThreadDetail(id, initialLoading = true) {
  return async (dispatch) => {
    try {
      if (initialLoading) {
        dispatch(threadsDetailLoadingActionCreator());
      }

      const { data: { detailThread } } = await getThreadById(id);

      dispatch(threadsDetailSuccessActionCreator(detailThread));
    } catch (error) {
      dispatch(threadsDetailErrorActionCreator());
    }
  };
}

function asyncCommentThread(id, payload) {
  return async () => {
    try {
      return await commentThreads(id, payload);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export {
  ActionType,
  threadsDetailSuccessActionCreator,
  threadsDetailErrorActionCreator,
  threadsDetailLoadingActionCreator,
  asyncGetThreadDetail,
  asyncCommentThread,
};
