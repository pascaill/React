import { css } from '@emotion/react';
import PropTypes from 'prop-types';

export default function Textarea({
  id, label, name, placeholder, type, value, onChange, rows,
}) {
  const textareaStyle = css`
    width: 100%;
    display: block;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    padding: 8px;
    margin-bottom: 8px;
    &::placeholder {
      font-size: 14px;
    }
  `;

  return (
    <>
      <label htmlFor={id} css={css`display: block; font-size: 14px; margin-bottom: 8px;`}>{label}</label>
      <textarea
        id={id}
        name={name}
        type={type}
        rows={rows}
        placeholder={placeholder}
        css={textareaStyle}
        onChange={onChange}
        value={value}
      />
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
