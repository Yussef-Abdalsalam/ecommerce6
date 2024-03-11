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
              <div className="col-md-3 btnFooter">
                <button className='  btn btn-success bg-main'>Share App Link</button>
              </div>
            </div>
            <hr />
          </div>

          <div className=" d-flex px-3 py-2 justify-content-between">
            <div className=" d-flex">
              <p className={`fw-bold px-1`}>payment partners</p>
              <div className=" row">
                <img src={require("../../Assets/images/mastercard_logo.svg__3.png")} className='width col-md-6' alt="" />
                <img src={require("../../Assets/images/PayPal-Logo.png")} className='width px-1 col-md-6' alt="" />
              </div>
            </div>
            <div className=" d-flex px-2 py-2 overflow-hidden">
              <p className={` ${styles.pp}fw-bold`}>Get deliveries with FreshCart</p>
              <div className=" d-flex overflow-hidden">
                <img src={require("../../Assets/images/doenload.png")} className={`${styles.widthfootr}`} alt="" />
              </div>
            </div>

          </div>
          <div className="">
            <div className=" text-center">
              <p className="copyright m-0 fs-6">
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

