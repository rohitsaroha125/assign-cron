import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button
      onClick={props.handleClick}
      className={`${props.type === 'primary'
        ? 'bg-cyan-600 text-white' : 'bg-gray-400 text-black'} 
      flex justify-center items-center w-full h-full font-bold`}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Button;
