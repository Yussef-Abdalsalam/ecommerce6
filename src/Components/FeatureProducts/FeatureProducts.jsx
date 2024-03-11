import axios from 'axios';
import React, { useContext, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styles from './FeatureProducts.module.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext';

export default function FeatureProducts() {
  let { addToCart } = useContext(cartContext);
  function addCart(id) {
    addToCart(id)
  }
  let { addToWishList } = useContext(wishListContext);
  function addWishList(id) {
    addToWishList(id)
  }


  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=1`);
  }

  let { data, isLoading, isFetching } = useQuery("FeatureProducts", getProducts);

  return (
    <>
      <div><Toaster /></div>

      <div className="container py-5">
        <div className="row">
          {isLoading ?
            <div className=" d-flex justify-content-center">
              <div className="">
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
            </div> : ""}

          {data?.data?.data.map((el) => <div key={el.id} className=" col-xl-3 col-md-4 col-sm-6">
            <div className=" position-relative product py-1 px-3">
              <div onClick={() => addWishList(el.id)} className={`addWishList cursor-pointer fa-2x position-absolute`}><i className="fa-solid fa-heart"></i></div>
              <Link to={`/details/` + el.id}>
                <img className='w-100' src={el.imageCover} alt="" />
                <p className='text-main font-sm p-1'>{el.description.split(" ").slice(0, 1).join(" ")}</p>
                <h2 className={`${styles.titl}`} >{el.title.split(" ").slice(0, 2).join(" ")}</h2>
                <div className=" pb-4 d-flex justify-content-between ">
                  <p>{el.price} EGP</p>
                  <p>{el.ratingsAverage}<i className='fa fa-star rating-color'></i></p>
                </div>
              </Link>

              <div className={`${styles.btnn} text-center`}>
                <button onClick={() => addCart(el.id)} className='btn bg-main text-white'> <i className="fa-solid fa-plus"></i> add to cart</button>
              </div>
            </div>
          </div>)}

        </div>
      </div>

      <nav className='container d-flex justify-content-center' aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link className="cursor-pointer page-link " aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          <li className="page-item"><Link className="page-link cursor-pointer"  >1</Link></li>
          <li className="page-item"><Link className="page-link cursor-pointer" to='products/productsPage2' >2</Link></li>
          <li className="page-item">
            <Link className="cursor-pointer page-link" to='/products/productsPage2' aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
