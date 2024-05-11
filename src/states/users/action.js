import { getUsers, register } from '../../utils/api';

const ActionType = {
  USERS_SUCCESS: 'users/success',
  USERS_LOADING: 'users/loading',
  USERS_ERROR: 'users/error',
};

function usersSuccessActionCreator(data) {
  return {
    type: ActionType.USERS_SUCCESS,
    payload: {
      data,
    },
  };
}

function usersErrorActionCreator() {
  return {
    type: ActionType.USERS_ERROR,
  };
}

function usersLoadingActionCreator() {
  return {
    type: ActionType.USERS_LOADING,
  };
}

function asyncGetusers() {
  return async (dispatch) => {
    try {
      dispatch(usersLoadingActionCreator());

      const { data: { users } } = await getUsers();

      dispatch(usersSuccessActionCreator(users));
    } catch (error) {
      dispatch(usersErrorActionCreator());
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      return await register({ name, email, password });
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export {
  ActionType,
  usersSuccessActionCreator,
  usersErrorActionCreator,
  usersLoadingActionCreator,
  asyncGetusers,
  asyncRegisterUser,
};
