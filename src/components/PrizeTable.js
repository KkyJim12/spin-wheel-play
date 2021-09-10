const PrizeTable = () => {
  return (
    <div className="h-full rounded-lg" style={{ background: "#0B0D48" }}>
      <table className="w-full">
        <tr className="text-black text-4xl" style={{ background: "#FFDD00" }}>
          <th className="py-2">รางวัล</th>
          <th className="py-2">พอยต์</th>
          <th className="py-2">แลก</th>
          <th className="py-2">สิทธิ์</th>
        </tr>
        <tr className="text-2xl">
          <td className="h-16 px-4 py-4">
            <div className="border-white border-4 h-20 bg-green-200"></div>
          </td>
          <td className="h-16  py-2">
            <div className="flex flex-row justify-center items-center gap-2">
              <img src="/assets/coin.png" alt="coin" className="w-16" />
              <p className="text-yellow-500 font-bold">x 3</p>
            </div>
          </td>
          <td className="text-center">
            <button className="border-black bg-yellow-500 px-4 py-2 rounded">
              แลกรางวัล
            </button>
          </td>
          <td className="text-center text-yellow-500 font-bold">0/2</td>
        </tr>
      </table>
    </div>
  );
};

export default PrizeTable;
