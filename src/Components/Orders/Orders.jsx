import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllOrders(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setOrders(data);
    setIsLoading(false)
  }

  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("userToken"))
    getAllOrders(id)
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
        </div> : ""}
      <div className="container pt-5 mt-5">
        <h1>Your Orders</h1>

        {orders.map((order) => {
          return <div key={order.id} className="row">
            <div className="order overflow-auto shadow rounded p-4 my-5">
              <div className=" d-flex align-items-center">
                <h2 className='fw-bolder h1'>{order.id}</h2>
                <h4 className='fw-bold text-primary mx-4'>processing</h4>
              </div>
              <p>you have ordered <span className='fw-bold'>{order.cartItems.length}</span> itms.</p>
              <div className="d-flex">
                {order.cartItems.map((item) => {
                  return <div className="d-flex"> <img className='mx-1 img-thumbnail' style={{ width: 150 }} src={item.product.imageCover} alt="" key={item._id} /></div>
                })}
              </div>
              <hr />
              <div className=" d-flex justify-content-between">
                <div className='fw-bold'>Total amount {order.totalOrderPrice} EGP</div>
                <div className="fw-bold">{order.updatedAt.split("T").slice(0, 3).join(" ").split(".").slice(0, 1).join(" ")}</div>
              </div>

            </div>

          </div>
        })}
      </div>
    </>
  )
}
