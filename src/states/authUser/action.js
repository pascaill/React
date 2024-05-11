import { getUserStatus, login } from '../../utils/api';
import { putAccessToken } from '../../utils/storage';

const ActionType = {
  AUTH_USER_SUCCESS: 'auth/user/success',
  AUTH_USER_LOADING: 'auth/user/loading',
  AUTH_USER_ERROR: 'auth/user/error',
  AUTH_USER_REMOVE: 'auth/user/remove',
};

function authUserSuccessActionCreator(data) {
  return {
    type: ActionType.AUTH_USER_SUCCESS,
    payload: {
      data,
    },
  };
}

function authUserErrorActionCreator(error) {
  return {
    type: ActionType.AUTH_USER_ERROR,
    payload: {
      error,
    },
  };
}

function authUserLoadingActionCreator() {
  return {
    type: ActionType.AUTH_USER_LOADING,
  };
}

function authUserRemoveActionCreator() {
  return {
    type: ActionType.AUTH_USER_SUCCESS,
    payload: {
      data: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(authUserLoadingActionCreator());
      const { data: { token } } = await login({ email, password });

      putAccessToken(token);
      const { data: { user } } = await getUserStatus();

      dispatch(authUserSuccessActionCreator(user));
    } catch (error) {
      dispatch(authUserErrorActionCreator(error));
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(authUserRemoveActionCreator());
    putAccessToken('');
  };
}

export {
  ActionType,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  authUserSuccessActionCreator,
  authUserErrorActionCreator,
};
