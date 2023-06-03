import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="next absolute top-[45%] left-[-15px] lg:-left-[40px] bg-green-500 w-7 h-7 lg:w-12 lg:h-12  rounded-full flex justify-center items-center text-white "
      onClick={onClick}>
      <BsArrowLeft />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="next absolute top-[45%] right-[-15px] lg:-right-[45px]  bg-green-500 h-7 w-7 lg:w-12 lg:h-12  rounded-full flex justify-center items-center text-white"
      onClick={onClick}>
      <BsArrowRight />
    </button>
  );
}

const CostumSlider = ({ children }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-[1rem]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default CostumSlider;
