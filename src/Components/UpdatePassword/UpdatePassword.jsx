import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UpdatePassword.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let mySchema = Yup.object(
    {
      currentPassword: Yup.string().required("currentPassword is required").matches(/^[A-Za-z0-9]{3,8}$/, "currentPassword muct start capital letter"),
      password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
      rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref("password")], "Password not match"),
    }
  )
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    }, validationSchema: mySchema
    , onSubmit: (values) => {
      currentPassword1(values)
    }
  })

   function currentPassword1(values) {
    setIsLoading(true)
    console.log(values);
    return axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values,{
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then((data) => {
      console.log(data);
      if (data?.data?.message == "success") {
        toast.success(data.data.message)
        navigate("/home")
        setIsLoading(false)
      }
    }).catch((err) => {
      console.log(err);
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
      <div className="container mt-5 pt-5">
        <div className="w-75 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h2>Update User Password</h2>

            <label htmlFor="currentPassword">Current Password: </label>
            <input type="password" name='currentPassword' id='currentPassword' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.currentPassword} onBlur={formik.handleBlur} />
            {formik.touched.currentPassword && formik.errors.currentPassword ? <div className="alert alert-danger">{formik.errors.currentPassword}</div> : ""}

            <label htmlFor="password">Password : </label>
            <input type="password" name='password' id='password' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

            <label htmlFor="rePassword">Re-Password : </label>
            <input type="Password" name='rePassword' id='rePassword' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} />
            {formik.touched.rePassword && formik.errors.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

            <div className="">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Change</button>
            </div>

          </form>
        </div>

      </div>

    </>
  )
}
