import React from 'react';
import PropTypes from 'prop-types';

function CheckboxInput({
  inputParams, handleCheck, checkValue,
}) {
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  };

  return (
    <input
      id={inputParams.id}
      placeholder={inputParams.placeholder}
      type={inputParams.type}
      name={inputParams.name}
      onClick={handleCheckbox}
      checked={checkValue}
    />
  );
}

CheckboxInput.propTypes = {
  inputParams: PropTypes.object,
  handleCheck: PropTypes.func,
  checkValue: PropTypes.bool,
};

export default CheckboxInput;
