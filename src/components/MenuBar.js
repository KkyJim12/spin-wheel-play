import moment from 'moment';
import LoginIcon from 'assets/image/login.png';
import { useState } from 'react';

const MenuBar = (props) => {
  let today = moment().format();
  let dayDiff = moment(props.endDate).diff(today, 'days');

  const [loginModal, setLoginModal] = useState(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const isLogin = (
    <div>
      <div className='mb-2'>
        <p style={{ color: '#05FFFE' }}>สวัสดี คุณโชคดี มีสุข</p>
      </div>
      <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
        <button className='border border-black text-black bg-yellow-500 p-2 flex flex-row justify-center items-center gap-2  '>
          <img src='/assets/exit.png' alt='exit' className='w-8' />
          <p>ออกจากระบบ</p>
        </button>
        <button className='border-2 border-black text-black bg-yellow-500 rounded-full p-2 flex flex-row justify-center items-center gap-2 '>
          <img src='/assets/edit.png' alt='exit' className='w-8' />
          แก้ไขรหัสผ่าน
        </button>
        <button className='border-2 border-blue-300 text-black bg-white rounded-full p-2 flex flex-row justify-center items-center gap-2'>
          <img src='/assets/coin.png' alt='exit' className='w-8' />
          กรอกโค้ด
        </button>
      </div>
    </div>
  );

  const isGuest = (
    <>
      <div>
        <button
          onClick={() => openLoginModal()}
          style={{ backgroundColor: '#FDAA01' }}
          className='px-5 py-2 text-black flex items-center rounded-xl'
          type='button'
        >
          <img src={LoginIcon} alt='login' />
          <span className='ml-3 text-2xl'>เข้าสู่ระบบ</span>
        </button>
      </div>
      {loginModal && (
        <div className='flex z-10 w-full absolute items-center justify-center'>
          <div className='w-3/12 py-1 rounded-2xl ' style={{ backgroundColor: '#FDAA01' }}>
            <div className='flex items-center justify-center'>
              <img src={LoginIcon} alt='login' />
              <span className='text-black text-4xl ml-3'>เข้าสู่ระบบ</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className='p-8 bg-blue-900 rounded-lg'>
      <div className='grid md:grid-cols-3 items-center'>
        <div className='col-span-2'>
          {localStorage.getItem('token') ? isLogin : isGuest}
        </div>
        <div className='text-green-200 text-center ml-auto text-3xl col-span-1 space-y-4 mt-2 md:mt-0'>
          <p>ระยะเวลากิจกรรม</p>
          <div className='border-blue-400 border p-4'>อีก {dayDiff} วัน</div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
