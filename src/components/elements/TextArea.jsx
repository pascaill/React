import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea({
  id, label, name, placeholder, type, value, onChange, rows,
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm mb-1">{label}</label>
      <textarea id={id} name={name} type={type} rows={rows} placeholder={placeholder} className="w-full block text-sm border rounded-md border-gray-200 outline-none py-1 px-3 placeholder:text-sm" onChange={onChange} value={value}>{value}</textarea>
    </>
  );
}

Textarea.defaultProps = {
  id: '',
  label: '',
  name: '',
  onChange: () => {},
  placeholder: '',
  rows: '5',
  type: '',
  value: '',
};

Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};
