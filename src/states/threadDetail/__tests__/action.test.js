/**
 * skenario test
 *
 * - should dispatch action  data detail threads fetching success'
 * - should dispatch action data detail threads fetching success with initial Loading
 * - should dispatch action data detail threads fetching error'
 * - should dispatch action comment success
 * - should dispatch action comment error
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { commentThreads, getThreadById } from '../../../utils/api';
import {
  asyncCommentThread,
  asyncGetThreadDetail,
  threadsDetailErrorActionCreator,
  threadsDetailLoadingActionCreator,
  threadsDetailSuccessActionCreator,
} from '../action';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeResponse = {
  status: 'success',
  message: 'ok',
  data: {
    detailThread: {},
  },
};

jest.mock('../../../utils/api.js', () => ({
  getThreadById: jest.fn().mockResolvedValue(fakeResponse),
  commentThreads: jest.fn().mockResolvedValue({
    status: 'success',
  }),
}));

describe('src/pages/threadsDetail/action.js', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should dispatch action data detail threads fetching success', async () => {
    const dispatch = jest.fn();

    await asyncGetThreadDetail('id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(threadsDetailLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      threadsDetailSuccessActionCreator(fakeResponse.data.detailThread),
    );
  });

  test('should dispatch action data detail threads fetching success without loading spinner', async () => {
    const dispatch = jest.fn();

    await asyncGetThreadDetail('id', false)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      threadsDetailSuccessActionCreator(fakeResponse.data.detailThread),
    );
  });

  test('should dispatch action data detail threads fetching error', async () => {
    const dispatch = jest.fn();

    getThreadById.mockRejectedValueOnce();

    await asyncGetThreadDetail('id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(threadsDetailLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      threadsDetailErrorActionCreator(),
    );
  });

  test('should dispatch action comment success', () => store.dispatch(asyncCommentThread())
    .then(() => { expect(store.getActions()).toEqual([]); }));

  test('should dispatch action comment error', () => {
    commentThreads.mockRejectedValueOnce(new Error('error'));
    return store.dispatch(asyncCommentThread())
      .catch(() => { expect(store.getActions()).toEqual([]); });
  });
});
