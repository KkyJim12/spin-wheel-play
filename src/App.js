import React from "react";
import { Wheel } from "./components/Wheel";
import "./styles/main.css";

function App() {
  return (
    <div className="min-h-screen text-white grid grid-cols-2" style={{
      backgroundImage: `url("/assets/bg.png")`
    }}>
      <div className="col-span-1 p-8 bg-blue-900">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <p className="" style={{color: "#05FFFE"}}>สวัสดี คุณโชคดี มีสุข</p>
            <button className="border border-black text-black bg-yellow-500 p-2 flex flex-row justify-center items-center gap-2  ">
              <img src="/assets/exit.png" alt="exit" className="w-8" />
              <p>ออกจากระบบ</p>
            </button>
            <button className="border-2 border-black text-black bg-yellow-500 rounded-full p-2 flex flex-row justify-center items-center gap-2 ">
              <img src="/assets/edit.png" alt="exit" className="w-8" />
              แก้ไขรหัสผ่าน
            </button>
            <button className="border-2 border-blue-300 text-black bg-white rounded-full p-2 flex flex-row justify-center items-center gap-2">
              <img src="/assets/coin.png" alt="exit" className="w-8" />
              กรอกโค้ด
            </button>
          </div>
          <div className="text-green-200 text-center ml-auto text-3xl col-span-1 space-y-4">
            <p>ระยะเวลากิจกรรม</p>
            <div className="border-blue-400 border p-4">อีก 20 วัน</div>
          </div>
        </div>
        <table className="w-full">
          <tr className="bg-yellow-200 text-black ">
            <th>รางวัล</th>
            <th>พอยต์</th>
            <th></th>
            <th>สิทธิ์</th>
          </tr>
          <tr>
            <td className="h-16 p-2">
              <div className="border-white border-4 h-full bg-green-200"></div>
            </td>
            <td className="h-16 flex flex-row justify-center items-center gap-2">
              <img src="/assets/coin.png" alt="exit" className="w-12" />
              <p className="text-yellow-500 font-bold">x 3</p>
            </td>
            <td className="text-center">
              <button className="border-black bg-yellow-500 px-4 py-1 rounded">
                แลกรางวัล
              </button>
            </td>
            <td className="text-center text-yellow-500 font-bold">0/2</td>
          </tr>
          <tr>
            <td className="h-16 p-2">
              <div className="border-white border-4 h-full bg-green-200"></div>
            </td>
            <td className="h-16 flex flex-row justify-center items-center gap-2">
              <img src="/assets/star.png" alt="exit" className="w-12" />
              <p className="text-yellow-500 font-bold">x 3</p>
            </td>
            <td className="text-center">
              <button className="border-black bg-yellow-500 px-4 py-1 rounded">
                แลกรางวัล
              </button>
            </td>
            <td className="text-center text-yellow-500 font-bold">0/2</td>
          </tr>
        </table>
      </div>
      <div className="col-span-1">
        <div className="flex flex-row gap-8 p-8">
          <div className="relative flex-1 flex-row text-center rounded-full" style={{backgroundColor: "#05FFFE"}}>
            <img src="/assets/coin.png" alt="exit" className="absolute w-12 -left-4 -top-2" />
            <p className="text-black text-xl">3</p>
          </div>
          <div className="relative flex-1 flex-row text-center rounded-full" style={{backgroundColor: "#05FFFE"}}>
            <img src="/assets/star.png" alt="exit" className="absolute w-12 -left-4 -top-2" />
            <p className="text-black text-xl">3</p>
          </div>
          <div className="relative flex-1 flex-row text-center rounded-full" style={{backgroundColor: "#05FFFE"}}>
            <img src="/assets/wheel.png" alt="exit" className="absolute w-12 -left-4 -top-2" />
            <p className="text-black text-xl">3</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <Wheel />
        </div>
      </div>
    </div>
  );
}

export default App;
