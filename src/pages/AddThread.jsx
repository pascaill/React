import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/elements/Input';
import useInput from '../hooks/useInput';
import Spinner from '../components/elements/Spinner';
import Textarea from '../components/elements/TextArea';
import { asyncCreateThread } from '../states/threads/action';

export default function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitLoading(true);
      setMessageError('');
      await dispatch(asyncCreateThread({ title, category, body }));
      navigate('/');
    } catch (error) {
      setMessageError(error);
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    setMessageError('');
  }, [title, category, body]);

  return (
    <div className="h-full flex flex-col w-full items-center justify-center">
      <h1 className="text-lg font-medium mb-8">Buat Diskusi Baru</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 justify-center w-full max-w-md">
        <div className="w-full">
          <Input id="title" type="text" placeholder="masukkan Judul" label="Judul" value={title} onChange={setTitle} />
        </div>
        <div className="w-full">
          <Input id="category" type="text" placeholder="masukkan kategori" label="Kategori" value={category} onChange={setCategory} />
        </div>
        <div className="w-full">
          <Textarea id="deskribsi" type="text" rows="5" placeholder="masukkan deskribsi" label="Deskribsi" value={body} onChange={setBody} />
        </div>
        <div className="flex justify-between gap-4">
          <Link to="/" className="w-full border border-blue-400 text-center text-blue-400 text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-100 active:bg-blue-200 transition-all duration-300">Batal</Link>
          <button className="w-full bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 active:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 flex justify-center items-center gap-2" type="submit" disabled={!title || !category || !body || submitLoading}>
            Simpan
            { submitLoading && (
              <Spinner width={20} height={20} color="#FFFFFF" secondaryColor="" />
            ) }
          </button>
        </div>
        {messageError && (<p className="text-red-600 text-sm mb-2 text-center">{messageError?.message}</p>)}
      </form>
    </div>
  );
}
