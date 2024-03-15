import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { tokenContext } from '../../Context/TokenContext';
import { nameContext } from '../../Context/UserName';

export default function Login() {
  let { token, setToken } = useContext(tokenContext);
  const [userMessage, setUserMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let { setUserName } = useContext(nameContext);
  let navigate = useNavigate()


  let mySchema = Yup.object(
    {
      email: Yup.string().email("email is not valid").required("Email is required"),
      password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
    }
  )

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: mySchema
    , onSubmit: (values) => {
      formLogin(values)
    }
  })

  async function formLogin(values) {
    setIsLoading(true)
    return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      localStorage.setItem("userToken", data.data.token)
      setToken(data.data.token)
      if (data.data.message == "success") {
        setUserMessage(data.message);
        setUserName(data.data.user.name);
        localStorage.setItem("username", data.data.user.name)
        navigate("/home")
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

              <div className=" d-flex">
                {isLoading ? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
                <div className="xxl px-2 pt-1">Don't Have An Email ? <Link className='fw-bold text-main1' to={"/register"}>Register</Link></div>
              </div>

              <Link className={`${styles.textForgot} pt-2 fw-bold`} to="/forgot" >Forgot Password</Link>

            </div>
            <div className=" ssm px-1 pt-3">Don't Have An Email ?<Link className='fw-bold text-main1 px-1' to={"/register"}>Register</Link></div>

          </form>
        </div>
      </div>

    </>
  )
}
