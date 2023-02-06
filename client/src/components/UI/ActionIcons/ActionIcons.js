import React from 'react';
import PropTypes from 'prop-types';

function ActionIcons(props) {
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <img className="h-5 cursor-pointer" onClick={props.handleClick} src={props.img} alt={props.altText} />;
}

ActionIcons.propTypes = {
  img: PropTypes.any,
  altText: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ActionIcons;
