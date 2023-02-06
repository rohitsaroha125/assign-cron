import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import useHttp from '../../hooks/useHttp';
import CheckboxInput from '../UI/CheckboxInput/CheckboxInput';
import EditIcon from '../../assets/edit.png';
import DeleteIcon from '../../assets/delete.png';
import ActionIcons from '../UI/ActionIcons/ActionIcons';
import Loader from '../UI/Loader/Loader';
import Modal from '../UI/Modal/Modal';

function SingleTask({
  id, title, status, handleTab,
}) {
  const [checked, setChecked] = useState(status);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const transformData = (data) => {
    if (data.status) {
      toastr.success('Task Updated Succesfully', 'Success');
      setChecked(data.data.status);
      handleTab();
    }
  };

  const { loading, sendRequest: updateTask } = useHttp(transformData);

  const handleCheck = (check) => {
    const checkStatus = check ? 'completed' : 'pending';
    const reqOptions = {
      url: `${process.env.REACT_APP_API_CALL}/tasks/${id}`,
      method: 'PATCH',
      data: { status: checkStatus },
    };

    updateTask(reqOptions);
  };

  return (
    <>
      <div className="border-b border-slate-200 py-6 px-3 flex justify-between">
        {
        loading && <Loader />
      }
        <div className="w-11/12">
          <CheckboxInput
            inputParams={{
              id: `task-${id}`,
              placeholder: 'Enter Task Name...',
              type: 'checkbox',
              name: 'addTask',
            }}
            value={id}
            handleCheck={handleCheck}
            checkValue={checked === 'completed'}
          />
          <label htmlFor={`task-${id}`} className="pl-2">{title}</label>
        </div>
        <div className="w-1/12 flex justify-between">
          <ActionIcons img={EditIcon} altText="Edit Icon" handleClick={() => setEditModal((prevState) => !prevState)} />
          <ActionIcons img={DeleteIcon} handleClick={() => setDeleteModal((prevState) => !prevState)} altText="Delete Icon" />
        </div>
      </div>
      {
        editModal && <Modal heading="Edit Task" type="edit" taskDetails={{ id, title }} handleClose={() => setEditModal(false)} handleTab={handleTab} />
      }
      {
        deleteModal && <Modal heading="Delete Task" type="delete" taskDetails={{ id, title }} handleClose={() => setDeleteModal(false)} handleTab={handleTab} />
      }
    </>
  );
}

export default SingleTask;

SingleTask.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  status: PropTypes.string,
  handleTab: PropTypes.func,
};
