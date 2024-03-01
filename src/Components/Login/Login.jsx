import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { tokenContext } from '../../Context/TokenContext';

export default function Login() {
  let { token, setToken } = useContext(tokenContext);
  const [userMessage, setUserMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()


  let mySchema = Yup.object(
    {
      email: Yup.string().email("email is not valid").required("Email is required"),
      password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
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
      formLogin(values)
    }
  })

  async function formLogin(values) {
    console.log(values);
    setIsLoading(true)
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      localStorage.setItem("userToken", data.data.token)
      setToken(data.data.token)
      if (data.data.message == "success") {
        setUserMessage(data.message);
        navigate("/")
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
            <h2>Login Now:</h2>
            {userMessage ? <div className="alert alert-success">{userMessage}</div> : ""}
            {errMessage ? <div className="alert alert-danger">{errMessage}</div> : ""}

            <label htmlFor="email">Email : </label>
            <input type="email" name='email' id='email' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

            <label htmlFor="password">Password : </label>
            <input type="password" name='password' id='password' className='form-control mb-2'
              onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}


            <div className=" d-flex justify-content-between">
              {isLoading ? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>
                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
              <Link className={`${styles.textForgot} fw-bold`} to="/forgot" >Forgot Password</Link>
            </div>


          </form>
        </div>
      </div>

    </>
  )
}
