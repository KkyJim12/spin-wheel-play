import axios from 'axios';
import { useEffect } from 'react';

const InitLayout = () => {
  const getDefaultEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/play/events/default/init'
      );

      console.log(response);
      window.location.href = '/' + response.data.data.event.id;
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDefaultEvent();
  }, []);
  return <></>;
};

export default InitLayout;
