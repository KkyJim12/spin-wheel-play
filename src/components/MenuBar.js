import moment from 'moment';
import LoginIcon from 'assets/image/login.png';
import EditIcon from 'assets/image/edit.png';
import ZCoin from 'assets/image/coin-a.png';
import { useState } from 'react';

const MenuBar = (props) => {
  let today = moment().format();
  let dayDiff = moment(props.endDate).diff(today, 'days');

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const login = () => {
    setIsLogged(true);
    setLoginModalOpen(false);
  };

  const isLogin = (
    <div>
      <div className='mb-2 flex items-center space-x-4 mb-4'>
        <p className='text-2xl' style={{ color: '#05FFFE' }}>
          สวัสดี คุณโชคดี มีสุข
        </p>
        <button
          onClick={() => setIsLogged(false)}
          className='border border-black text-black bg-yellow-500 p-2 flex flex-row justify-center items-center gap-2 rounded-lg'
        >
          <img src='/assets/exit.png' alt='exit' className='w-8' />
          <p>ออกจากระบบ</p>
        </button>
      </div>
      <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
        <button
          onClick={() => setChangePasswordModalOpen(true)}
          className='border-2 border-black text-black bg-yellow-500 rounded-full p-2 flex flex-row justify-center items-center gap-2 '
        >
          <img src='/assets/edit.png' alt='exit' className='w-8' />
          แก้ไขรหัสผ่าน
        </button>
        <div className='relative flex items-center'>
          <div className='absolute'>
            <img className='w-12' src={ZCoin}></img>
          </div>
          <input
            style={{ width: '17.5rem' }}
            maxLength='11'
            className='pl-12 pr-20 h-max py-2 border-2 border-blue-300 text-black text-2xl placeholder-black bg-white rounded-full flex flex-row justify-center items-center gap-2 focus:outline-none focus:shadow-outline'
            placeholder='กรอกโค้ด'
          ></input>
          <div className='absolute right-0'>
            <button
              style={{ backgroundColor: '#05FFFE' }}
              type='button'
              className='rounded-full px-6 py-2 self-center text-black text-2xl'
            >
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const loginModal = (
    <div className='flex z-10 w-full absolute items-center justify-center'>
      <div style={{ width: '30%' }} className='py-1'>
        <div
          style={{ backgroundColor: '#FDAA01' }}
          className='flex items-center justify-center rounded-t-2xl'
        >
          <img src={LoginIcon} alt='login' />
          <span className='text-black text-4xl ml-3'>เข้าสู่ระบบ</span>
        </div>
        <div className='bg-white flex flex-col text-black space-y-5 pt-7 pb-11 rounded-b-2xl'>
          <div className='flex items-center justify-center space-x-3 mt-4'>
            <div className='grid grid-cols-6 items-center'>
              <div className='col-span-2 justify-self-end mr-3'>
                <label className='text-xl self-center'>ชื่อผู้ใช้บัญชี</label>
              </div>
              <div className='col-span-4'>
                <input
                  class='text-xl text-black border-0 ring-2 ring-gray-300 bg-white rounded-full w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid grid-cols-6 items-center'>
              <div className='col-span-2 justify-self-end mr-3'>
                <label className='text-xl self-center'>รหัสผ่าน</label>
              </div>
              <div className='col-span-4'>
                <input
                  class='text-xl text-black border-0 ring-2 ring-gray-300 bg-white rounded-full w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                ></input>
              </div>
            </div>
          </div>
          <div className='flex justify-center space-x-3'>
            <button
              onClick={() => login()}
              className='bg-purple-800 text-white px-7 py-3 rounded-full'
              type='button'
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setLoginModalOpen(false)}
              className='border border-purple-800 bg-white text-purple-800 px-7 py-3 rounded-full'
              type='button'
            >
              ยกเลิก
            </button>
          </div>
          <div className='flex justify-center font-semibold'>
            พบปัญหาการเข้าสู่ระบบหรือยังไม่มีบัญชีผู้ใช้กรุณาติดต่อแอดมิน
          </div>
        </div>
      </div>
    </div>
  );

  const changePasswordModal = (
    <div className='flex z-10 w-full absolute items-center justify-center'>
      <div style={{ width: '35%' }} className='py-1'>
        <div
          style={{ backgroundColor: '#FDAA01' }}
          className='flex items-center justify-center rounded-t-2xl py-4'
        >
          <img src={EditIcon} alt='login' />
          <span className='text-black text-4xl ml-3'>แก้ไขรหัสผ่าน</span>
        </div>
        <div className='bg-white flex flex-col text-black space-y-5 pt-7 pb-11 rounded-b-2xl'>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid grid-cols-8 items-center'>
              <div className='col-span-3 justify-self-end mr-3'>
                <label className='text-xl self-center'>รหัสผ่านเดิม</label>
              </div>
              <div className='col-span-5'>
                <input
                  class='text-xl text-black border-0 ring-2 ring-gray-300 bg-white rounded-full w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid grid-cols-8 items-center'>
              <div className='col-span-3 justify-self-end mr-3'>
                <label className='text-xl self-center'>รหัสผ่านใหม่</label>
              </div>
              <div className='col-span-5'>
                <input
                  class='text-xl text-black border-0 ring-2 ring-gray-300 bg-white rounded-full w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid grid-cols-8 items-center'>
              <div className='col-span-3 justify-self-end mr-3'>
                <label className='text-xl self-center'>
                  ยืนยันรหัสผ่านใหม่
                </label>
              </div>
              <div className='col-span-5'>
                <input
                  class='text-xl text-black border-0 ring-2 ring-gray-300 bg-white rounded-full w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                ></input>
              </div>
            </div>
          </div>
          <div className='flex justify-center space-x-3'>
            <button
              onClick={() => setChangePasswordModalOpen(false)}
              className='bg-purple-800 text-white px-7 py-3 rounded-full'
              type='button'
            >
              บันทึก
            </button>
            <button
              onClick={() => setChangePasswordModalOpen(false)}
              className='border border-purple-800 bg-white text-purple-800 px-7 py-3 rounded-full'
              type='button'
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const isGuest = (
    <>
      <div>
        <button
          onClick={() => setLoginModalOpen(true)}
          style={{ backgroundColor: '#FDAA01' }}
          className='px-5 py-2 text-black flex items-center rounded-xl'
          type='button'
        >
          <img src={LoginIcon} alt='login' />
          <span className='ml-3 text-2xl'>เข้าสู่ระบบ</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className='p-8 bg-blue-900 rounded-lg'>
        <div className='grid md:grid-cols-3 items-center'>
          <div className='col-span-2'>{isLogged ? isLogin : isGuest}</div>
          <div className='text-green-200 text-center ml-auto text-3xl col-span-1 space-y-4 mt-2 md:mt-0'>
            <p>ระยะเวลากิจกรรม</p>
            <div className='border-blue-400 border p-4'>อีก {dayDiff} วัน</div>
          </div>
        </div>
      </div>
      {loginModalOpen && loginModal}
      {changePasswordModalOpen && changePasswordModal}
    </>
  );
};

export default MenuBar;
