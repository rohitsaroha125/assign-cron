import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';
import useHttp from '../../hooks/useHttp';

function AddTask({ handleRequest }) {
  const transformData = (data) => {
    if (data.status) {
      handleRequest();
    }
  };

  const { sendRequest: handleCreateTask } = useHttp(transformData);
  const [taskName, setTaskName] = useState('');
  const [validation, setValidation] = useState(true);

  const handleInputChange = (val) => {
    if (val !== '') {
      setValidation(true);
    }
    setTaskName(val);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (taskName === '') {
      setValidation(false);
    } else {
      setValidation(true);
      const reqOptions = {
        url: `${process.env.REACT_APP_API_CALL}/tasks`,
        method: 'POST',
        data: { title: taskName },
      };

      handleCreateTask(reqOptions);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold pb-2">TO-DO LIST</h1>
      <p className="text-lg pb-6">Describe your list...</p>
      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-4">
          <Input
            inputParams={{
              id: 'addTask',
              placeholder: 'Enter Task Name...',
              type: 'text',
              name: 'addTask',
            }}
            handleValue={taskName}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <Button type="primary" handleClick={handleClick}>Add Task</Button>
        </div>
        {
          !validation && <p className="text-red">Please enter title</p>
        }
      </div>
    </>
  );
}

AddTask.propTypes = {
  handleRequest: PropTypes.func,
};

export default AddTask;
