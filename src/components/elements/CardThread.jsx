import React from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiOutlineCalendar,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Parser } from 'html-to-react';
import formatDistanceDate from '../../utils/formatDistanceDate';

export default function CardThread({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments,
  upVotesBy,
  downVotesBy,
  ownerName,
  toggleVote,
  isVoted,
  isDownVoted,
  avatar,
}) {
  return (
    <div className="bg-white shadow-sm hover:shadow-md active:bg-gray-100 transition-all ease-out duration-300 border border-gray-50 p-4 rounded-lg">
      <div className="flex gap-1 flex-wrap mb-1 text-[11px] text-gray-500">
        <span className="px-2 py-[2px] border border-gray-100 rounded-xl">{category}</span>
      </div>
      <Link to={`/thread/${id}`} className="text-sm font-medium text-blue-400 mb-2 block">{title}</Link>
      <div className="text-xs text-gray-600 line-clamp-3 leading-[16px]">{Parser().parse(body)}</div>
      <ul className="flex gap-4 mt-4 w-full items-center justify-start">
        <li className="flex items-center">
          {isVoted ? (
            <AiFillLike className="cursor-pointer" onClick={() => toggleVote(id)} />
          ) : (
            <AiOutlineLike data-testid="upvote" className="cursor-pointer" onClick={() => toggleVote(id, 'up')} />
          )}
          <span className="text-xs ml-1">{upVotesBy.length || 0}</span>
        </li>
        <li className="flex items-center">
          { isDownVoted ? (
            <AiFillDislike className="cursor-pointer" onClick={() => toggleVote(id)} />
          ) : (
            <AiOutlineDislike className="cursor-pointer" onClick={() => toggleVote(id, 'down')} />
          )}
          <span className="text-xs ml-1">{downVotesBy.length || 0}</span>
        </li>
        <li className="flex items-center">
          <AiOutlineComment />
          <span className="text-xs ml-1">{totalComments}</span>
        </li>
        <li className="flex items-center">
          <AiOutlineCalendar />
          <span className="text-xs ml-1">
            {formatDistanceDate(createdAt)}
            {' '}
            lalu
          </span>
        </li>
        <li className="flex items-center">
          <img src={avatar} alt="avatar" className="w-5 h-5 rounded-full" />
          <span className="text-xs ml-1">{ownerName}</span>
        </li>
      </ul>
    </div>
  );
}

CardThread.defaultProps = {
  avatar: '',
  id: '',
  isDownVoted: false,
  isVoted: false,
  title: '',
  body: '',
  category: '',
  createdAt: '',
  ownerName: '',
  toggleVote: () => {},
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
};

CardThread.propTypes = {
  avatar: PropTypes.string,
  id: PropTypes.string,
  isDownVoted: PropTypes.bool,
  isVoted: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  createdAt: PropTypes.string,
  ownerName: PropTypes.string,
  toggleVote: PropTypes.func,
  totalComments: PropTypes.number,
  upVotesBy: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  downVotesBy: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};
