import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

export default function Modal({ children, isOpen, id }) {
  const customStyles = {
    content: {
      inset: 0,
      position: 'relative',
      maxWidth: '100%',
      maxHeight: '600px',
      overflow: 'auto',
      padding: '40px',
      minWidth: 'auto',
      borderRadius: '10px',
      borderColor: '#FFF',
      boxShadow: '0px 0px 15px 1px rgba(0,0,0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0, 0.3)',
    },
  };

  return (
    <ReactModal
      id={id}
      isOpen={isOpen}
      style={customStyles}
      appElement={document.getElementById('root') || undefined}
    >
      {children}
    </ReactModal>
  );
}

Modal.defaultProps = {
  children: null,
  id: 'react-modal',
  isOpen: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
};
