/**
 * skenario test
 *
 * - should dispatch action data fetching success'
 * - should dispatch action data fetching error'
 */

import { getLeaderBoards } from '../../../utils/api';
import {
  asyncGetLeaderBoards,
  leaderBoardsErrorActionCreator,
  leaderBoardsLoadingActionCreator,
  leaderBoardsSuccessActionCreator,
} from '../action';

const fakeLeaderBoardssResponse = {
  status: 'success',
  message: 'ok',
  data: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ],
  },
};

jest.mock('../../../utils/api.js', () => ({
  getLeaderBoards: jest.fn().mockResolvedValue(fakeLeaderBoardssResponse),
}));

describe('src/pages/leaderBoards/action.js', () => {
  test('should dispatch action data fetching success', async () => {
    const dispatch = jest.fn();

    await asyncGetLeaderBoards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(leaderBoardsLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      leaderBoardsSuccessActionCreator(fakeLeaderBoardssResponse.data.leaderboards),
    );
  });

  test('should dispatch action data fetching error', async () => {
    const dispatch = jest.fn();

    getLeaderBoards.mockRejectedValueOnce();

    await asyncGetLeaderBoards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(leaderBoardsLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      leaderBoardsErrorActionCreator(),
    );
  });
});
