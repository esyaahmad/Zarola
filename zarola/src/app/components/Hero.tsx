"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
  return (
    <div>
      <div className="main-container">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} speed={500} pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1} className="">
          <SwiperSlide>
            <img src="banner-1.gif" className=" rounded-lg border-2 border-black" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="banner-2.gif" className="  rounded-lg border-2 border-black" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
