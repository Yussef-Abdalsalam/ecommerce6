import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import styles from './CategorySlider.module.css';
import Slider from 'react-slick';

export default function CategorySlider() {

  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/Categories")
  }

  let { data } = useQuery("CatSlider", getCatSlider)
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className=" container py-5">
        <h2>Shop Popular Categories</h2>
        <Slider {...settings}>
          {data?.data?.data.map((el) => <div className='sliderctg' key={el._id}>
            <img src={el.image} className={`${styles.sliderh} w-100`} alt='' />
            <p className={`${styles.sliderp} text-center text-main`}>{el.name}</p>
          </div>)}
        </Slider>
      </div>
    </>
  )
}

