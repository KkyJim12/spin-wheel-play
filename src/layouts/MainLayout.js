import axios from "axios";
import MenuBar from "components/MenuBar";
import PrizeTable from "components/PrizeTable";
import { Wheel } from "components/Wheel";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "styles/main.css";

const MainLayout = () => {
  useEffect(() => {
    getEvent();
  }, []);

  const [modal, setModal] = useState(false);

  const [endDate, setendDate] = useState("");
  const [eventPrizeExchange, setEventPrizeExchange] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([
    "https://backend.central.co.th/media/catalog/product/f/1/f1fe34e52b446c1b4011908bb4faf30ea22c7290_mkp0619878dummy.jpg",
    "https://backend.central.co.th/media/catalog/product/f/1/f1fe34e52b446c1b4011908bb4faf30ea22c7290_mkp0619878dummy.jpg",
  ]);
  const [backgroundImage, setBackgroundImage] = useState(
    'url("/assets/bg.png")'
  );
  const [bannerImage, setBannerImage] = useState("");
  let { id } = useParams();

  const getEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/play/events/" + id
      );

      setBackgroundImage(
        `url("${process.env.REACT_APP_API_URL}/uploads/image/${response.data.data.settingInfo.backgroundImage}")`
      );
      setBannerImage(response.data.data.settingInfo.bannerImage);
      setendDate(response.data.data.event.endDate);
      setEventPrizeExchange(response.data.data.eventPrizeExchange);

      setEventPrizeRandom(response.data.data.eventPrizeRandom);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div
        className="min-h-screen text-white"
        style={{
          backgroundImage: `${backgroundImage}`,
        }}
      >
        <div className="grid grid-cols-5">
          <div className="col-span-5 md:col-span-3">
            <div className="p-4 md:h-screen">
              <div className="mb-4">
                <MenuBar endDate={endDate} modal={modal} />
              </div>
              <div
                className="h-80 md:h-4/6 overflow-y-scroll"
                style={{ background: "#0B0D48" }}
              >
                <PrizeTable eventPrizeExchange={eventPrizeExchange} />
              </div>
              <div className="bg-white mt-2">
                <img
                  className="object-cover h-28 w-full"
                  src={`${process.env.REACT_APP_API_URL}/uploads/image/${bannerImage}`}
                ></img>
              </div>
            </div>
          </div>
          <div className="col-span-5 md:col-span-2">
            <div className="flex flex-row gap-8 p-8">
              <div
                className="relative flex-1 flex-row text-center rounded-full"
                style={{ backgroundColor: "#05FFFE" }}
              >
                <img
                  src="/assets/coin.png"
                  alt="exit"
                  className="absolute w-12 -left-4 -top-2"
                />
                <p className="text-black text-xl">0</p>
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
                <p className="text-black text-xl">0</p>
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
                <p className="text-black text-xl">0</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Wheel eventPrizeRandom={eventPrizeRandom} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
