import React from "react";
import { Wheel } from "./components/Wheel";
import "./styles/main.css";
import MenuBar from "./components/MenuBar";
import PrizeTable from "./components/PrizeTable";

function App() {
  return (
    <div
      className="min-h-screen text-white grid grid-cols-5"
      style={{
        backgroundImage: `url("/assets/bg.png")`,
      }}
    >
      <div className="col-span-3">
        <div className="p-4 h-full">
          <div className="mb-4">
            <MenuBar />
          </div>
          <div className="h-4/6">
            <PrizeTable />
          </div>
        </div>
      </div>
      <div className="col-span-2">
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
            <p className="text-black text-xl">3</p>
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
            <p className="text-black text-xl">3</p>
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
            <p className="text-black text-xl">3</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Wheel />
        </div>
      </div>
    </div>
  );
}

export default App;
