/**
 * skenario test
 *
 * - should input nama
 * - should input email
 * - should input password
 * - should click register
 */

import userEvent from '@testing-library/user-event';
import { customRender, screen } from '../../utils/test-utils';
import RegisterPage from '../RegisterPage';

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

describe('src/pages/RegisterPage.js', () => {
  test('should input nama', async () => {
    customRender(<RegisterPage />);

    const nameInput = await screen.getByPlaceholderText('masukkan nama');

    await userEvent.type(nameInput, 'test');

    expect(nameInput).toHaveValue('test');
  });

  test('should input email', async () => {
    customRender(<RegisterPage />);

    const usernameInput = await screen.getByPlaceholderText('masukkan email');

    await userEvent.type(usernameInput, 'test@yopmail.com');

    expect(usernameInput).toHaveValue('test@yopmail.com');
  });

  test('should input password', async () => {
    customRender(<RegisterPage />);

    const passwordInput = await screen.getByPlaceholderText('masukkan password');

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });

  test('should click register', async () => {
    customRender(<RegisterPage />);

    const nameInput = await screen.getByPlaceholderText('masukkan nama');
    await userEvent.type(nameInput, 'nama');
    const usernameInput = await screen.getByPlaceholderText('masukkan email');
    await userEvent.type(usernameInput, 'test@yopmail.com');
    const passwordInput = await screen.getByPlaceholderText('masukkan password');
    await userEvent.type(passwordInput, 'password');
    const loginButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.click(loginButton);

    expect(screen).toBeTruthy();
  });
});
