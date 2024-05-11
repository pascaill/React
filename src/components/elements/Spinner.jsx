import React from 'react';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';

export default function Spinner(props) {
  const {
    color, secondaryColor, height, width,
  } = props;
  return (
    <Oval
      height={height}
      width={width}
      color={color}
      visible
      ariaLabel="oval-loading"
      secondaryColor={secondaryColor}
      strokeWidth={2}
      strokeWidthSecondary={2}
      {...props}
    />
  );
}

Spinner.defaultProps = {
  color: 'rgb(56 189 248)',
  height: 80,
  secondaryColor: 'rgb(240 249 255)',
  width: 80,
};

Spinner.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  secondaryColor: PropTypes.string,
  width: PropTypes.number,
};
