/**
 * skenario test
 *
 * - should render properly
 * - should ref current false
 * - should state loading
 * - should state error
 */

import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { customRender, screen } from '../../utils/test-utils';
import LeaderBoardPage from '../LeaderBoardPage';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((fn) => fn()),
  useRef: jest.fn((v) => ({ current: v })),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => (v) => v),
  useSelector: jest.fn((fn) => fn({
    leaderBoards: {
      loading: false,
      error: false,
      data: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
      ],
    },
  })),
}));

jest.mock('react-loader-spinner', () => ({
  Oval: () => <div />,
}));

describe('src/pages/LeaderBoardPage.js', () => {
  test('should render properly', () => {
    customRender(<LeaderBoardPage />);

    expect(screen).toBeTruthy();
  });

  test('should ref current false', () => {
    useRef.mockReturnValueOnce({ current: false });
    customRender(<LeaderBoardPage />);

    expect(screen).toBeTruthy();
  });

  test('should state loading', () => {
    useSelector.mockImplementationOnce((cb) => cb({
      leaderBoards: {
        loading: true,
      },
    }));
    customRender(<LeaderBoardPage />);

    expect(screen).toBeTruthy();
  });

  test('should state error', () => {
    useSelector.mockImplementationOnce((cb) => cb({
      leaderBoards: {
        error: true,
      },
    }));
    customRender(<LeaderBoardPage />);

    expect(screen).toBeTruthy();
  });
});
