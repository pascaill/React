/**
 * test scenario
 *
 *  - should set state loading
 *  - should set state error
 *  - should set state success
 *
 */

import { ActionType } from '../action';
import usersReducer from '../reducer';

describe('src/pages/leaderBoards/reducer.js', () => {
  test('should set state loading', () => {
    const initialState = { error: false, loading: true };
    const action = { type: ActionType.USERS_LOADING };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  test('should set state error', () => {
    const initialState = { error: true, loading: false };
    const action = { type: ActionType.USERS_ERROR };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  test('should set state success', () => {
    const initialState = { error: false, loading: false, data: [] };
    const action = {
      type: ActionType.USERS_SUCCESS,
      payload: {
        data: [],
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  test('should set state UNKNOW', () => {
    const initialState = [];
    const action = { type: 'UNKNOW' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
