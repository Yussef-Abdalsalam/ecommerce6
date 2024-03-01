import React from 'react'
import Slider from 'react-slick';
import styles from './MainSlider.module.css';

export default function MainSlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className=" d-flex">
          <div className="col-md-9 col-9">
            <Slider {...settings}>
              <img src={require("../../Assets/images/Slider1.jpeg")}  className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/Slider2.png")}  className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/slider-image-2.jpeg")} className={`${styles.slider1} w-100`} alt='' />
            </Slider>
          </div>
          <div className="col-md-3 col-3">
            <img src={require("../../Assets/images/Slider2.png")}  className={`${styles.slider2} w-100`} alt='' />
            <img src={require("../../Assets/images/slider-image-3.jpeg")}  className={`${styles.slider2} w-100`} alt='' />
          </div>
        </div>
      </div>
    </>
  )
}
