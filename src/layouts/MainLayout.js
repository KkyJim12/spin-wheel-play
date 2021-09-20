import { Wheel } from 'components/Wheel';
import 'styles/main.css';
import MenuBar from 'components/MenuBar';
import PrizeTable from 'components/PrizeTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const MainLayout = () => {
  useEffect(() => {
    getEvent();
  }, []);

  const [endDate, setendDate] = useState('');
  const [eventPrizeExchange, setEventPrizeExchange] = useState([]);

  let { id } = useParams();

  const getEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/play/events/' + id
      );
      console.log(response);

      setendDate(response.data.data.event.endDate);
      setEventPrizeExchange(response.data.data.eventPrizeExchange);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className='min-h-screen text-white'
      style={{
        backgroundImage: `url("/assets/bg.png")`,
      }}
    >
      <div className='grid grid-cols-5'>
        <div className='col-span-5 md:col-span-3'>
          <div className='p-4 md:h-screen'>
            <div className='mb-4'>
              <MenuBar endDate={endDate} />
            </div>
            <div
              className='h-80 md:h-4/6 overflow-y-scroll'
              style={{ background: '#0B0D48' }}
            >
              <PrizeTable eventPrizeExchange={eventPrizeExchange} />
            </div>
            <div className='bg-white h-28 mt-2'></div>
          </div>
        </div>
        <div className='col-span-5 md:col-span-2'>
          <div className='flex flex-row gap-8 p-8'>
            <div
              className='relative flex-1 flex-row text-center rounded-full'
              style={{ backgroundColor: '#05FFFE' }}
            >
              <img
                src='/assets/coin.png'
                alt='exit'
                className='absolute w-12 -left-4 -top-2'
              />
              <p className='text-black text-xl'>3</p>
            </div>
            <div
              className='relative flex-1 flex-row text-center rounded-full'
              style={{ backgroundColor: '#05FFFE' }}
            >
              <img
                src='/assets/star.png'
                alt='exit'
                className='absolute w-12 -left-4 -top-2'
              />
              <p className='text-black text-xl'>3</p>
            </div>
            <div
              className='relative flex-1 flex-row text-center rounded-full'
              style={{ backgroundColor: '#05FFFE' }}
            >
              <img
                src='/assets/wheel.png'
                alt='exit'
                className='absolute w-12 -left-4 -top-2'
              />
              <p className='text-black text-xl'>3</p>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <Wheel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
