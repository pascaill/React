import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from './Modal';

export default function ModalWarning({ isOpen, setIsOpen }) {
  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-base mb-4 text-center font-medium">Anda harus Login terlebih dahulu.</h1>
      <div className="mt-4 flex gap-4">
        <button className="w-full border border-blue-400 text-center text-blue-400 text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-100 active:bg-blue-200 transition-all duration-300" type="button" onClick={() => setIsOpen(false)}>Kembali</button>
        <Link to="/login" className="w-full block text-center border border-blue-400 bg-blue-400 text-white text-base font-medium rounded-lg py-1 px-3 hover:bg-blue-500 hover:border-blue-500 active:bg-blue-600 active:border-blue-600 transition-all duration-300" type="button">Login</Link>
      </div>
    </Modal>
  );
}

ModalWarning.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};

ModalWarning.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
