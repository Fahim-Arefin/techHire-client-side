const Banner = ({ details, url, className }) => {
  return (
    <div className="bg-[#3a4050] text-white px-4 h-[700px] flex flex-col space-y-8 lg:space-y-0 lg:flex-row items-center lg:justify-center">
      <div className="text-center lg:text-left text-2xl lg:text-5xl w-full lg:w-[50%] flex flex-col lg:items-end justify-center mt-7 lg:mt-0">
        <div className="space-y-4">
          <p className="tracking-[12px] ">{details.p1}</p>
          <p className="font-bold">{details.p2}</p>
          <p className="text-sm lg:w-[80%]">{details.p3}</p>
          <div>
            <a
              href="#"
              className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-opacity-75 text-sm"
            >
              Click Here
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[50%] flex lg:items-end ">
        {/* <img src="./plumber-1.png" className="w-[70%] h-full" /> */}
        <img src={`${url}`} className={`${className}`} />
      </div>
    </div>
  );
};

export default Banner;
