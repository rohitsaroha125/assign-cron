import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Input from '../TextInput/TextInput';
import useHttp from '../../../hooks/useHttp';
import Loader from '../Loader/Loader';

export default function Modal(props) {
  const transformData = (data) => {
    if (data.status) {
      if (props.type === 'edit') {
        toastr.success('Task Updated Succesfully', 'Success');
      } else {
        toastr.success('Task Deleted Succesfully', 'Success');
      }
      props.handleClose();
      props.handleTab();
    }
  };

  const { loading, sendRequest: handleRequest } = useHttp(transformData);
  const [taskName, setTaskName] = useState(props.taskDetails.title);
  const [validation, setValidation] = useState(true);

  const handleInputChange = (val) => {
    if (val !== '') {
      setValidation(true);
    }
    setTaskName(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqOptions = {
      url: `${process.env.REACT_APP_API_CALL}/tasks/${props.taskDetails.id}`,
    };

    if (props.type === 'edit') {
      reqOptions.method = 'PATCH';
      reqOptions.data = { title: taskName };
    } else {
      reqOptions.method = 'DELETE';
    }

    handleRequest(reqOptions);
  };

  return (
    <>
      {
        loading && <Loader />
      }
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                { props.heading }
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.handleClose()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              {
                    props.type === 'edit' ? (
                      <>
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
                        {
                        !validation && <p className="text-red">Please enter title</p>
                      }
                      </>
                    ) : (
                      <p className="my-4 text-slate-500 text-lg leading-relaxed text-center">
                        Are you sure you want to delete this task?
                        <br />
                        <b>{ props.taskDetails.title }</b>
                      </p>
                    )
                }
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.handleClose()}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                {
                    props.type === 'edit' ? 'Save Changes' : 'Delete Task'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

Modal.propTypes = {
  heading: PropTypes.string,
  type: PropTypes.string,
  taskDetails: PropTypes.any,
  handleClose: PropTypes.string,
  handleTab: PropTypes.func,
};
