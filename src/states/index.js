/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderBoardsReducer from './leaderBoard/reducer';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderBoards: leaderBoardsReducer,
    users: usersReducer,
    auth: authUserReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
