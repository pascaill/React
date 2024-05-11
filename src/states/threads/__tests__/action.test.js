/**
 * skenario test
 *
 * - should dispatch action create success
 * - should dispatch action create error
 * - should dispatch action  data threads fetching success'
 * - should dispatch action data threads fetching success with initial Loading
 * - should dispatch action data threads fetching error'
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createThreads, getThreads } from '../../../utils/api';
import {
  asyncCreateThread,
  asyncGetThreads,
  threadsErrorActionCreator,
  threadsLoadingActionCreator,
  threadsSuccessActionCreator,
} from '../action';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeResponseThreads = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [],
  },
};

const payloadCreate = { title: 'test', category: 'test', body: 'test' };

jest.mock('../../../utils/api.js', () => ({
  getThreads: jest.fn().mockResolvedValue(fakeResponseThreads),
  createThreads: jest.fn().mockResolvedValue({
    status: 'success',
  }),
}));

describe('src/pages/threads/action.js', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should dispatch action create success', () => store.dispatch(asyncCreateThread(payloadCreate))
    .then(() => { expect(store.getActions()).toEqual([]); }));

  test('should dispatch action create error', () => {
    createThreads.mockRejectedValueOnce(new Error('error'));
    return store.dispatch(asyncCreateThread(payloadCreate))
      .catch(() => { expect(store.getActions()).toEqual([]); });
  });

  test('should dispatch action data threads fetching success', async () => {
    const dispatch = jest.fn();

    await asyncGetThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(threadsLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      threadsSuccessActionCreator(fakeResponseThreads.data.threads),
    );
  });

  test('should dispatch action data threads fetching success without loading spinner', async () => {
    const dispatch = jest.fn();

    await asyncGetThreads(false)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      threadsSuccessActionCreator(fakeResponseThreads.data.threads),
    );
  });

  test('should dispatch action data threads fetching error', async () => {
    const dispatch = jest.fn();

    getThreads.mockRejectedValueOnce();

    await asyncGetThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(threadsLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      threadsErrorActionCreator(),
    );
  });
});
