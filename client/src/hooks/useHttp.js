import axios from 'axios';
import { useState } from 'react';
import toastr from 'toastr';

const useHttp = (transformData) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (reqOptions) => {
    setLoading(true);

    reqOptions.headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await axios(reqOptions);
      setLoading(false);
      transformData(data);
    } catch (err) {
      toastr.error(err.message, 'Error');
      setLoading(false);
    }
  };

  return { loading, sendRequest };
};

export default useHttp;
