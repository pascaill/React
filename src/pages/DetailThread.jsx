import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineLike, AiOutlineDislike, AiOutlineCalendar, AiFillDislike, AiFillLike,
} from 'react-icons/ai';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Parser } from 'html-to-react';

import { asyncCommentThread, asyncGetThreadDetail } from '../states/threadDetail/action';
import formatDistanceDate from '../utils/formatDistanceDate';
import Spinner from '../components/elements/Spinner';
import { asyncToogleVoteComment, asyncToogleVoteThread } from '../states/threads/action';
import ModalWarning from '../components/elements/ModalWarning';
import Textarea from '../components/elements/TextArea';
import useInput from '../hooks/useInput';

export default function DetailThread() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.threadDetail);
  const { data: dataAuth } = useSelector((states) => states.auth);
  const firstRun = useRef(true);

  const [content, setContent] = useInput('');
  const [modalWarning, setModalWarning] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const toggleVote = async (dataId, vote) => {
    if (dataAuth) {
      await asyncToogleVoteThread(dataId, vote);
      await dispatch(asyncGetThreadDetail(id, false));
    } else {
      setModalWarning(true);
    }
  };

  const toggleVoteComment = async (threadId, commentId, vote) => {
    await asyncToogleVoteComment(threadId, commentId, vote);
    await dispatch(asyncGetThreadDetail(id, false));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitLoading(true);
      setMessageError('');
      await dispatch(asyncCommentThread(id, { content }));
      setContent({ target: { value: '' } });
      await dispatch(asyncGetThreadDetail(id, false));
    } catch (err) {
      setMessageError(err.message);
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncGetThreadDetail(id));
      firstRun.current = false;
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        Terjadi Kesalahan...
      </div>
    );
  }

  const isVoted = dataAuth ? data?.upVotesBy.includes(dataAuth?.id) : false;
  const isDownVoted = dataAuth ? data?.downVotesBy.includes(dataAuth?.id) : false;

  return (
    <>
      <ModalWarning isOpen={modalWarning} setIsOpen={setModalWarning} />
      <div className="py-6">
        <div>
          <h1 className="text-base font-medium text-gray-800 mb-2">{data.title}</h1>
          <div className="flex gap-1 items-center flex-wrap mb-4 text-[11px] text-gray-500">
            {`#${data.category}`}
          </div>
          <div className="text-xs text-gray-600">{Parser().parse(data.body)}</div>
          <ul className="flex gap-4 mt-4 w-full items-center justify-start">
            <li className="flex items-center">
              {isVoted ? (
                <AiFillLike className="cursor-pointer" onClick={() => toggleVote(data.id)} />
              ) : (
                <AiOutlineLike className="cursor-pointer" onClick={() => toggleVote(data.id, 'up')} />
              )}
              <span className="text-xs ml-1">{data.upVotesBy.length || 0}</span>
            </li>
            <li className="flex items-center">
              { isDownVoted ? (
                <AiFillDislike className="cursor-pointer" onClick={() => toggleVote(data.id)} />
              ) : (
                <AiOutlineDislike className="cursor-pointer" onClick={() => toggleVote(data.id, 'down')} />
              )}
              <span className="text-xs ml-1">{data.downVotesBy.length || 0}</span>
            </li>
            <li className="flex items-center">
              <AiOutlineCalendar />
              <span className="text-xs ml-1">
                {formatDistanceDate(data.createdAt)}
                {' '}
                lalu
              </span>
            </li>
            <li className="flex items-center">
              <span className="text-xs mr-2">Dibuat oleh</span>
              <img src={data.owner.avatar} alt="avatar" className="w-5 h-5 rounded-full" />
              <span className="text-xs ml-1">{data.owner.name}</span>
            </li>
          </ul>
          <div className="pt-6 pb-4">
            <label htmlFor="comment" className="text-xs font-medium block">Beri Komentar</label>
            { dataAuth ? (
              <form onSubmit={onSubmit}>
                <Textarea id="password" type="text" placeholder="masukkan Komentar" value={content} onChange={setContent} />
                {messageError && (<p className="text-red-600 text-sm mt-2 text-center">{messageError}</p>)}
                <button className="w-full bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 active:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 flex justify-center items-center gap-2 mt-2" type="submit" disabled={!content || submitLoading}>
                  Kirim
                  { submitLoading && (
                  <Spinner width={20} height={20} color="#FFFFFF" secondaryColor="" />
                  ) }
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-500 my-2">
                <Link to="/login" className="text-blue-500">Login</Link>
                {' '}
                untuk memberi komentar
              </p>
            ) }

          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium block">
            Komentar(
            {data.comments.length}
            )
          </h3>
          <div>
            { data.comments?.map((item) => {
              const isVotedComment = dataAuth ? item.upVotesBy.includes(dataAuth.id) : false;
              const isDownVotedComment = dataAuth ? item.downVotesBy.includes(dataAuth.id) : false;

              return (
                <div className="py-4 border-b border-gray-100" key={item.id}>
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                    <div className="flex items-center mb-1">
                      <img src={item.owner.avatar} alt="avatar" className="w-5 h-5 rounded-full mr-1" />
                      <h3 className="font-medium">{item.owner.name}</h3>
                    </div>
                    <span className="text-gray-400 text-[10px]">
                      {formatDistanceDate(item.createdAt)}
                      {' '}
                      lalu
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{Parser().parse(item.content)}</p>
                  <ul className="flex gap-4 mt-4 w-full items-center justify-start">
                    <li className="flex items-center">
                      {isVotedComment ? (
                        <AiFillLike className="cursor-pointer" onClick={() => toggleVoteComment(id, item.id)} />
                      ) : (
                        <AiOutlineLike className="cursor-pointer" onClick={() => toggleVoteComment(id, item.id, 'up')} />
                      )}
                      <span className="text-xs ml-1">{item.upVotesBy.length || 0}</span>
                    </li>
                    <li className="flex items-center">
                      { isDownVotedComment ? (
                        <AiFillDislike className="cursor-pointer" onClick={() => toggleVoteComment(id, item.id)} />
                      ) : (
                        <AiOutlineDislike className="cursor-pointer" onClick={() => toggleVoteComment(id, item.id, 'down')} />
                      )}
                      <span className="text-xs ml-1">{item.downVotesBy.length || 0}</span>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
