import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { RotatingLines } from 'react-loader-spinner';


export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    let mySchema = Yup.object(
        {
            email: Yup.string().email("email is not valid").required("Email is required"),
            newPassword: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
        }
    )
    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        }, validationSchema: mySchema
        , onSubmit: (values) => {
            formPassword(values)
        }
    })


    async function formPassword(values) {
        setIsLoading(true)
        return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values
        ).then((data) => {
            if (data.statusText == "OK") {
                toast.success("success")
                navigate("/login")
                setIsLoading(false)
            }
        }).catch((err) => {
            toast.error("error")
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
                        <h2>Reset New Password :</h2>

                        <label htmlFor="email">Email : </label>
                        <input type="email" name='email' id='email' className='form-control mb-2'
                            onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />

                        <label htmlFor="newPassword">newPassword : </label>
                        <input type="password" name='newPassword' id='password' className='form-control mb-2'
                            onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} />

                        <div className="">
                            <button  disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Reset Password</button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}