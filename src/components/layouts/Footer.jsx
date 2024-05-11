import React from 'react';
import { BsHouseDoor, BsBarChartLine } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full left-0 flex justify-center border-t border-gray-200 bg-white">
      <div className="max-w-3xl w-full flex">
        <Link to="/" className="w-full text-xl flex justify-center items-center py-4 hover:bg-blue-50 active:bg-blue-100 ease-out transition-all duration-300 cursor-pointer"><BsHouseDoor /></Link>
        <Link to="/leaderboard" className="w-full text-xl flex justify-center items-center py-4 hover:bg-blue-50 active:bg-blue-100 ease-out transition-all duration-300 cursor-pointer"><BsBarChartLine /></Link>
      </div>
    </footer>
  );
}
