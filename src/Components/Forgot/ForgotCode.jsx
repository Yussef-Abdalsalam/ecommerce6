import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { RotatingLines } from 'react-loader-spinner';


export default function ForgotCode() {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues: {
      resetCode: ""
    }, onSubmit: (values) => {
      formCode(values)
    }
  })

  async function formCode(values) {
    setIsLoading(true)
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values
    ).then((data) => {
      if (data.data.status == "Success") {
        toast.success("You can create a new Password")
        navigate("/forgetPassword")
        setIsLoading(false)
      }
    }).catch((err) => {
      toast.error("Reset code is invalid or has expired")
      setIsLoading(false)
    })
  }

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
        </div> : ""}
      <div className="container">

        <div className="w-75 pt-5 mt-5 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h2>Verify Code :</h2>

            <label htmlFor="resetCode">Enter Reset Code</label>
            <input type="text" name='resetCode' placeholder='Enter Reset Code' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} />

            <div className="">
              <button type='' className='btn bg-main text-white'>Verify Code</button>
            </div>


          </form>
        </div>
      </div>

    </>
  )
}


