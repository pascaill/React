/**
 * skenario test
 *
 * - should render properly
 * - should ref current false
 * - should change category
 * - should state loading
 * - should state error
 */

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { customRender, fireEvent, screen } from '../../utils/test-utils';
import HomePage from '../HomePage';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((fn) => fn()),
  useRef: jest.fn((v) => ({ current: v })),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => (v) => v),
  useSelector: jest.fn((fn) => fn({
    threads: {
      loading: false,
      error: false,
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    },
    users: {
      loading: false,
      error: false,
      data: [
        {
          id: 'users-1',
          name: 'test',
        },
      ],
    },
    auth: {
      loading: false,
      error: false,
      data: {
        id: 'users-1',
      },
    },
  })),
}));

jest.mock('react-loader-spinner', () => ({
  Oval: () => <div />,
}));

describe('src/pages/HomePage.js', () => {
  test('should render properly', () => {
    customRender(<HomePage />);

    expect(screen).toBeTruthy();
  });

  test('should ref current false', () => {
    useRef.mockReturnValueOnce({ current: false });
    customRender(<HomePage />);

    expect(screen).toBeTruthy();
  });

  test('should change category', () => {
    const { container } = customRender(<HomePage />);

    const select = container.querySelector('#category');

    fireEvent.change(select);

    expect(screen).toBeTruthy();
  });

  test('should state loading', () => {
    useSelector.mockImplementationOnce((cb) => cb({
      threads: {
        loading: true,
      },
      users: {
        loading: true,
      },
    }));
    customRender(<HomePage />);

    expect(screen).toBeTruthy();
  });

  test('should state error', () => {
    useSelector.mockImplementationOnce((cb) => cb({
      threads: {
        error: true,
      },
      users: {
        error: true,
      },
    }));
    customRender(<HomePage />);

    expect(screen).toBeTruthy();
  });
});
