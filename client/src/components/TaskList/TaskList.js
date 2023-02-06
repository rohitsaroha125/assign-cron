import React, { useState, useEffect } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import Loader from '../UI/Loader/Loader';
import Input from '../UI/TextInput/TextInput';
import 'react-tabs/style/react-tabs.css';
import './TaskList.css';

const taskTabs = ['All', 'Completed', 'Pending'];

function TaskList({
  loading, tasks, handleTab, activeTab, handleTabClick,
}) {
  const [searchValue, setSearchValue] = useState(null);

  const handleInputChange = (val) => {
    setSearchValue(val);
  };

  useEffect(() => {
    let delayDebounceFn;
    if (searchValue !== null) {
      delayDebounceFn = setTimeout(() => {
        handleTab(searchValue);
      }, 3000);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <div className="pt-10">
      {
        loading && <Loader />
      }
      <Tabs className="new-react-tabs">
        <TabList>
          {
            taskTabs.map((tab, i) => <Tab key={i} selectedIndex={activeTab} onClick={() => handleTabClick(tab, (i))}>{`${tab} Tasks`}</Tab>)
          }
        </TabList>
        <div className="border border-slate-200">
          <div className="pt-6 pb-2 pr-2 w-full flex justify-end items-end">
            <div className="w-2/5">
              <Input
                inputParams={{
                  id: 'searchTask',
                  placeholder: 'Search Task...',
                  type: 'text',
                  name: 'searchTask',
                }}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          {
            taskTabs.map((item, i) => (
              <TabPanel key={i}>
                {
                tasks.length ? (
                  <>
                    {
                    tasks.map((task) => <SingleTask key={task._id} id={task._id} title={task.title} status={task.status} handleTab={handleTab} />)
                    }
                  </>
                ) : <p>No Tasks Found</p>
              }
              </TabPanel>
            ))
          }
        </div>
      </Tabs>
    </div>
  );
}

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.any,
  handleTab: PropTypes.func,
  activeTab: PropTypes.number,
  handleTabClick: PropTypes.func,
};

export default TaskList;
