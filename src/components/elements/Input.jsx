import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  id, label, name, placeholder, type, value, onChange,
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm mb-1">{label}</label>
      <input id={id} name={name} type={type} placeholder={placeholder} className="w-full block text-sm border rounded-md border-gray-200 outline-none py-1 px-3 placeholder:text-sm" value={value} onChange={onChange} />
    </>
  );
}

Input.defaultProps = {
  id: '',
  label: '',
  name: '',
  onChange: () => {},
  placeholder: '',
  type: '',
  value: '',
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};
