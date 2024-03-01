import React from 'react'
import styles from './Footer.module.css';
export default function Footer() {
  return (

    <>

      <div className="bg-body-tertiary mt-5">
        <div className="container py-4  ">
          <div className="">
            <h2>Get the Frech Cart App</h2>
            <p>We will send you a link, ioen it on your phone to download the app</p>
            <div className="row">
              <div className="col-md-9">
                <input type="email" className="form-control" placeholder="Email..." />
              </div>
              <div className="col-md-3">
                <button className=' btn btn-success bg-main'>Share App Link</button>
              </div>
            </div>
            <hr />
          </div>
          <div className=" d-flex justify-content-between">
            <div className=" d-flex">
              <h5 className='fw-bold p-2'>payment partners</h5>
              <div className=" d-flex">
                <img src={require("../../Assets/images/mastercard_logo.svg__3.png")} className='width px-1' alt="" />
                <img src={require("../../Assets/images/PayPal-Logo.png")} className='width px-1' alt="" />
              </div>
            </div>
            <div className=" d-flex">
              <h5 className='fw-bold p-2'>Get deliveries with FreshCart</h5>
              <div className=" d-flex">
                <img src={require("../../Assets/images/doenload.png")} className={`${styles.widthfootr} px-1`} alt="" />
              </div>
            </div>
          </div>
          <div className="">
            <div className=" py-1 text-center">
              <p className="copyright m-0 fs-6 fw-bold">
              © 2024 <a
                  href="https://www.linkedin.com/in/yussef-abdalsalam-100486254"
                  className={`${styles.tatl} fw-bold text-decoration-none fw-normal d-inline-block`}
                  target="_blank"
                > Yussef Abdalsalam </a> , All Rights Reserved

              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
