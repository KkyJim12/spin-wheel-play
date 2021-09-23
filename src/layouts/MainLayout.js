import axios from 'axios';
import MenuBar from 'components/MenuBar';
import PrizeTable from 'components/PrizeTable';
import { Wheel } from 'components/Wheel';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'styles/main.css';
import CoinA from 'assets/image/coin-a.png';
import CoinB from 'assets/image/coin-b.png';
import CoinC from 'assets/image/coin-c.png';

const MainLayout = () => {
  let { id } = useParams();

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
  const [eventPrizeRandom, setEventPrizeRandom] = useState([]);
  const [eventPrizeRandomColor, setEventPrizeRandomColor] = useState([]);
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
    } catch (error) {}
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

      let colors = [];

      for (let i = items.length-1; i >=0 ; i--) {
        colors.push(items[i].color);
      }

      console.log(colors)

      setEventPrizeRandom(itemList);
      setEventPrizeRandomColor(colors);

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

  // Rule Modal
  const [ruleModal, setRuleModal] = useState(false);

  return (
    <>
      {ruleModal && (
        <div
          style={{
            top: '50%',
            left: '50%',
            width: 600,
            height: 550,
            marginTop: -275,
            marginLeft: -300,
          }}
          className='flex absolute items-center justify-center z-20'
        >
          <div className='flex flex-col items-center w-full justify-center bg-white pb-5 w-full rounded-2xl space-y-6'>
            <div
              className='w-full flex justify-center rounded-t-2xl py-3'
              style={{ background: '#0b0d48' }}
            >
              <h1 className='text-4xl text-white'>กติกา</h1>
            </div>
            <div className='flex flex-col text-2xl py-3'>
              <p className='flex'>
                1.เหรียญ{' '}
                <img className='w-10 mx-2' src={CoinA} alt='coin'></img>
                สามารถหมุนวงล้อได้ 1 ครั้ง
              </p>
              <p className='flex mt-4'>
                2.หมุนวงล้อ 1 ครั้ง จะได้เหรียญ
                <img className='w-10 h-10 mx-2' src={CoinB} alt='coin'></img> 1
                เหรียญ
              </p>
              <p>&nbsp;&nbsp;เพื่อนำไปแลกของรางวัลในตาราง</p>
              <p className='flex mt-4'>
                3.เหรียญ
                <img
                  className='w-10 h-10 mx-2'
                  src={CoinC}
                  alt='coin'
                ></img>{' '}
                สามารถหาได้จากการหมุนวงล้อ
              </p>
              <p>&nbsp;&nbsp;เพื่อนำไปแลกของรางวัลสุดพิเศษในตาราง</p>
            </div>
            <button
              style={{ background: '#0b0d48' }}
              onClick={() => setRuleModal(false)}
              className='border-2 text-white px-10 py-5 rounded-3xl hover:bg-red-300'
            >
              ปิด
            </button>
          </div>
        </div>
      )}
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
            <div className='flex justify-end px-8 space-x-3'>
              <button
                style={{ backgroundColor: '#0002ff' }}
                className='px-3 py-1 text-white rounded-2xl w-1/6 h-10 text-2xl'
                type='button'
                onClick={() => setRuleModal(true)}
              >
                กติกา
              </button>
              <button
                style={{ backgroundColor: '#0002ff' }}
                className='px-3 py-1 text-white rounded-2xl w-1/6 h-10 text-2xl'
                type='button'
              >
                ประวัติ
              </button>
            </div>
            <div className='flex justify-center items-center'>
              <Wheel
                getWalletInfo={getWalletInfo}
                params={id}
                eventPrizeRandom={eventPrizeRandom}
                eventPrizeRandomColor={eventPrizeRandomColor}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
