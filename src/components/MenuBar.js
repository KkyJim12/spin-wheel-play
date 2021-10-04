import moment from 'moment';
import LoginIcon from 'assets/image/login.png';
import EditIcon from 'assets/image/edit.png';
import ZCoin from 'assets/image/coin-a.png';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MenuBar = forwardRef((props, ref) => {
  let { id } = useParams();
  let today = moment().format();
  let dayDiff = moment(props.endDate).diff(today, 'days');

  // UI Function
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [fullname, setFullname] = useState(localStorage.getItem('fullname'));

  // Login Function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Change Password Function
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');

  // Redeem Code Function
  const [key, setKey] = useState('');
  const [keyError, setKeyError] = useState('');

  useImperativeHandle(ref, () => ({
    closeChangePasswordModal() {
      setChangePasswordError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setChangePasswordModalOpen(false);
    },
    closeLoginModal() {
      setUsername('');
      setPassword('');
      setLoginError('');
      setLoginModalOpen(false);
    },
  }));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, []);

  const openLoginModal = () => {
    props.closeRuleModal();
    props.closeTransactionModal();
    props.closePopupModal();
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setUsername('');
    setPassword('');
    setLoginError('');
    setLoginModalOpen(false);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setChangePasswordModalOpen(false);
  };

  const openChangePasswordModal = async () => {
    props.closeRuleModal();
    props.closeTransactionModal();
    props.closePopupModal();
    closeLoginModal();
    setChangePasswordModalOpen(true);
  };

  const login = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/v1/play/auth/login',
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('fullname', response.data.user.fullname);
      window.location.href = '/' + id;
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    window.location.href = '/' + id;
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + '/api/v1/play/auth/change-password',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      );

      setChangePasswordError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setChangePasswordModalOpen(false);
    } catch (error) {
      setChangePasswordError(error.response.data.message);
    }
  };

  const redeemKey = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/v1/play/codes/' + id,
        {
          key: key,
        }
      );
      setKey('');
      props.getWalletInfo();
    } catch (error) {
      setKey('');
      setKeyError(error.response.data.message);
    }
  };

  const isLogin = (
    <div>
      {keyError && (
        <Snackbar
          sx={{ marginTop: '3rem' }}
          open={true}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={3000}
          onClose={() => setKeyError('')}
        >
          <Alert variant='filled' severity='error'>
            {keyError}
          </Alert>
        </Snackbar>
      )}
      <div className='flex flex-col items-center mb-2 mb-4 space-x-0 space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0'>
        <p className='text-2xl' style={{ color: '#05FFFE' }}>
          สวัสดี {fullname}
        </p>
        <button
          onClick={() => logout()}
          className='flex flex-row items-center justify-center w-full gap-2 p-2 text-black bg-yellow-500 border border-black rounded-lg lg:w-40'
        >
          <img src='/assets/exit.png' alt='exit' className='w-8' />
          <p>ออกจากระบบ</p>
        </button>
      </div>
      <div className='flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0'>
        <button
          onClick={() => openChangePasswordModal()}
          className='flex flex-row items-center justify-center gap-2 p-2 text-black bg-yellow-500 border-2 border-black rounded-full '
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
            maxLength='15'
            className='flex flex-row items-center justify-center gap-2 py-2 pl-12 pr-20 text-2xl text-black placeholder-black bg-white border-2 border-blue-300 rounded-full h-max focus:outline-none focus:shadow-outline'
            placeholder='กรอกโค้ด'
            onChange={(e) => setKey(e.target.value)}
            value={key}
          ></input>
          <div className='absolute right-0'>
            <button
              onClick={() => redeemKey()}
              style={{ backgroundColor: '#05FFFE' }}
              type='button'
              className='self-center px-6 py-2 text-2xl text-black rounded-full'
            >
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const loginModal = (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      className='z-10 flex items-center justify-center w-full'
    >
      <div className='w-5/6 py-1 lg:w-2/6'>
        <div
          style={{ backgroundColor: '#FDAA01' }}
          className='flex items-center justify-center rounded-t-2xl'
        >
          <img src={LoginIcon} alt='login' />
          <span className='ml-3 text-4xl text-black'>เข้าสู่ระบบ</span>
        </div>
        <div className='flex flex-col space-y-5 text-black bg-white pt-7 pb-11 rounded-b-2xl'>
          <div className='flex items-center justify-center mt-4 space-x-3'>
            <div className='grid items-center lg:grid-cols-6'>
              <div className='col-span-2 mr-3 justify-self-end'>
                <label className='self-center text-xl'>ชื่อผู้ใช้บัญชี</label>
              </div>
              <div className='col-span-4'>
                <input
                  style={{ border: '2px #d1d5db solid' }}
                  className='w-full px-5 py-2 text-xl text-black text-gray-700 rounded-full focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid items-center lg:grid-cols-6'>
              <div className='col-span-2 mr-3 justify-self-end'>
                <label className='self-center text-xl'>รหัสผ่าน</label>
              </div>
              <div className='col-span-4'>
                <input
                  style={{ border: '2px #d1d5db solid' }}
                  className='w-full px-5 py-2 text-xl text-black text-gray-700 rounded-full focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
            </div>
          </div>
          {loginError && (
            <div className='flex justify-center'>
              <p className='text-red-600'>{loginError}</p>
            </div>
          )}
          <div className='flex flex-col justify-center px-3 space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3'>
            <button
              onClick={() => login()}
              className='py-3 text-white bg-purple-800 rounded-full px-7'
              type='button'
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => closeLoginModal()}
              className='py-3 text-purple-800 bg-white border border-purple-800 rounded-full px-7'
              type='button'
            >
              ยกเลิก
            </button>
          </div>
          <div className='flex justify-center px-2 font-semibold text-center'>
            พบปัญหาการเข้าสู่ระบบหรือยังไม่มีบัญชีผู้ใช้กรุณาติดต่อแอดมิน
          </div>
        </div>
      </div>
    </div>
  );

  const changePasswordModal = (
    <div className='z-20 flex items-center justify-center w-full h-full'>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className='z-20 w-5/6 lg:w-1/4'
      >
        <div
          style={{ backgroundColor: '#FDAA01' }}
          className='flex items-center justify-center py-4 rounded-t-2xl'
        >
          <img src={EditIcon} alt='login' />
          <span className='ml-3 text-4xl text-black'>แก้ไขรหัสผ่าน</span>
        </div>
        <div className='flex flex-col px-3 space-y-5 text-black bg-white pt-7 pb-11 rounded-b-2xl'>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid items-center grid-cols-8'>
              <div className='col-span-3 mr-3 justify-self-end'>
                <label className='self-center text-xl'>รหัสผ่านเดิม</label>
              </div>
              <div className='col-span-5'>
                <input
                  style={{ border: '2px #d1d5db solid' }}
                  className='w-full px-5 py-2 text-xl text-black text-gray-700 rounded-full focus:outline-none focus:shadow-outline'
                  id='oldPassword'
                  type='password'
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid items-center grid-cols-8'>
              <div className='col-span-3 mr-3 justify-self-end'>
                <label className='self-center text-xl'>รหัสผ่านใหม่</label>
              </div>
              <div className='col-span-5'>
                <input
                  style={{ border: '2px #d1d5db solid' }}
                  className='w-full px-5 py-2 text-xl text-black text-gray-700 rounded-full focus:outline-none focus:shadow-outline'
                  id='newPassword'
                  type='password'
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                ></input>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            <div className='grid items-center grid-cols-8'>
              <div className='col-span-3 mr-3 justify-self-end'>
                <label className='self-center text-xl'>
                  ยืนยันรหัสผ่านใหม่
                </label>
              </div>
              <div className='col-span-5'>
                <input
                  style={{ border: '2px #d1d5db solid' }}
                  className='w-full px-5 py-2 text-xl text-black text-gray-700 rounded-full focus:outline-none focus:shadow-outline'
                  id='confirmNewPassword'
                  type='password'
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                ></input>
              </div>
            </div>
          </div>
          {changePasswordError && (
            <div className='flex justify-center'>
              <p className='text-red-600'>{changePasswordError}</p>
            </div>
          )}
          <div className='flex justify-center space-x-3'>
            <button
              onClick={() => changePassword()}
              className='py-3 text-white bg-purple-800 rounded-full px-7'
              type='button'
            >
              บันทึก
            </button>
            <button
              onClick={() => closeChangePasswordModal()}
              className='py-3 text-purple-800 bg-white border border-purple-800 rounded-full px-7'
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
      <div className='flex justify-center lg:justify-start'>
        <button
          onClick={() => openLoginModal()}
          style={{ backgroundColor: '#FDAA01' }}
          className='flex items-center px-5 py-2 text-black rounded-xl'
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
        <div className='grid items-center lg:grid-cols-3'>
          <div className='col-span-2'>{isAuth ? isLogin : isGuest}</div>
          <div className='w-full col-span-3 mt-2 ml-auto space-y-4 text-3xl text-center text-green-200 lg:col-span-1 lg:mt-0 lg:w-4/6'>
            <p>ระยะเวลากิจกรรม</p>
            <div className='p-4 border border-blue-400'>
              {dayDiff >= 0 ? 'อีก ' + dayDiff + ' วัน' : 'หมดเวลากิจกรรม'}
            </div>
          </div>
        </div>
      </div>
      {loginModalOpen && loginModal}
      {changePasswordModalOpen && changePasswordModal}
    </>
  );
});

export default MenuBar;
