import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ userData, onSignOut }) {
  return (
    <header className="fixed top-0 w-full left-0 flex justify-center  py-4 border-b border-gray-200 bg-white px-4">
      <div className="max-w-3xl w-full flex items-center justify-between  px-4">
        <h3>Forum Diskusi</h3>
        { userData ? (
          <div className="text-xl flex justify-end items-center">
            <img src={userData.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <span data-testid="user-name" className="text-sm mx-2">{userData.name}</span>
            <AiOutlineLogout className="cursor-pointer" onClick={() => onSignOut()} />
          </div>
        ) : (
          <Link to="/login" className="text-xl flex justify-end items-center cursor-pointer">
            <BsPerson />
            <span className="text-sm ml-2">Login</span>
          </Link>
        ) }
      </div>
    </header>
  );
}

Header.defaultProps = {
  userData: null,
  onSignOut: () => {},
};

Header.propTypes = {
  userData: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  onSignOut: PropTypes.func,
};
