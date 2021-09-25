import CoinB from "assets/image/coin-b.png";
import CoinC from "assets/image/coin-c.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { isMobile } from "react-device-detect";

const PrizeTable = (props) => {
  let { id } = useParams();

  const num = props.eventPrizeExchange;
  const [exchangeError, setExchangeError] = useState("");

  const [exchangeSuccess, setExchangeSuccess] = useState(false);

  const [prizeExchangeImage, setPrizeExchangeImage] = useState("");

  const exchangePrize = async (exchangeId, prizeId, prizeImage) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/play/events/exchange/" + id,
        {
          prizeId: prizeId,
          exchangeId: exchangeId,
        }
      );
      props.getWalletInfo();
      props.getEvent();
      setPrizeExchangeImage(prizeImage);
      setExchangeSuccess(true);
    } catch (error) {
      setExchangeError(error.response.data.message);
    }
  };

  const agreeExchangeSuccess = () => {
    setExchangeSuccess(false);
    setPrizeExchangeImage("");
  };

  return (
    <>
      {exchangeError && (
        <Snackbar
          sx={{ marginTop: "3rem" }}
          open={true}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
          onClose={() => setExchangeError("")}
        >
          <Alert variant="filled" severity="error">
            {exchangeError}
          </Alert>
        </Snackbar>
      )}
      {exchangeSuccess && (
        <div
          style={{
            top: "50%",
            left: "50%",
            width: isMobile ? 300 : 500,
            height: isMobile ? 400 : 400,
            marginTop: isMobile ? -200 : -200,
            marginLeft: isMobile ? -150 : -250,
          }}
          className="flex absolute items-center justify-center z-20"
        >
          <div className="flex flex-col items-center w-full justify-center bg-white px-10 py-5 w-full rounded-2xl space-y-6">
            <h1 style={{ color: "#3d7d3b" }} className="text-4xl">
              ยินดีด้วย!!
            </h1>
            <h4 style={{ color: "#0b0d48" }} className="text-2xl">
              คุณแลกรางวัลสำเร็จ
            </h4>
            <img
              className="w-3/6"
              src={`${process.env.REACT_APP_API_URL}/uploads/image/${prizeExchangeImage}`}
              alt="prize"
            ></img>
            <button
              style={{ background: "#0b0d48" }}
              onClick={() => agreeExchangeSuccess()}
              className="border-2 text-white px-10 py-5 rounded-3xl hover:bg-red-300"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      <div className="h-full rounded-lg">
        <table className="w-full table-fixed">
          <thead>
            <tr
              className="text-black text-4xl"
              style={{ background: "#FFDD00" }}
            >
              <th className="py-2 w-40">รางวัล</th>
              <th className="py-2 w-40">พอยต์</th>
              <th className="py-2 w-40">แลก</th>
              <th className="py-2 w-40">สิทธิ์</th>
            </tr>
          </thead>
          <tbody>
            {num.map((item) => {
              return (
                <tr key={item.id} className="text-2xl">
                  <td className="h-16 px-4 py-4">
                    <div className="border-white border-4">
                      <img
                        className="w-full h-32 object-cover"
                        src={
                          process.env.REACT_APP_API_URL +
                          "/uploads/image/" +
                          item.prize.image
                        }
                      ></img>
                    </div>
                  </td>
                  <td className="h-16  py-2">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <img
                        src={item.coinType === 1 ? CoinB : CoinC}
                        alt="coin"
                        className="w-16"
                      />
                      <p className="text-yellow-500 font-bold">
                        x {item.quantity}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        exchangePrize(item.id, item.prize.id, item.prize.image)
                      }
                      className="border-black bg-yellow-500 px-4 py-2 rounded"
                    >
                      แลกรางวัล
                    </button>
                  </td>
                  <td className="text-center text-yellow-500 font-bold">
                    {item.event_prize_exchange_user_limit
                      ? item.event_prize_exchange_user_limit.count
                      : "0"}
                    /{item.limit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PrizeTable;
