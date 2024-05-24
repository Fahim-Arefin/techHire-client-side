import { BsDatabaseFillDash } from "react-icons/bs";

const NoData = ({ className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[500px] ${className}`}
    >
      <BsDatabaseFillDash className="w-10 h-10 text-[#f87060]" />
      <p className="text-lg text-[#f87060]">No Data Available</p>
    </div>
  );
};

export default NoData;
