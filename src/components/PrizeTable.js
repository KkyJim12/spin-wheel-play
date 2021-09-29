import CoinB from "assets/image/coin-b.png";
import CoinC from "assets/image/coin-c.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

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
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="z-20 flex items-center justify-center w-5/6 lg:w-2/6"
        >
          <div className="flex flex-col items-center justify-center w-full px-10 py-5 space-y-6 bg-white rounded-2xl">
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
              className="px-10 py-5 text-white border-2 rounded-3xl hover:bg-red-300"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      <div className="h-full rounded-lg">
        <table className="w-full table-fixed">
          <thead className="sticky top-0">
            <tr
              className="text-2xl text-black"
              style={{ background: "#FFDD00" }}
            >
              <th className="w-40 py-2">รางวัล</th>
              <th className="w-40 py-2">พอยต์</th>
              <th className="w-40 py-2">แลก</th>
              <th className="w-40 py-2">สิทธิ์</th>
            </tr>
          </thead>
          <tbody>
            {num.map((item) => {
              return (
                <tr key={item.id} className="text-2xl">
                  <td className="h-16 px-4 py-4">
                    <div className="border-4 border-white">
                      <img
                        className="object-cover w-full h-32"
                        src={
                          process.env.REACT_APP_API_URL +
                          "/uploads/image/" +
                          item.prize.image
                        }
                      ></img>
                    </div>
                  </td>
                  <td className="h-16 py-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <img
                        src={item.coinType === 1 ? CoinB : CoinC}
                        alt="coin"
                        className="w-16"
                      />
                      <p className="font-bold text-yellow-500">
                        x {item.quantity}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        exchangePrize(item.id, item.prize.id, item.prize.image)
                      }
                      className="px-4 py-2 bg-yellow-500 border-black rounded"
                    >
                      แลกรางวัล
                    </button>
                  </td>
                  <td className="font-bold text-center text-yellow-500">
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
