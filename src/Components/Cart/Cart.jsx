import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { RotatingLines } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { ietmCartContext } from '../../Context/IetmCart';

export default function Cart() {
  const [iscart, setIsCart] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  let { setCart: setCartContext } = useContext(ietmCartContext);

  // display Cart Product
  async function getCartProduct() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      setIsCart(data?.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  // delete Cart Product
  async function removeCartProduct(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, {
          headers: {
            token: localStorage.getItem("userToken")
          }
        })
        setIsCart(data?.data);
        console.log(data?.data);
        setCartContext(data)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

  }

  // delete Cart Products
  function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers: {
            token: localStorage.getItem("userToken")
          }
        })
        setIsCart(data?.data);
        setIsCart({});
        setCartContext({})
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  async function updateCartProductCount({ productId, count }) {
    if (count == 0) {
      removeCartProduct(productId)
    } else {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, {
        count
      }, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      setIsCart(data?.data);

    }
  }

  useEffect(() => {
    getCartProduct()
  }, [])

  return (
    <>
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
          {iscart.products?.length > 0 ?
            <div className="container my-5 pt-5">
              <div className=" d-flex justify-content-between">
                <div className=""><h2>Cart Shop</h2></div>
                <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
              </div>
              <div className=" d-flex justify-content-between pt-4 pb-1 px-3">
                <div className={styles.spanp}>total price : <span className={styles.fontB}>{iscart.totalCartPrice}</span></div>
                <div className={styles.spanp}>total number of items : <span className={styles.fontB}>{iscart.products?.length}</span></div>
              </div>

              {iscart.products?.map((cartProduct) => {
                return <div key={cartProduct._id} className="card-product shadow rounded-2 my-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img className='w-100' src={cartProduct.product.imageCover} alt="" />
                    </div>
                    <div className="col-md-8  px-sm-4">
                      <h3 className={styles.titil}>{cartProduct.product.title}</h3>
                      <p className={`${styles.spanp} pt-2`}>price : <span className=' text-main'>{cartProduct.price}</span></p>
                    </div>
                    <div className="col-md-2">

                      <div className=" d-flex align-items-center">
                        <button onClick={() => updateCartProductCount({ productId: cartProduct.product._id, count: cartProduct.count + 1 })} className=' btn btn-main mx-2'>+</button>
                        <span> {cartProduct.count} </span>
                        <button disabled={cartProduct.count == 1} onClick={() => updateCartProductCount({ productId: cartProduct.product._id, count: cartProduct.count - 1 })} className=' btn btn-main mx-2'>-</button>
                      </div>
                      <button onClick={() => removeCartProduct(cartProduct.product._id)} className={` pt-4 text-danger btn`}>
                        <i className={`fa-solid fa-trash text-danger`}></i> Remove</button>
                    </div>
                  </div>
                </div>
              })}

              <div className=" d-flex justify-content-center ">
                <Link to={`/Address/` + iscart._id} className=' text-bg-danger btn bg-main text-white mx-4'>checkOut <i className="fa-brands fa-cc-visa"></i></Link>
                 
                <Link to={`/cashOrder/` + iscart._id} className=' text-bg-danger btn bg-main text-white  mx-4'>CashOrder <i className="fa-solid fa-dollar-sign"></i></Link>
                 
              </div>
            </div>

            : <h2 className=' alert alert-warning pt-5 text-center my-5'>No products in yuor cart</h2>
          }
        </>
      }


    </>
  )
}

