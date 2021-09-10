const MenuBar = () => {
  return (
    <div className="p-8 bg-blue-900 rounded-lg">
      <div className="grid md:grid-cols-3">
        <div className="col-span-2">
          <div className="mb-2">
            <p style={{ color: "#05FFFE" }}>สวัสดี คุณโชคดี มีสุข</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
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
        </div>
        <div className="text-green-200 text-center ml-auto text-3xl col-span-1 space-y-4 mt-2 md:mt-0">
          <p>ระยะเวลากิจกรรม</p>
          <div className="border-blue-400 border p-4">อีก 20 วัน</div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
