import axios from 'axios';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Catrgories() {
  const [catrgories, setCatrgories] = useState([])

  function getCatrgories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  async function getCatrgoriesIetm(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setCatrgories(data?.data)
  }

  let { data, isLoading, isFetching } = useQuery("Catrgories", getCatrgories);

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
          {data?.data?.data.map((el) =>
            <div key={el._id} className=" col-xl-4 col-md-6">
              <div onClick={() => getCatrgoriesIetm(el._id)} className="shadoowctg rounded-2 border cursor-pointer">
                <img className='rounded-top-2 w-100' height={250} src={el.image} alt="" />
                <h2 className='py-2 fw-bold text-center'>{el.name}</h2>
              </div>
            </div>
          )}
          <br />
          <hr />
        </div>
        
        <div className="row gy-2 mt-3">
          {catrgories?.map((el) =>
            <div  key={el._id} className="col-md-4">
              <h3 className='text-center fw-bold py-4 shadoowctg border'>{el.name}</h3>
            </div>
          )}
        </div>
      </div>

    </>
  )
}
