import React from 'react';
import PropTypes from 'prop-types';

function TextInput({
  inputParams, handleInputChange, handleValue,
}) {
  const handleChange = (e) => {
    handleInputChange(e.target.value);
  };

  return (
    <input
      id={inputParams.id}
      placeholder={inputParams.placeholder}
      type={inputParams.type}
      name={inputParams.name}
      onChange={handleChange}
      value={handleValue}
      className={`border ${inputParams.type === 'text' && 'w-full'} p-2 text-slate-400 border-slate-400`}
    />
  );
}

TextInput.propTypes = {
  inputParams: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleValue: PropTypes.string,
};

export default TextInput;
