import CoinA from 'assets/image/coin-a.png';
import CoinB from 'assets/image/coin-b.png';
import CoinC from 'assets/image/coin-c.png';
import axios from 'axios';
import MenuBar from 'components/MenuBar';
import PrizeTable from 'components/PrizeTable';
import { Wheel } from 'components/Wheel';
import moment from 'moment';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import 'styles/main.css';
import { Link } from 'react-router-dom';

const MainLayout = () => {
  let { id } = useParams();
  const MenuBarRef = useRef();

  const [modal, setModal] = useState(false);
  const [coinA, setCoinA] = useState(0);
  const [coinB, setCoinB] = useState(0);
  const [coinC, setCoinC] = useState(0);

  const [endDate, setendDate] = useState('');
  const [eventPrizeExchange, setEventPrizeExchange] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(
    'url("/assets/bg.png")'
  );
  const [bannerImage, setBannerImage] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [popup, setPopup] = useState('');
  const [popupModal, setPopupModal] = useState(true);

  // Random Prize Transaction Modal
  const [randomPrizeTransactionModal, setRandomPrizeTransactionModal] =
    useState(false);

  const openPopupModal = () => {
    setPopupModal(true);
  };

  const openRuleModal = () => {
    MenuBarRef.current.closeLoginModal();
    MenuBarRef.current.closeChangePasswordModal();
    closePopupModal();
    closeTransactionModal();
    setRuleModal(true);
  };

  const openTransactionModal = () => {
    MenuBarRef.current.closeLoginModal();
    MenuBarRef.current.closeChangePasswordModal();
    closePopupModal();
    closeRuleModal();
    setRandomPrizeTransactionModal(true);
  };

  const closeRuleModal = () => {
    setRuleModal(false);
  };

  const closeTransactionModal = () => {
    setRandomPrizeTransactionModal(false);
  };

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

  const getWalletInfoPlay = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/play/auth/wallet/' + id
      );

      setCoinA(response.data.wallet[0].coinA);
      setTimeout(() => {
        setCoinC(response.data.wallet[0].coinC);
      }, 2000);
      setCoinB(response.data.wallet[0].coinB);
    } catch (error) {}
  };

  const getEvent = async () => {
    try {
      let response = '';

      if (!localStorage.getItem('token')) {
        response = await axios.get(
          process.env.REACT_APP_API_URL + '/api/v1/play/events/' + id
        );
      } else {
        response = await axios.get(
          process.env.REACT_APP_API_URL + '/api/v1/play/events/' + id + '/login'
        );
      }

      let itemList = response.data.data.eventPrizeRandom.map((item) => {
        return {
          imageSrc:
            process.env.REACT_APP_API_URL +
            '/uploads/image/' +
            item.prize.image,
          color: item.color,
        };
      });
      setEventPrizeRandom(itemList);

      if (response.data.data.settingInfo !== null) {
        setBackgroundImage(
          `url("${process.env.REACT_APP_API_URL}/uploads/image/${response.data.data.settingInfo.backgroundImage}")`
        );
        setBannerImage(response.data.data.settingInfo.bannerImage);

        setBannerLink(response.data.data.settingInfo.bannerLink);

        setPopup(response.data.data.settingInfo.popupImage);
      }

      setendDate(response.data.data.event.endDate);
      setEventPrizeExchange(response.data.data.eventPrizeExchange);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Rule Modal
  const [ruleModal, setRuleModal] = useState(false);

  const ruleModalShow = (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      className='z-20 flex items-center justify-center w-full h-full'
    >
      <div className='flex flex-col items-center justify-center w-5/6 pb-5 space-y-6 bg-white lg:w-2/6 rounded-2xl'>
        <div
          className='flex justify-center w-full py-3 rounded-t-2xl'
          style={{ background: '#0b0d48' }}
        >
          <h1 className='text-4xl text-white'>กติกา</h1>
        </div>
        <div className='flex flex-col px-2 py-3 text-2xl lg:px-10'>
          <div>
            <span>1.เหรียญ</span>
            <img className='inline w-10 h-10 mx-2' src={CoinA} alt='coin'></img>
            <span>สามารถหมุนวงล้อได้ 1 ครั้ง</span>
          </div>
          <div className='mt-5'>
            <span>2.หมุนวงล้อ 1 ครั้ง จะได้</span>
            <img
              className='inline w-10 h-10 mx-2'
              src={CoinB}
              alt='coin'
            ></img>{' '}
            <span>1 เหรียญ เพื่อนำไปแลกของรางวัลในตาราง</span>
          </div>
          <div className='mt-5'>
            <span>3.เหรียญ</span>
            <img
              className='inline w-10 h-10 mx-2'
              src={CoinC}
              alt='coin'
            ></img>{' '}
            <span>
              สามารถหาได้จากการ หมุนวงล้อ เพื่อนำไปแลกของรางวัลสุดพิเศษในตาราง
            </span>
          </div>
        </div>
        <button
          style={{ background: '#0b0d48' }}
          onClick={() => closeRuleModal()}
          className='px-10 py-5 text-white border-2 rounded-3xl hover:bg-red-300'
        >
          ปิด
        </button>
      </div>
    </div>
  );

  const [prizeRandomTransaction, setPrizeRandomTransaction] = useState([]);
  const [prizeExchangeTransaction, setPrizeExchangeTransaction] = useState([]);

  const getPrizeRandomTransaction = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          '/api/v1/play/auth/prize-random-transaction/' +
          id
      );

      let result = response.data.prizeRandomTransaction;
      let transaction = [];

      for (let i = 0; i < result.length; i++) {
        transaction.push(result[i]);
      }
      setPrizeRandomTransaction(transaction);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getPrizeExchangeTransaction = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          '/api/v1/play/auth/prize-exchange-transaction/' +
          id
      );

      let result = response.data.prizeExchangeTransaction;
      let transaction = [];

      for (let i = 0; i < result.length; i++) {
        transaction.push(result[i]);
      }
      setPrizeExchangeTransaction(transaction);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getPrizeRandomTransaction();
      getPrizeExchangeTransaction();
    }
  }, [randomPrizeTransactionModal]);

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getWalletInfo();
    }
  }, []);

  let wheel = null;
  if (eventPrizeRandom.length > 0) {
    wheel = (
      <Wheel
        eventPrizeRandom={eventPrizeRandom}
        getWalletInfo={getWalletInfoPlay}
        params={id}
      />
    );
  }

  const closePopupModal = () => {
    setPopupModal(false);
  };

  return (
    <>
      {popupModal && popup && (
        <div className='absolute z-20 flex flex-col items-center justify-center w-full h-screen'>
          <div className='relative w-5/6 space-y-6 bg-white lg:w-3/6 '>
            <div className='absolute right-0 px-2 py-1 mt-2 mr-2 text-white bg-black bg-opacity-50 rounded-lg'>
              <button
                onClick={() => closePopupModal()}
                type='button rounded-full'
              >
                ปิด
              </button>
            </div>
            <img
              className='w-full'
              src={process.env.REACT_APP_API_URL + '/uploads/image/' + popup}
            ></img>
          </div>
        </div>
      )}
      {ruleModal && ruleModalShow}
      {randomPrizeTransactionModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className='z-20 flex flex-col items-center justify-center w-full h-screen'
        >
          <div className='w-5/6 px-4 py-5 space-y-6 bg-white border-4 border-yellow-500 lg:px-20 lg:w-3/6 rounded-2xl'>
            <h1 className='text-3xl text-black'>ประวัติการสุ่ม</h1>
            <div className='h-32 overflow-x-scroll overflow-y-scroll lg:overflow-x-hidden'>
              <table className='w-full table-fixed'>
                <thead className='sticky top-0'>
                  <tr className='text-left'>
                    <th className='w-24 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      ลำดับ
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-3/6'>
                      ของรางวัล
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      วันที่
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      เวลา
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prizeRandomTransaction.map((item, index) => {
                    return (
                      <tr
                        index={index}
                        key={item.id}
                        className='text-left border-t-2 border-black'
                      >
                        <td className='py-2 text-xl'>{index + 1}</td>
                        <td className='py-2 text-xl'>{item.prize.name}</td>
                        <td className='py-2 text-xl'>
                          {moment(item.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className='py-2 text-xl'>
                          {moment(item.createdAt).format('hh:mm A')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <h1 className='text-3xl text-black'>ประวัติการแลกของรางวัล</h1>
            <div className='h-32 overflow-scroll overflow-x-scroll lg:overflow-x-hidden'>
              <table className='w-full table-fixed'>
                <thead className='sticky top-0'>
                  <tr className='text-left'>
                    <th className='w-24 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      ลำดับ
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-3/6'>
                      ของรางวัล
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      วันที่
                    </th>
                    <th className='w-32 py-2 text-xl bg-yellow-300 lg:w-1/6'>
                      เวลา
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prizeExchangeTransaction.map((item, index) => {
                    return (
                      <tr
                        index={index}
                        key={item.id}
                        className='text-left border-t-2 border-black'
                      >
                        <td className='py-2 text-xl'>{index + 1}</td>
                        <td className='py-2 text-xl'>{item.prize.name}</td>
                        <td className='py-2 text-xl'>
                          {moment(item.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className='py-2 text-xl'>
                          {moment(item.createdAt).format('hh:mm A')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className='flex justify-center'>
              <button
                onClick={() => closeTransactionModal()}
                className='px-10 py-5 text-2xl text-black bg-yellow-500 border-2 rounded-3xl'
              >
                ปิด
              </button>
            </div>
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
          <div className='col-span-5 lg:col-span-3'>
            <div className='p-4 lg:h-screen'>
              <div className='mb-4'>
                <MenuBar
                  openPopupModal={openPopupModal}
                  ref={MenuBarRef}
                  closePopupModal={closePopupModal}
                  closeRuleModal={closeRuleModal}
                  closeTransactionModal={closeTransactionModal}
                  getPrizeRandomTransaction={getPrizeRandomTransaction}
                  getWalletInfo={getWalletInfo}
                  endDate={endDate}
                  modal={modal}
                />
              </div>
              <div
                className='overflow-y-scroll lg:h-3/5'
                style={{ background: '#0B0D48', height: 560 }}
              >
                <PrizeTable
                  getEvent={getEvent}
                  getWalletInfo={getWalletInfo}
                  eventPrizeExchange={eventPrizeExchange}
                />
              </div>
              <Link
                to={{ pathname: bannerLink ? bannerLink : '' }}
                target='_blank'
              >
                <div className='mt-2 bg-white'>
                  <img
                    className='object-cover w-full h-40'
                    src={`${process.env.REACT_APP_API_URL}/uploads/image/${bannerImage}`}
                  ></img>
                </div>
              </Link>
            </div>
          </div>
          <div className='col-span-5 lg:col-span-2'>
            <div className='flex flex-col gap-8 p-8 lg:flex-row'>
              <div
                className='relative flex-row flex-1 text-center rounded-full'
                style={{ backgroundColor: '#05FFFE' }}
              >
                <img
                  src='/assets/coin.png'
                  alt='exit'
                  className='absolute w-12 -left-4 -top-2'
                />
                <p className='text-xl text-black'>{coinA}</p>
              </div>
              <div
                className='relative flex-row flex-1 text-center rounded-full'
                style={{ backgroundColor: '#05FFFE' }}
              >
                <img
                  src='/assets/star.png'
                  alt='exit'
                  className='absolute w-12 -left-4 -top-2'
                />
                <p className='text-xl text-black'>{coinC}</p>
              </div>
              <div
                className='relative flex-row flex-1 text-center rounded-full'
                style={{ backgroundColor: '#05FFFE' }}
              >
                <img
                  src='/assets/wheel.png'
                  alt='exit'
                  className='absolute w-12 -left-4 -top-2'
                />
                <p className='text-xl text-black'>{coinB}</p>
              </div>
            </div>
            <div className='flex flex-row justify-end px-8 space-x-3'>
              <button
                style={{ backgroundColor: '#0002ff' }}
                className='flex-1 w-1/6 h-10 px-3 py-1 text-2xl text-white rounded-2xl lg:flex-none'
                type='button'
                onClick={() => openRuleModal()}
              >
                กติกา
              </button>
              <button
                style={{ backgroundColor: '#0002ff' }}
                className='flex-1 w-1/6 h-10 px-3 py-1 text-2xl text-white rounded-2xl lg:flex-none'
                type='button'
                onClick={() => openTransactionModal()}
              >
                ประวัติ
              </button>
            </div>
            <div className='flex justify-center'>{wheel}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
