import React, { useContext, useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setUserMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()



  let mySchema = Yup.object(
    {
      name: Yup.string().required("Name is required").min(5, "min is 5 char").max(15, "max is 15 char"),
      email: Yup.string().email("email is not valid").required("Email is required"),
      password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
      rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref("password")], "Password not match"),
      phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
    }
  )

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",

    }, validationSchema: mySchema
    , onSubmit: (values) => {
      formRegister(values)
    }
  })

  async function formRegister(values) {
    console.log(values);

    setIsLoading(true)
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data) => {
      console.log(data);
      if (data.data.message == "success") {
        setUserMessage(data.message);
        navigate("/login")
        setIsLoading(false)

      }
    }).catch((err) => {
      console.log(err);
      setErrMessage(err.response.data.message)
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="w-75 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h2>Register Now:</h2>
            {userMessage ? <div className="alert alert-success">{userMessage}</div> : ""}
            {errMessage ? <div className="alert alert-danger">{errMessage}</div> : ""}

            <label htmlFor="name">Name : </label>
            <input type="text" name='name' id='name' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
            {formik.touched.name && formik.errors.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

            <label htmlFor="email">Email : </label>
            <input type="email" name='email' id='email' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

            <label htmlFor="password">Password : </label>
            <input type="password" name='password' id='password' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

            <label htmlFor="rePassword">Re-Password : </label>
            <input type="Password" name='rePassword' id='rePassword' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} />
            {formik.touched.rePassword && formik.errors.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

            <label htmlFor="phone">Phone : </label>
            <input type="tel" name='phone' id='phone' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} />
            {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
            <div className=" d-flex">
              {isLoading ? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>
                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
              <div className="px-1 fa-min pt-2">Have An Email ? <Link className='text-main1 fw-bold' to={"/login"}>Login</Link></div>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

