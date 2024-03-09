import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styles from './WishList.module.css';
import { RotatingLines } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { ietmWishListContext } from '../../Context/IetmWishList';

export default function WishList() {
  const [wishlist, setWishlist] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  let { setWishListt } = useContext(ietmWishListContext);

  let { addToCart } = useContext(cartContext);
  function addCart(id) {
    addToCart(id)
  }

  // display Wishlist Product

  async function getWishlist() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      setWishlist(data?.data);
      setWishListt(data?.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  // delete Wishlist Product
  async function removeWishlistProduct(productId) {
    setIsLoading(true)
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/` + productId, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
    setWishlist(data?.data);
    if (data?.data) {
      getWishlist()
      setIsLoading(false)
      setWishListt(data)
    }

  }
  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <>
      <div><Toaster /></div>
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
        <>
          {wishlist.length > 0 ?
            <div className="container pt-5 my-5">
              <div className=" d-flex justify-content-between">
                <div className="fw-bold px-1"><h2>My wish List</h2></div>
                <div className=' fw-bold px-1'>total number of items : <span className={styles.fontB}>{wishlist.length}</span></div>
              </div>

              {wishlist.map((wishProduct) => {
                return <div key={wishProduct._id} className="card-product shadow rounded-2 my-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img className='w-100' key={wishProduct._id} src={wishProduct.imageCover} alt="" />
                    </div>
                    <div className="col-md-8  px-sm-4">
                      <h3 className={styles.titil}>{wishProduct.title}</h3>
                      <p className={`${styles.spanp} pt-2`}>price : <span className=' text-main'>{wishProduct.price}</span></p>
                      <button onClick={() => removeWishlistProduct(wishProduct._id)} className={` text-danger btn`}>
                        <i className={`fa-solid fa-trash text-danger`}></i> Remove</button>
                    </div>
                    <div className="col-md-2">
                      <div>
                        <button onClick={() => addCart(wishProduct.id)} className='btn bg-main text-white'> <i className="fa-solid fa-plus"></i> add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              })}

            </div>

            : <h2 className=' alert alert-warning text-center my-5'>No products in yuor WishList</h2>
          }
        </>
      }


    </>
  )
}
