import {
  createThreads,
  downVoteComment,
  downVoteThread,
  getThreads,
  neutralVoteComment,
  neutralVoteThread,
  upVoteComment,
  upVoteThread,
} from '../../utils/api';

const ActionType = {
  THREADS_SUCCESS: 'threads/success',
  THREADS_LOADING: 'threads/loading',
  THREADS_ERROR: 'threads/error',
};

function threadsSuccessActionCreator(data) {
  return {
    type: ActionType.THREADS_SUCCESS,
    payload: {
      data,
    },
  };
}

function threadsErrorActionCreator() {
  return {
    type: ActionType.THREADS_ERROR,
  };
}

function threadsLoadingActionCreator() {
  return {
    type: ActionType.THREADS_LOADING,
  };
}

function asyncCreateThread({ title, category, body }) {
  return async () => {
    try {
      return await createThreads({ title, category, body });
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

function asyncGetThreads(initialLoading = true) {
  return async (dispatch) => {
    try {
      if (initialLoading) {
        dispatch(threadsLoadingActionCreator());
      }

      const { data: { threads } } = await getThreads();

      dispatch(threadsSuccessActionCreator(threads));
    } catch (error) {
      dispatch(threadsErrorActionCreator());
    }
  };
}

async function asyncToogleVoteThread(id, vote = 'neutral') {
  try {
    if (vote === 'up') {
      return await upVoteThread(id);
    } if (vote === 'down') {
      return await downVoteThread(id);
    }
    return await neutralVoteThread(id);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function asyncToogleVoteComment(threadId, commentId, vote = 'neutral') {
  try {
    if (vote === 'up') {
      return await upVoteComment(threadId, commentId);
    } if (vote === 'down') {
      return await downVoteComment(threadId, commentId);
    }
    return await neutralVoteComment(threadId, commentId);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  ActionType,
  threadsSuccessActionCreator,
  threadsErrorActionCreator,
  threadsLoadingActionCreator,
  asyncGetThreads,
  asyncToogleVoteThread,
  asyncCreateThread,
  asyncToogleVoteComment,
};
