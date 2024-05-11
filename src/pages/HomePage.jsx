import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import CardThread from '../components/elements/CardThread';
import { asyncGetThreads, asyncToogleVoteThread } from '../states/threads/action';
import { asyncGetusers } from '../states/users/action';
import Spinner from '../components/elements/Spinner';
import ModalWarning from '../components/elements/ModalWarning';

export default function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const auth = useSelector((states) => states.auth);
  const firstRun = useRef(true);

  const [modalWarning, setModalWarning] = useState(false);
  const [filter, setFIlter] = useState('');

  const dispatch = useDispatch();

  const toggleVote = async (id, vote) => {
    if (auth.data) {
      await asyncToogleVoteThread(id, vote);
      await dispatch(asyncGetThreads(false));
    } else {
      setModalWarning(true);
    }
  };

  const category = threads?.data?.map((item) => item.category);

  const reMapthreads = filter
    ? threads?.data?.filter((item) => item.category === filter)
    : threads?.data;

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncGetThreads());
      dispatch(asyncGetusers());
      firstRun.current = false;
    }
  }, []);

  if (threads.loading || users.loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (threads.error || users.error) {
    return (
      <div className="flex justify-center items-center h-full">
        Terjadi Kesalahan...
      </div>
    );
  }

  return (
    <>
      <ModalWarning isOpen={modalWarning} setIsOpen={setModalWarning} />
      <div className="py-4">
        <div className="flex gap-4 my-4 justify-end items-center border-b border-b-gray-100 pb-4">
          <select id="category" onChange={(e) => setFIlter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xs p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Semua Kategori</option>
            { category.length && [...new Set(category)]?.map((item) => (
              <option value={item} key={item}>{item}</option>
            )) }
          </select>
          { auth.data && (
            <Link to="/thread-add" className="w-10 h-10 bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 active:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 flex justify-center items-center gap-2" type="button">
              <AiOutlinePlus color="#FFF" />
            </Link>
          ) }
        </div>
        <h1 className="text-lg font-medium mb-4">Diskusi yang tersedia</h1>
        <div className="flex flex-col gap-4">
          { reMapthreads?.map((item) => {
            const owner = users.data.find((user) => user.id === item.ownerId);
            const isVoted = auth.data ? item.upVotesBy.includes(auth.data.id) : false;
            const isDownVoted = auth.data ? item.downVotesBy.includes(auth.data.id) : false;

            return (
              <CardThread
                {...item}
                userData={auth.data}
                ownerName={owner.name}
                key={item.id}
                toggleVote={toggleVote}
                isVoted={isVoted}
                isDownVoted={isDownVoted}
                avatar={owner.avatar}
              />
            );
          }) }
        </div>
      </div>
    </>
  );
}
