import axios from 'axios';
import MenuBar from 'components/MenuBar';
import PrizeTable from 'components/PrizeTable';
import { Wheel } from 'components/Wheel';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import 'styles/main.css';

const MainLayout = () => {
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    getEvent();
    if (id !== 'init') {
      getWalletInfo();
    }
  }, []);

  const [modal, setModal] = useState(false);
  const [coinA, setCoinA] = useState(0);
  const [coinB, setCoinB] = useState(0);
  const [coinC, setCoinC] = useState(0);

  const [endDate, setendDate] = useState('');
  const [eventPrizeExchange, setEventPrizeExchange] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState(['']);
  const [backgroundImage, setBackgroundImage] = useState(
    'url("/assets/bg.png")'
  );
  const [bannerImage, setBannerImage] = useState('');

  const getWalletInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/play/auth/wallet/' + id
      );

      setCoinA(response.data.wallet[0].coinA);
      setCoinB(response.data.wallet[0].coinB);
      setCoinC(response.data.wallet[0].coinC);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/play/events/' + id
      );

      let items = response.data.data.eventPrizeRandom;
      let itemList = [];

      for (let i = 0; i < items.length; i++) {
        itemList.push(
          process.env.REACT_APP_API_URL +
            '/uploads/image/' +
            items[i].prize.image
        );
      }

      setEventPrizeRandom(itemList);

      if (response.data.data.settingInfo !== null) {
        setBackgroundImage(
          `url("${process.env.REACT_APP_API_URL}/uploads/image/${response.data.data.settingInfo.backgroundImage}")`
        );
        setBannerImage(response.data.data.settingInfo.bannerImage);
      }

      setendDate(response.data.data.event.endDate);
      setEventPrizeExchange(response.data.data.eventPrizeExchange);

      if (id === 'init') {
        window.location.href = `/${response.data.data.event.id}`;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div
        className='min-h-screen text-white'
        style={{
          backgroundImage: `${backgroundImage}`,
        }}
      >
        <div className='grid grid-cols-5'>
          <div className='col-span-5 md:col-span-3'>
            <div className='p-4 md:h-screen'>
              <div className='mb-4'>
                <MenuBar
                  getWalletInfo={getWalletInfo}
                  endDate={endDate}
                  modal={modal}
                />
              </div>
              <div
                className='h-80 md:h-4/6 overflow-y-scroll'
                style={{ background: '#0B0D48' }}
              >
                <PrizeTable eventPrizeExchange={eventPrizeExchange} />
              </div>
              <div className='bg-white mt-2'>
                <img
                  className='object-cover h-28 w-full'
                  src={`${process.env.REACT_APP_API_URL}/uploads/image/${bannerImage}`}
                ></img>
              </div>
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
                <p className='text-black text-xl'>{coinA}</p>
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
                <p className='text-black text-xl'>{coinB}</p>
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
                <p className='text-black text-xl'>{coinC}</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <Wheel
                getWalletInfo={getWalletInfo}
                params={id}
                eventPrizeRandom={eventPrizeRandom}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
