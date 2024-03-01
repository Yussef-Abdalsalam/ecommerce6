import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Forgot.module.css';
import { tokenContext } from '../../Context/TokenContext';
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

export default function Forgot() {
  let { token, setToken } = useContext(tokenContext);
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()


  let mySchema = Yup.object(
    {
      email: Yup.string().email("email is not valid").required("Email is required"),
    }
  )

  let formik = useFormik({
    initialValues: {
      email: ""

    }, validationSchema: mySchema
    , onSubmit: (values) => {
      formLogin(values)
    }
  })

  async function formLogin(values) {
    setIsLoading(true)
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then((data) => {
      setToken(data.data.token)
      if (data.data.statusMsg == "success") {
        toast.success(data.data.message)
        navigate("/forgotCode")
        setIsLoading(false)
      }
    }).catch((err) => {
      toast.error("email is not valid")
      setIsLoading(false)
    })
  }

  return (
    <>
      <div><Toaster /></div>
      <div className="container">
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
        <div className="w-75 mt-5 pt-5 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h2>Forgot :</h2>

            <label htmlFor="email">Email : </label>
            <input type="email" name='email' id='email' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

            <div className="">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Forgot</button>
            </div>


          </form>
        </div>

      </div>

    </>
  )
}


