import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css';
import { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { tokenContext } from '../../Context/TokenContext';
import { wishListContext } from '../../Context/WishListContext';


export default function Products() {
  let { token } = useContext(tokenContext);
  const [page, setPage] = useState(1)

  


  let { addToCart } = useContext(cartContext);
  function addCart(id) {
    addToCart(id)
  }

  let { addToWishList } = useContext(wishListContext);
  function addWishList(id) {
    addToWishList(id)
  }

  function edetPage2() {
    console.log('tmm2');
    setPage(2)
    console.log(page);
  }

  function edetPage1() {
    console.log('tmm1');
    setPage(1)
    console.log(page);
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  }

  let { data, isLoading, isFetching } = useQuery("FeatureProducts", getProducts);

  useEffect(() => {
    getProducts()
  }, [])
  


  return (
    <>
      <div><Toaster /></div>
      <div className="container mt-5 py-5">
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
            <div className="product py-1 px-3 position-relative ">
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
            <a className="cursor-pointer page-link " onClick={edetPage1} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><button className="page-link" onClick={edetPage1}>1</button></li>
          <li className="page-item"><button className="page-link" onClick={edetPage2}>2</button></li>
          <li className="page-item">
            <a className="cursor-pointer page-link" onClick={edetPage2} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </>
  )
}

