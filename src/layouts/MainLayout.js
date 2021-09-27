import CoinA from "assets/image/coin-a.png";
import CoinB from "assets/image/coin-b.png";
import CoinC from "assets/image/coin-c.png";
import axios from "axios";
import MenuBar from "components/MenuBar";
import PrizeTable from "components/PrizeTable";
import { Wheel } from "components/Wheel";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "styles/main.css";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { width } from "@mui/system";

const MainLayout = () => {
  let { id } = useParams();
  const MenuBarRef = useRef();

  const [modal, setModal] = useState(false);
  const [coinA, setCoinA] = useState(0);
  const [coinB, setCoinB] = useState(0);
  const [coinC, setCoinC] = useState(0);

  const [endDate, setendDate] = useState("");
  const [eventPrizeExchange, setEventPrizeExchange] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(
    'url("/assets/bg.png")'
  );
  const [bannerImage, setBannerImage] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [popup, setPopup] = useState("");
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
        process.env.REACT_APP_API_URL + "/api/v1/play/auth/wallet/" + id
      );

      setCoinA(response.data.wallet[0].coinA);
      setCoinB(response.data.wallet[0].coinB);
      setCoinC(response.data.wallet[0].coinC);
    } catch (error) {}
  };

  const getWalletInfoPlay = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/play/auth/wallet/" + id
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
      let response = "";

      if (!localStorage.getItem("token")) {
        response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v1/play/events/" + id
        );
      } else {
        response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v1/play/events/" + id + "/login"
        );
      }

      let itemList = response.data.data.eventPrizeRandom.map((item) => {
        return {
          imageSrc:
            process.env.REACT_APP_API_URL +
            "/uploads/image/" +
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
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="flex items-center justify-center z-20 w-full h-full"
    >
      <div className="flex flex-col items-center justify-center bg-white pb-5 w-5/6 lg:w-2/6 rounded-2xl space-y-6">
        <div
          className="w-full flex justify-center rounded-t-2xl py-3"
          style={{ background: "#0b0d48" }}
        >
          <h1 className="text-4xl text-white">กติกา</h1>
        </div>
        <div className="flex flex-col text-2xl py-3 px-2 lg:px-10">
          <div>
            <span>1.เหรียญ</span>
            <img className="h-10 w-10 mx-2 inline" src={CoinA} alt="coin"></img>
            <span>สามารถหมุนวงล้อได้ 1 ครั้ง</span>
          </div>
          <div className="mt-5">
            <span>2.หมุนวงล้อ 1 ครั้ง จะได้</span>
            <img
              className="w-10 h-10 mx-2 inline"
              src={CoinB}
              alt="coin"
            ></img>{" "}
            <span>1 เหรียญ เพื่อนำไปแลกของรางวัลในตาราง</span>
          </div>
          <div className="mt-5">
            <span>3.เหรียญ</span>
            <img
              className="w-10 h-10 mx-2 inline"
              src={CoinC}
              alt="coin"
            ></img>{" "}
            <span>
              สามารถหาได้จากการ หมุนวงล้อ เพื่อนำไปแลกของรางวัลสุดพิเศษในตาราง
            </span>
          </div>
        </div>
        <button
          style={{ background: "#0b0d48" }}
          onClick={() => closeRuleModal()}
          className="border-2 text-white px-10 py-5 rounded-3xl hover:bg-red-300"
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
          "/api/v1/play/auth/prize-random-transaction/" +
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
          "/api/v1/play/auth/prize-exchange-transaction/" +
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
    if (localStorage.getItem("token")) {
      getPrizeRandomTransaction();
      getPrizeExchangeTransaction();
    }
  }, [randomPrizeTransactionModal]);

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
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
        <div className="absolute flex flex-col items-center w-full h-screen justify-center z-20">
          <div className="relative bg-white w-5/6 lg:w-3/6 space-y-6 ">
            <div className="absolute right-0 mr-2 mt-2 bg-black rounded-lg text-white px-2 py-1 bg-opacity-50">
              <button
                onClick={() => closePopupModal()}
                type="button rounded-full"
              >
                ปิด
              </button>
            </div>
            <img
              className="w-full"
              src={process.env.REACT_APP_API_URL + "/uploads/image/" + popup}
            ></img>
          </div>
        </div>
      )}
      {ruleModal && ruleModalShow}
      {randomPrizeTransactionModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="flex flex-col items-center w-full h-screen justify-center z-20"
        >
          <div className="bg-white px-4 lg:px-20 py-5 w-5/6 lg:w-3/6 rounded-2xl space-y-6 border-4 border-yellow-500">
            <h1 className="text-3xl text-black">ประวัติการสุ่ม</h1>
            <div className="h-32 overflow-y-scroll overflow-x-scroll lg:overflow-x-hidden">
              <table className="lg:table-fixed">
                <thead>
                  <tr className="text-left">
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">ลำดับ</th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-3/6">
                      ของรางวัล
                    </th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">วันที่</th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">เวลา</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeRandomTransaction.map((item, index) => {
                    return (
                      <tr
                        index={index}
                        key={item.id}
                        className="text-left border-t-2 border-black"
                      >
                        <td className="text-xl py-2">{index + 1}</td>
                        <td className="text-xl py-2">{item.prize.name}</td>
                        <td className="text-xl py-2">
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-xl py-2">
                          {moment(item.createdAt).format("hh:mm A")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <h1 className="text-3xl text-black">ประวัติการแลกของรางวัล</h1>
            <div className="h-32 overflow-scroll overflow-x-scroll lg:overflow-x-hidden">
              <table className="lg:table-fixed">
                <thead>
                  <tr className="text-left">
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">ลำดับ</th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-3/6">
                      ของรางวัล
                    </th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">วันที่</th>
                    <th className="bg-yellow-300 text-xl py-2 w-32 lg:w-1/6">เวลา</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeExchangeTransaction.map((item, index) => {
                    return (
                      <tr
                        index={index}
                        key={item.id}
                        className="text-left border-t-2 border-black"
                      >
                        <td className="text-xl py-2">{index + 1}</td>
                        <td className="text-xl py-2">{item.prize.name}</td>
                        <td className="text-xl py-2">
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-xl py-2">
                          {moment(item.createdAt).format("hh:mm A")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => closeTransactionModal()}
                className="border-2 text-black text-2xl px-10 py-5 rounded-3xl bg-yellow-500"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="min-h-screen text-white"
        style={{
          backgroundImage: `${backgroundImage}`,
        }}
      >
        <div className="grid grid-cols-5">
          <div className="col-span-5 lg:col-span-3">
            <div className="p-4 lg:h-screen">
              <div className="mb-4">
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
                className="overflow-y-scroll"
                style={{ background: "#0B0D48", height: "58%" }}
              >
                <PrizeTable
                  getEvent={getEvent}
                  getWalletInfo={getWalletInfo}
                  eventPrizeExchange={eventPrizeExchange}
                />
              </div>
              <Link
                to={{ pathname: bannerLink ? bannerLink : "" }}
                target="_blank"
              >
                <div className="bg-white mt-2">
                  <img
                    className="object-cover h-40 w-full"
                    src={`${process.env.REACT_APP_API_URL}/uploads/image/${bannerImage}`}
                  ></img>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-5 lg:col-span-2">
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              <div
                className="relative flex-1 flex-row text-center rounded-full"
                style={{ backgroundColor: "#05FFFE" }}
              >
                <img
                  src="/assets/coin.png"
                  alt="exit"
                  className="absolute w-12 -left-4 -top-2"
                />
                <p className="text-black text-xl">{coinA}</p>
              </div>
              <div
                className="relative flex-1 flex-row text-center rounded-full"
                style={{ backgroundColor: "#05FFFE" }}
              >
                <img
                  src="/assets/star.png"
                  alt="exit"
                  className="absolute w-12 -left-4 -top-2"
                />
                <p className="text-black text-xl">{coinC}</p>
              </div>
              <div
                className="relative flex-1 flex-row text-center rounded-full"
                style={{ backgroundColor: "#05FFFE" }}
              >
                <img
                  src="/assets/wheel.png"
                  alt="exit"
                  className="absolute w-12 -left-4 -top-2"
                />
                <p className="text-black text-xl">{coinB}</p>
              </div>
            </div>
            <div className="flex flex-row justify-end px-8 space-x-3">
              <button
                style={{ backgroundColor: "#0002ff" }}
                className="px-3 py-1 text-white rounded-2xl w-1/6 h-10 text-2xl flex-1 lg:flex-none"
                type="button"
                onClick={() => openRuleModal()}
              >
                กติกา
              </button>
              <button
                style={{ backgroundColor: "#0002ff" }}
                className="px-3 py-1 text-white rounded-2xl w-1/6 h-10 text-2xl flex-1 lg:flex-none"
                type="button"
                onClick={() => openTransactionModal()}
              >
                ประวัติ
              </button>
            </div>
            <div className="flex justify-center">{wheel}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
