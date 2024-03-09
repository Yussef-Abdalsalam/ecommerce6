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
        <div className="radius overflow-hidden d-flex">
          <div className="col-md-9 col-9">
            <Slider {...settings}>
              <img src={require("../../Assets/images/1.jpg")} className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/XCM_Manual_1700239_6131414_1500x200_2X.jpg")} className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/XCM_Manual_1611130_5807827_750x250_2X.jpg")} className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/3.png")} className={`${styles.slider1} w-100`} alt='' />
              <img src={require("../../Assets/images/5.png")} className={`${styles.slider1} w-100`} alt='' />
            </Slider>
          </div>
          <div className="col-md-3 col-3">
            <img src={require("../../Assets/images/slider-image-2.jpeg")} className={`${styles.slider2} w-100`} alt='' />
            <img src={require("../../Assets/images/slider-image-3.jpeg")} className={`${styles.slider2} w-100`} alt='' />
          </div>
        </div>
      </div>
    </>
  )
}
