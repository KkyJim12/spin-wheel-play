import moment from "moment";
import LoginIcon from "assets/image/login.png";
import EditIcon from "assets/image/edit.png";
import ZCoin from "assets/image/coin-a.png";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MenuBar = forwardRef((props, ref) => {
  let { id } = useParams();
  let today = moment().format();
  let dayDiff = moment(props.endDate).diff(today, "days");

  // UI Function
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [fullname, setFullname] = useState(localStorage.getItem("fullname"));

  // Login Function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Change Password Function
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  // Redeem Code Function
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState("");

  useImperativeHandle(ref, () => ({
    closeChangePasswordModal() {
      setChangePasswordError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setChangePasswordModalOpen(false);
    },
    closeLoginModal() {
      setUsername("");
      setPassword("");
      setLoginError("");
      setLoginModalOpen(false);
    },
  }));

  useEffect(() => {
    if (localStorage.getItem("token")) {
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
    setUsername("");
    setPassword("");
    setLoginError("");
    setLoginModalOpen(false);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordError("");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
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
        process.env.REACT_APP_API_URL + "/api/v1/play/auth/login",
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("fullname", response.data.user.fullname);
      setFullname(response.data.user.fullname);
      setLoginModalOpen(false);
      setUsername("");
      setPassword("");
      setLoginError("");
      setIsAuth(true);
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    setIsAuth(false);
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/api/v1/play/auth/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      );

      setChangePasswordError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setChangePasswordModalOpen(false);
    } catch (error) {
      setChangePasswordError(error.response.data.message);
    }
  };

  const redeemKey = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/play/codes/" + id,
        {
          key: key,
        }
      );
      setKey("");
      props.getWalletInfo();
    } catch (error) {
      setKey("");
      setKeyError(error.response.data.message);
    }
  };

  const isLogin = (
    <div>
      {keyError && (
        <Snackbar
          sx={{ marginTop: "3rem" }}
          open={true}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
          onClose={() => setKeyError("")}
        >
          <Alert variant="filled" severity="error">
            {keyError}
          </Alert>
        </Snackbar>
      )}
      <div className="mb-2 flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 mb-4 space-y-2 lg:space-y-0">
        <p className="text-2xl" style={{ color: "#05FFFE" }}>
          สวัสดี {fullname}
        </p>
        <button
          onClick={() => logout()}
          className="border border-black text-black bg-yellow-500 p-2 flex flex-row justify-center items-center gap-2 rounded-lg w-full lg:w-40"
        >
          <img src="/assets/exit.png" alt="exit" className="w-8" />
          <p>ออกจากระบบ</p>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
        <button
          onClick={() => openChangePasswordModal()}
          className="border-2 border-black text-black bg-yellow-500 rounded-full p-2 flex flex-row justify-center items-center gap-2 "
        >
          <img src="/assets/edit.png" alt="exit" className="w-8" />
          แก้ไขรหัสผ่าน
        </button>
        <div className="relative flex items-center">
          <div className="absolute">
            <img className="w-12" src={ZCoin}></img>
          </div>
          <input
            style={{ width: "17.5rem" }}
            maxLength="15"
            className="pl-12 pr-20 h-max py-2 border-2 border-blue-300 text-black text-2xl placeholder-black bg-white rounded-full flex flex-row justify-center items-center gap-2 focus:outline-none focus:shadow-outline"
            placeholder="กรอกโค้ด"
            onChange={(e) => setKey(e.target.value)}
            value={key}
          ></input>
          <div className="absolute right-0">
            <button
              onClick={() => redeemKey()}
              style={{ backgroundColor: "#05FFFE" }}
              type="button"
              className="rounded-full px-6 py-2 self-center text-black text-2xl"
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
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="flex z-10 w-full items-center justify-center"
    >
      <div className="py-1 w-5/6 lg:w-2/6">
        <div
          style={{ backgroundColor: "#FDAA01" }}
          className="flex items-center justify-center rounded-t-2xl"
        >
          <img src={LoginIcon} alt="login" />
          <span className="text-black text-4xl ml-3">เข้าสู่ระบบ</span>
        </div>
        <div className="bg-white flex flex-col text-black space-y-5 pt-7 pb-11 rounded-b-2xl">
          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="grid lg:grid-cols-6 items-center">
              <div className="col-span-2 justify-self-end mr-3">
                <label className="text-xl self-center">ชื่อผู้ใช้บัญชี</label>
              </div>
              <div className="col-span-4">
                <input
                  style={{ border: "2px #d1d5db solid" }}
                  className="text-xl text-black rounded-full w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="grid lg:grid-cols-6 items-center">
              <div className="col-span-2 justify-self-end mr-3">
                <label className="text-xl self-center">รหัสผ่าน</label>
              </div>
              <div className="col-span-4">
                <input
                  style={{ border: "2px #d1d5db solid" }}
                  className="text-xl text-black rounded-full w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
            </div>
          </div>
          {loginError && (
            <div className="flex justify-center">
              <p className="text-red-600">{loginError}</p>
            </div>
          )}
          <div className="flex flex-col lg:flex-row px-3 justify-center space-y-3 lg:space-y-0 lg:space-x-3">
            <button
              onClick={() => login()}
              className="bg-purple-800 text-white px-7 py-3 rounded-full"
              type="button"
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => closeLoginModal()}
              className="border border-purple-800 bg-white text-purple-800 px-7 py-3 rounded-full"
              type="button"
            >
              ยกเลิก
            </button>
          </div>
          <div className="flex justify-center font-semibold px-2 text-center">
            พบปัญหาการเข้าสู่ระบบหรือยังไม่มีบัญชีผู้ใช้กรุณาติดต่อแอดมิน
          </div>
        </div>
      </div>
    </div>
  );

  const changePasswordModal = (
    <div className="flex z-20 items-center justify-center w-full h-full">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="z-20 w-5/6 lg:w-1/4"
      >
        <div
          style={{ backgroundColor: "#FDAA01" }}
          className="flex items-center justify-center rounded-t-2xl py-4"
        >
          <img src={EditIcon} alt="login" />
          <span className="text-black text-4xl ml-3">แก้ไขรหัสผ่าน</span>
        </div>
        <div className="bg-white flex flex-col text-black space-y-5 pt-7 pb-11 rounded-b-2xl px-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="grid grid-cols-8 items-center">
              <div className="col-span-3 justify-self-end mr-3">
                <label className="text-xl self-center">รหัสผ่านเดิม</label>
              </div>
              <div className="col-span-5">
                <input
                  style={{ border: "2px #d1d5db solid" }}
                  className="text-xl text-black rounded-full w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="oldPassword"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="grid grid-cols-8 items-center">
              <div className="col-span-3 justify-self-end mr-3">
                <label className="text-xl self-center">รหัสผ่านใหม่</label>
              </div>
              <div className="col-span-5">
                <input
                  style={{ border: "2px #d1d5db solid" }}
                  className="text-xl text-black rounded-full w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="grid grid-cols-8 items-center">
              <div className="col-span-3 justify-self-end mr-3">
                <label className="text-xl self-center">
                  ยืนยันรหัสผ่านใหม่
                </label>
              </div>
              <div className="col-span-5">
                <input
                  style={{ border: "2px #d1d5db solid" }}
                  className="text-xl text-black rounded-full w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="confirmNewPassword"
                  type="password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                ></input>
              </div>
            </div>
          </div>
          {changePasswordError && (
            <div className="flex justify-center">
              <p className="text-red-600">{changePasswordError}</p>
            </div>
          )}
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => changePassword()}
              className="bg-purple-800 text-white px-7 py-3 rounded-full"
              type="button"
            >
              บันทึก
            </button>
            <button
              onClick={() => closeChangePasswordModal()}
              className="border border-purple-800 bg-white text-purple-800 px-7 py-3 rounded-full"
              type="button"
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
      <div className="flex justify-center lg:justify-start">
        <button
          onClick={() => openLoginModal()}
          style={{ backgroundColor: "#FDAA01" }}
          className="px-5 py-2 text-black flex items-center rounded-xl"
          type="button"
        >
          <img src={LoginIcon} alt="login" />
          <span className="ml-3 text-2xl">เข้าสู่ระบบ</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="p-8 bg-blue-900 rounded-lg">
        <div className="grid lg:grid-cols-3 items-center">
          <div className="col-span-2">{isAuth ? isLogin : isGuest}</div>
          <div className="text-green-200 text-center ml-auto text-3xl col-span-3 lg:col-span-1 space-y-4 mt-2 lg:mt-0 w-full lg:w-4/6">
            <p>ระยะเวลากิจกรรม</p>
            <div className="border-blue-400 border p-4">อีก {dayDiff} วัน</div>
          </div>
        </div>
      </div>
      {loginModalOpen && loginModal}
      {changePasswordModalOpen && changePasswordModal}
    </>
  );
});

export default MenuBar;
