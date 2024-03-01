import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Swal from 'sweetalert2';

export default function Brands() {
const [brands, setBrands] = useState([])
const [isLoading, setIsLoading] = useState(true)

  async function getbrands() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    setBrands(data.data);
    
    setIsLoading(false)
  }

  useEffect(() => {
    getbrands()
  }, [])
  

function isSwal(img , name, slug) {
  Swal.fire({
    title: name,
    text: `Modal a ${slug}.`,
    imageUrl: img ,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image"
  });
}
  return (
    <>
      <div className="container mt-5 py-5">
        <div className="row g-4">
          {isLoading ?
            <div className=" d-flex justify-content-center">
              <div className=" ">
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
          {brands?.map((el) =>
            <div key={el._id} className="col-md-3">
              <div onClick={()=>isSwal(el.image, el.name ,el.slug)} className=" rounded-2 border cursor-pointer">
                <img className='rounded-top-2 w-100' src={el.image} alt="" />
                <h4 className='py-2 fw-bold text-center'>{el.name}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}