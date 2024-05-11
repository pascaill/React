import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/elements/Input';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser, authUserErrorActionCreator } from '../states/authUser/action';
import Spinner from '../components/elements/Spinner';

export default function LoginPage() {
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  useEffect(() => {
    dispatch(authUserErrorActionCreator(null));
  }, [email, password]);

  return (
    <div className="h-full flex flex-col w-full items-center justify-center">
      <h1 className="text-lg font-medium mb-8">Masuk ke Akun Anda</h1>
      <form onSubmit={onSubmitLogin} className="flex flex-col gap-4 justify-center w-full max-w-md">
        <div className="w-full">
          <Input id="email" type="email" placeholder="masukkan email" label="Email" value={email} onChange={setEmail} />
        </div>
        <div className="w-full">
          <Input id="password" type="password" placeholder="masukkan password" label="Password" value={password} onChange={setPassword} />
        </div>
        <button
          className="w-full bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 active:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 flex justify-center items-center gap-2"
          disabled={!email || !password || loading}
          type="submit"
        >
          Login
          { loading && (
            <Spinner width={20} height={20} color="#FFFFFF" secondaryColor="" />
          ) }
        </button>
        {error && (<p data-testid="ntf-err" className="text-red-600 text-sm mb-2 text-center">{error?.message}</p>)}
        <p className="text-sm text-gray-500">
          Belum punya akun?
          {' '}
          <Link to="/register" className="text-blue-500">Daftar di sini.</Link>
        </p>
      </form>
    </div>
  );
}
