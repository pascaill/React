import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/elements/Input';
import { asyncRegisterUser } from '../states/users/action';
import useInput from '../hooks/useInput';
import Spinner from '../components/elements/Spinner';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitLoading(true);
      setMessageError('');
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (error) {
      setMessageError(error);
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    setMessageError('');
  }, [name, email, password]);

  return (
    <div className="h-full flex flex-col w-full items-center justify-center">
      <h1 className="text-lg font-medium mb-8">Daftarkan Akun Anda</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 justify-center w-full max-w-md">
        <div className="w-full">
          <Input id="nama" type="nama" placeholder="masukkan nama" label="Nama" value={name} onChange={setName} />
        </div>
        <div className="w-full">
          <Input id="email" type="email" placeholder="masukkan email" label="Email" value={email} onChange={setEmail} />
        </div>
        <div className="w-full">
          <Input id="password" type="password" placeholder="masukkan password" label="Password" value={password} onChange={setPassword} />
        </div>
        <button className="w-full bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 active:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 flex justify-center items-center gap-2" type="submit" disabled={!name || !email || !password || submitLoading}>
          Register
          { submitLoading && (
            <Spinner width={20} height={20} color="#FFFFFF" secondaryColor="" />
          ) }
        </button>
        {messageError && (<p data-testid="ntf-err" className="text-red-600 text-sm mb-2 text-center">{messageError?.message}</p>)}
        <p className="text-sm text-gray-500">
          Sudah punya akun?
          {' '}
          <Link to="/login" className="text-blue-500">Login di sini.</Link>
        </p>
      </form>
    </div>
  );
}
