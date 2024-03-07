import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.css';
import Slider from 'react-slick';
import { cartContext } from '../../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  let { addToCart } = useContext(cartContext);
  function addCart(id) {
    addToCart(id)
  }

  let { addToWishList } = useContext(wishListContext);
  function addWishList(id) {
    addToWishList(id)
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  let { id } = useParams();

  async function getDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id)
    setDetails(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails(id)
  }, [])

  return (
    <>
      <div><Toaster/></div>
      <div className="container my-5 ">
        {isLoading ?
          <div className=" d-flex justify-content-center mt-5 pt-5">
            <div className="mt-5 pt-5">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </div> :
          <div className="row align-items-center">
            <div className="col-md-4 py-3">
              <Slider {...settings}>
                {details.images.map((el) => <img key={details.id} src={el} className='w-100' />)}
              </Slider>

            </div>
            <div className="col-md-8">
              <div className=" d-flex justify-content-between">
                <h3 className='pt-3'>{details.title}</h3>
                <div onClick={() => addWishList(details.id)} className={`${styles.wishListt} cursor-pointer fa-2x `}><i className="fa-solid fa-heart"></i></div>
              </div>
              <p className=' text-secondary'>{details.description}</p>
              <p>{details.category.name}</p>
              <div className=" d-flex justify-content-between ">
                <p>{details.price} EGP</p>
                <p>{details.ratingsAverage}<i className='fa fa-star rating-color'></i></p>
              </div>
              <button onClick={() => addCart(details.id)} className='btn w-100 bg-main text-white'> <i className="fa-solid fa-plus"></i> add to cart</button>
            </div>
          </div>
        }

      </div>
    </>
  )
}

