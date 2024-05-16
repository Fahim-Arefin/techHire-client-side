// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Banner from "./Banner";

function SwipperSlider() {
  const sliderOneDetails = {
    p1: "HIRE EXPERTS & ",
    p2: "GET YOUR JOB DONE",
    p3: "Phasellus tellus risus, tincidunt eu scelerisque a, blandit sed metus. Aliquam ut tristique mi.",
  };
  const sliderTwoDetails = {
    p1: "SAVE OUR ",
    p2: "TIME & MONEY",
    p3: "Phasellus tellus risus, tincidunt eu scelerisque a, blandit sed metus. Aliquam ut tristique mi.",
  };
  return (
    <Swiper
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper w-[100%] h-[700px]"
    >
      <SwiperSlide>
        <Banner
          url="./plumber-1.png"
          details={sliderOneDetails}
          className="w-full lg:w-[70%] h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Banner
          url="./cleaner-1.png"
          details={sliderTwoDetails}
          className="w-full lg:w-[80%] h-[90%]"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwipperSlider;
