import './App.css';
import { useEffect, useState } from 'react';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TaskList/TaskList';
import useHttp from './hooks/useHttp';
import Loader from './components/UI/Loader/Loader';
import 'toastr/build/toastr.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const transformData = (data) => {
    setTasks(data.data);
  };

  const { loading, sendRequest: getTasksList } = useHttp(transformData);

  const handleRequest = (type = null, search = null) => {
    let url = `${process.env.REACT_APP_API_CALL}/tasks?`;

    if (type) {
      url += `status=${type}&`;
    }

    if (search) {
      url += `title=${search}&`;
    }

    const reqOptions = {
      method: 'GET',
      url,
    };
    getTasksList(reqOptions);
  };

  const handleTabClick = (tab, index) => {
    if (index !== activeTab) {
      setActiveTab(index);
      if (tab.toLowerCase() === 'all') {
        handleRequest();
      } else {
        handleRequest(tab.toLowerCase());
      }
    }
  };

  const handleTab = (search = null) => {
    if (activeTab === 0) {
      handleRequest(null, search);
    } else if (activeTab === 1) {
      handleRequest('completed', search);
    } else {
      handleRequest('pending', search);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <div className="flex w-full justify-center py-10">
      {
        loading && <Loader />
      }
      <div className="w-7/12">
        <AddTask handleRequest={handleRequest} handleTab={handleTab} />
        <TaskList
          loading={loading}
          tasks={tasks}
          handleTab={handleTab}
          handleTabClick={handleTabClick}
          handleRequest={handleRequest}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}

export default App;
