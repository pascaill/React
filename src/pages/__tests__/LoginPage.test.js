/**
 * skenario test
 *
 * - should input email
 * - should input password
 * - should click login
 */

import userEvent from '@testing-library/user-event';
import { customRender, screen } from '../../utils/test-utils';
import LoginPage from '../LoginPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => (v) => v),
  useSelector: jest.fn((fn) => fn({
    auth: {
      loading: false,
      error: false,
    },
  })),
}));

jest.mock('react-loader-spinner', () => ({
  Oval: () => <div />,
}));

describe('src/pages/LoginPage.js', () => {
  test('should input email', async () => {
    customRender(<LoginPage />);

    const usernameInput = await screen.getByPlaceholderText('masukkan email');

    await userEvent.type(usernameInput, 'test@yopmail.com');

    expect(usernameInput).toHaveValue('test@yopmail.com');
  });

  test('should input password', async () => {
    customRender(<LoginPage />);

    const passwordInput = await screen.getByPlaceholderText('masukkan password');

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });

  test('should click login', async () => {
    customRender(<LoginPage />);

    const usernameInput = await screen.getByPlaceholderText('masukkan email');
    await userEvent.type(usernameInput, 'test@yopmail.com');
    const passwordInput = await screen.getByPlaceholderText('masukkan password');
    await userEvent.type(passwordInput, 'password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(screen).toBeTruthy();
  });
});
